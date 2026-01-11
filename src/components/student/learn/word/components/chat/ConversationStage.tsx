"use client";

import { useEffect, useState, useRef } from "react";
import { ChatPhase, getPrompt } from "@/components/student/learn/word/domain/chat/chatFlow";
import PromptBubble from "./PromptBubble";
import AnswerInput from "./AnswerInput";
import { StoryWordsRequestDTO } from "@/graphql/student/story/types";
import { GENERATE_STORY } from "@/graphql/student/story/generateStory";
import { useMutation } from "@apollo/client";

// 컷 하나에 사용된 단어 묶음
type StoryWords = {
    words: string[];
};

//채팅 메시지 타입
// - text  : 일반 텍스트 말풍선
// - image : AI가 생성한 이미지(첨부파일)
type ChatMessage = {
    sender: "bot" | "user";
    type: "text" | "button" | "image";
    content: string;
};

export default function ConversationStage() {
    const [generateStory, { loading }] = useMutation(GENERATE_STORY);

    // 현재 대화 단계 (캐릭터 → 시간 → 장소 → 행동 → 스타일)
    const [phase, setPhase] = useState<ChatPhase>("CHARACTER");

    // 실제 화면에 그려지는 채팅 메시지 목록
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    // 채팅 자동 스크롤 기준점
    const bottomRef = useRef<HTMLDivElement | null>(null);

    // 캐릭터 관련 단어들 (최초 1회 입력)
    // generateStory 요청 시 accessIdCharacter로 전달
    const [characterWords, setCharacterWords] = useState<string[]>([]);

    // 이미 완성된 컷들 → 나중에 4컷 미리보기, 컷별 이미지 관리용
    const [stories, setStories] = useState<StoryWordsRequestDTO[]>([]);

    // 현재 컷을 만들기 위해 누적 중인 단어들
    // (TIME → PLACE → ACTION → STYLE 단계에서 계속 쌓임)
    const [currentWords, setCurrentWords] = useState<string[]>([]);

    // 토큰 수 (컷 수 카운트 용도)
    const [usedTokens, setUsedTokens] = useState(0);

    // 다음에 완성될 컷 번호
    const currentIndex = stories.length + 1;

    // 현재 phase에 맞는 봇 질문
    const prompt = getPrompt(phase, currentIndex);

    // 같은 프롬프트 2번뜨는 현상때문에 이미 넣은건지 체크하기 위한 용도
    const lastPhaseRef = useRef<ChatPhase | null>(null);

    // 입력 문자열을 단어 배열로 분리
    const splitWords = (value: string) =>
        value.trim().split(" ").filter(Boolean);

    // 메시지가 추가될 때마다 맨 아래로 스크롤
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messages]);

    // phase가 바뀌어 prompt가 새로 생성될 때마다 → 봇 질문을 채팅 메시지로 추가
    useEffect(() => {
        // 같은 phase에서는 다시 추가하지 않음
        if (lastPhaseRef.current === phase) return;

        lastPhaseRef.current = phase;

        const nextPrompt = getPrompt(phase, currentIndex);
        if (!nextPrompt) return;


        setMessages(prev => [
            ...prev,
            {
                sender: "bot",
                type: "text",
                content: nextPrompt,
            },
        ]);
    }, [phase, currentIndex]);


    // 사용자가 입력했을 때 호출되는 함수
    const handleSubmit = async (value: string) => {
        // 1. 사용자 입력을 즉시 채팅에 표시
        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                type: "text",
                content: value,
            },
        ]);

        const words = splitWords(value);

        // 2. 캐릭터 단계
        // 캐릭터 단어를 저장하고 다음 단계로 이동
        if (phase === "CHARACTER") {
            setCharacterWords(words);
            setPhase("TIME");
            return;
        }

        // 3. 컷 구성 단계
        // TIME → PLACE → ACTION → STYLE 순서
        if (
            phase === "TIME" ||
            phase === "PLACE" ||
            phase === "ACTION" ||
            phase === "STYLE"
        ) {
            // 현재 컷 단어 누적
            setCurrentWords(prev => [...prev, ...words]);

            // 다음 단계로 이동
            if (phase === "TIME") return setPhase("PLACE");
            if (phase === "PLACE") return setPhase("ACTION");
            if (phase === "ACTION") return setPhase("STYLE");

            // 4. STYLE 단계 종료 → 컷 하나 완성
            const completedWords = [...currentWords, ...words];

            // 컷 수 증가
            setUsedTokens(prev => prev + 1);

            // 이야기 생성중
            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    type: "text",
                    content: "🎨 이야기를 그리고 있어요… 잠깐만 기다려줘!"
                }
            ]);

            // 5. AI 스토리 + 이미지 생성 요청
            const response = await generateStory({
                variables: {
                    input: {
                        accessIdCharacter: characterWords,
                        originalContent: completedWords,
                    },
                },
            });

            const result = response.data.generateStory;

            // 6. AI가 다듬은 문장 출력
            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    type: "text",
                    content: result.refinedContent,
                },
            ]);

            // 7. AI 이미지가 있으면 첨부파일로 출력
            if (result.imageUrl) {
                setMessages(prev => [
                    ...prev,
                    {
                        sender: "bot",
                        type: "image",
                        content: result.imageUrl,
                    },
                ]);
            }

            // 8. 컷 완료 처리
            setStories(prev => [...prev, { words: completedWords }]);
            setCurrentWords([]);

            // 다음 컷 시작
            setPhase("TIME");
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* 채팅 영역 */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="flex gap-3">

                    {/* 말풍선 영역 */}
                    <div className="flex-1 space-y-4">
                        {messages.map((msg, index) => (
                            <PromptBubble
                                key={index}
                                message={msg}
                            />
                        ))}
                    </div>
                </div>

                {/* 스크롤 기준점 */}
                <div ref={bottomRef} />
            </div>

            {/* 입력창 (항상 하단) */}
            <div className="border-t bg-white px-4 py-3">
                <AnswerInput
                    key={phase}
                    onSend={handleSubmit}
                    placeholder="단어로 입력해줘"
                    buttonLabel="알려줄게!"
                />
            </div>
        </div>
    );
}
