"use client";

import { useState } from "react";
import { ChatPhase, getPrompt } from "@/components/student/learn/word/domain/chat/chatFlow";
import PromptBubble from "./PromptBubble";
import AnswerInput from "./AnswerInput";
import {StoryWordsRequestDTO} from "@/graphql/student/story/types";

type StoryWords = {
    words: string[];
};

export default function ConversationStage() {
    const [phase, setPhase] = useState<ChatPhase>("CHARACTER");

    // 백에 보낼 데이터
    const [characterWords, setCharacterWords] = useState<string[]>([]);

    const [stories, setStories] = useState<StoryWordsRequestDTO[]>([]); // 완료된 컷들
    const [currentWords, setCurrentWords] = useState<string[]>([]);     // 작성 중 단어들

    const [usedTokens, setUsedTokens] = useState(0);

    const currentIndex = stories.length + 1; // “다음에 완성될 컷”

    const prompt = getPrompt(phase, currentIndex);

    const splitWords = (value: string) =>
        value.trim().split(" ").filter(Boolean);

    const handleSubmit = (value: string) => {
        const words = splitWords(value);

        // 1. 캐릭터
        if (phase === "CHARACTER") {
            setCharacterWords(words);
            setPhase("TIME");
            return;
        }

        // 2. 컷 구성 단계 (TIME → PLACE → ACTION → STYLE)
        if (phase === "TIME" || phase === "PLACE" || phase === "ACTION" || phase === "STYLE") {
            setCurrentWords(prev => [...prev, ...words]);

            if (phase === "TIME") return setPhase("PLACE");
            if (phase === "PLACE") return setPhase("ACTION");
            if (phase === "ACTION") return setPhase("STYLE");

            // 3. STYLE 끝 = 컷 하나 완성
            const nextStories = [...stories, { words: [...currentWords, ...words] }];
            setStories(nextStories);
            setCurrentWords([]);

            const nextUsedTokens = usedTokens + 1;
            setUsedTokens(nextUsedTokens);

            // 4. 종료 조건
            if (nextStories.length === 4 || nextUsedTokens === 10) {
                console.log("generateStory payload", {
                    characterWords,
                    stories: nextStories,
                    usedTokens: nextUsedTokens,
                });
                setPhase("CUT_RESULT");
                return;
            }

            // 다음 컷 시작
            setPhase("TIME");
        }
    };



    return (
        <div className="flex flex-col p-4">
            {prompt && (
                <>
                    <PromptBubble
                        message={{
                            sender: "bot",
                            type: "text",
                            content: prompt,
                        }}
                    />

                    <AnswerInput
                        key={phase}
                        onSend={handleSubmit}
                        placeholder="단어로 입력해줘"
                        buttonLabel="알려줄게!"
                    />
                </>
            )}
        </div>
    );
}
