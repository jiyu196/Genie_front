"use client";

import { useEffect, useState, useRef } from "react";
import { ChatPhase, getPrompt } from "@/components/student/learn/word/domain/chat/chatFlow";
import PromptBubble from "./PromptBubble";
import AnswerInput from "./AnswerInput";
import { GENERATE_STORY } from "@/graphql/student/story/generateStory";
import { useMutation } from "@apollo/client";
import TokenStatusBar from "@/components/student/learn/word/components/chat/TokenStatusBar";
import {useRouter} from "next/navigation";

// 컷 하나에 사용된 단어 묶음
type StoryWords = {
    words: string[];
};

//채팅 메시지 타입
// - text  : 일반 텍스트 말풍선
// - image : AI가 생성한 이미지(첨부파일)
type ChatMessage = {
    id: string;
    sender: "bot" | "user";
    type: "text" | "button" | "image" | "image-loading" | "image-failed";
    content?: string;
};

// 4컷 이미지 생성
type StoryCut = {
    words: string[];
    imageUrl: string;
    text: string;
};

export default function ConversationStage() {
    const router = useRouter();
    const [generateStory] = useMutation(GENERATE_STORY, { errorPolicy: "all"});


    // 현재 대화 단계 (캐릭터 → 시간 → 장소 → 행동 → 스타일)
    const [phase, setPhase] = useState<ChatPhase>("CHARACTER");

    // 실제 화면에 그려지는 채팅 메시지 목록
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    // 채팅 자동 스크롤 기준점
    const bottomRef = useRef<HTMLDivElement | null>(null);

    // 캐릭터 관련 단어들 (최초 1회 입력)
    // generateStory 요청 시 accessIdCharacter로 전달
    const [characterWords, setCharacterWords] = useState<string[]>([]);

    /// 컷 생성 토큰
    const MAX_TOKENS = 20;
    const [usedTokens, setUsedTokens] = useState(0);
    // 토큰 끝났을때 막는 역할
    const remainingTokens = MAX_TOKENS - usedTokens;

    // 이미 완성된 컷들 → 나중에 4컷 미리보기, 컷별 이미지 관리용
    const [stories, setStories] = useState<StoryCut[]>([]);

    // 현재 컷을 만들기 위해 누적 중인 단어들
    // (TIME → PLACE → ACTION → STYLE 단계에서 계속 쌓임)
    const [currentWords, setCurrentWords] = useState<string[]>([]);

    // 4컷 webtoon groupId (UUID or number)
    const [groupId, setGroupId] = useState<string | null>(null);


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
                id: crypto.randomUUID(),
                sender: "bot",
                type: "text",
                content: nextPrompt,
            },

        ]);
    }, [phase, currentIndex]);


    // 사용자가 입력했을 때 호출되는 함수
    const handleSubmit = async (value: string) => {
        // 사용자 입력 메시지
        setMessages(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                sender: "user",
                type: "text",
                content: value,
            },
        ]);

        const words = splitWords(value);

        if (phase === "CHARACTER") {
            setCharacterWords(words);
            setPhase("TIME");
            return;
        }

        if (
            phase === "TIME" ||
            phase === "PLACE" ||
            phase === "ACTION" ||
            phase === "STYLE"
        ) {
            setCurrentWords(prev => [...prev, ...words]);

            if (phase === "TIME") return setPhase("PLACE");
            if (phase === "PLACE") return setPhase("ACTION");
            if (phase === "ACTION") return setPhase("STYLE");

            const completedWords = [...currentWords, ...words];

            let currentGroupId = groupId;
            if (!currentGroupId) {
                currentGroupId = crypto.randomUUID();
                setGroupId(currentGroupId);
            }

            // 로딩 메시지 추가
            const loadingMessageId = crypto.randomUUID();

            setMessages(prev => [
                ...prev,
                {
                    id: loadingMessageId,
                    sender: "bot",
                    type: "image-loading",
                },
            ]);

            let response;


            try {
                response = await generateStory({
                    variables: {
                        input: {
                            accessIdCharacter: characterWords,
                            originalContent: completedWords,
                            webtoonGroupId: currentGroupId,
                        },
                    },
                });
            } catch (e) {
                // 네트워크 오류
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === loadingMessageId
                            ? {...msg, type: "image-failed"}
                            : msg
                    )
                );

                setMessages(prev => [
                    ...prev,
                    {
                        id: crypto.randomUUID(),
                        sender: "bot",
                        type: "text",
                        content: "지금은 그림을 만들 수 없었어. 잠시 후 다시 해볼까?",
                    },
                ]);

                setPhase("TIME");
                setCurrentWords([]);
                return;
            }

            // 정책 위배 등의 오류
            if (response.errors && response.errors.length > 0) {
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === loadingMessageId
                            ? {...msg, type: "image-failed"}
                            : msg
                    )
                );

                setMessages(prev => [
                    ...prev,
                    {
                        id: crypto.randomUUID(),
                        sender: "bot",
                        type: "text",
                        content: "상상 나라에서는  \n" +
                            "이 장면을 그림으로 못 그려 \n" +
                            "대신 다음 이야기로 갈게😊",
                    },
                ]);

                setPhase("TIME");
                setCurrentWords([]);
                return;
            }

            // 이미지 추출 가능할때
            const storyResult = response.data.generateStory;
            // 서버 기준 토큰 동기화
            setUsedTokens(storyResult.promptCount);

            setMessages(prev =>
                prev.map(msg =>
                    msg.id === loadingMessageId
                        ? {
                            ...msg,
                            type: "image",
                            content: storyResult.imageUrl,
                        }
                        : msg
                )
            );

            setMessages(prev => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    sender: "bot",
                    type: "text",
                    content: storyResult.refinedContent,
                },
            ]);

            setStories(prev => {
                const nextStories = [
                    ...prev,
                    {
                        words: completedWords,
                        imageUrl: storyResult.imageUrl,
                        text: storyResult.refinedContent,
                    },
                ];
                setPhase(nextStories.length >= 4 ? "RESULT" : "TIME");
                return nextStories;
            });

            setCurrentWords([]);
        }
    };
    // 마지막에는 내 학습방으로 이동
    const resultNotifiedRef = useRef(false);

    useEffect(() => {
        if (phase !== "RESULT") return;
        if (resultNotifiedRef.current) return;

        resultNotifiedRef.current = true;

        setMessages(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                sender: "bot",
                type: "text",
                content:
                    "이야기가 완성됐어! 🎉\n내 학습방에서 다시 보고 저장할 수 있어.\n지금 가볼까?",
            },
            {
                id: crypto.randomUUID(),
                sender: "bot",
                type: "button",
                content: "내 학습방 가기",
            },
        ]);
    }, [phase]);

    // 이미지 재생성
    const regenerateImage = (cutIndex: number) => {
        return generateStory({
            variables: {
                input: {
                    accessIdCharacter: characterWords,
                    originalContent: stories[cutIndex].words,
                    webtoonGroupId: groupId,
                },
            },
        });
    };
    return (
        <div className="flex flex-col h-full">
            {/*남은 토큰 수*/}
            <TokenStatusBar
                remaining={MAX_TOKENS - usedTokens}
                max={MAX_TOKENS}
            />

            {/*/!*이미지 재생성 및 최종 이미지*!/*/}
            {/*{phase === "RESULT" && (*/}
            {/*    <StoryResult*/}
            {/*        characterWords={characterWords}*/}
            {/*        stories={stories}*/}
            {/*        onRegenerate={regenerateImage}*/}
            {/*    />*/}
            {/*)}*/}

            {/* 채팅 영역 */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="flex gap-3">

                    {/* 말풍선 영역 */}
                    <div className="flex-1 space-y-4">
                        {messages.map((msg) => (
                            <PromptBubble
                                key={msg.id}
                                message={msg}
                                onButtonClick={
                                    msg.type === "button"
                                        ? () => router.push("/student/mypage")
                                        : undefined
                                }
                            />
                        ))}

                    </div>
                </div>

                {/* 스크롤 기준점 */}
                <div ref={bottomRef} />
            </div>


            {/* 입력창 */}
                <div className="border-t border-[#6b4f4f]/30 bg-white px-4 py-3">
                    <AnswerInput
                        disabled={remainingTokens <= 0}
                        key={phase}
                        onSend={handleSubmit}
                        placeholder="단어로 입력해줘"
                        buttonLabel="알려줄게!"
                    />
                </div>
        </div>
    );
}
