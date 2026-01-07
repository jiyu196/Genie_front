"use client";

import { useEffect, useState } from "react";
import { getPrompt, ChatPhase} from "@/components/student/learn/word/domain/chat/chatFlow";
import { buildSentence } from "@/components/student/learn/word/domain/chat/sentenceBuilder";
import { storyRepository } from "@/components/student/learn/word/domain/story/storyRepository";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

type ChatMessage = {
    sender: 'bot' | 'user';
    type: 'text' | 'button' | 'image';
    content: string;
};

type Cut = {
    cut: number;
    sentence: string;
    image: string;
};

export default function ChatContainer() {
    // 컷 / 단계
    const [cut, setCut] = useState(0);
    const [phase, setPhase] = useState<ChatPhase>("CHARACTER");

    // 입력값
    const [character, setCharacter] = useState("");
    const [place, setPlace] = useState("");
    const [action, setAction] = useState("");

    // 결과
    const [cuts, setCuts] = useState<Cut[]>([]);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    /** 새로고침 복원 */
    useEffect(() => {
        const saved = storyRepository.load();
        if (saved) {
            setCuts(saved);
            setCut(saved.length);
            setPhase("PLACE"); // 캐릭터는 이미 있다고 가정
        }
    }, []);

    // 사용자 입력처리
    const handleSubmit = (value: string) => {
        // 사용자 메시지 추가
        setMessages(prev => [
            ...prev,
            {
                sender: 'user',
                type: 'text',
                content: value,
            },
        ]);

        if (phase === "CHARACTER") {
            setCharacter(value);
            setPhase("PLACE");
            return;
        }

        if (phase === "PLACE") {
            setPlace(value);
            setPhase("ACTION");
            return;
        }

        if (phase === "ACTION") {
            const sentence = buildSentence({
                character,
                place,
                action: value,
            });

            const newCut = {
                cut,
                sentence,
                image: `/images/mock/cut-${cut + 1}.png`,
            };

            const nextCuts = [...cuts, newCut];
            setCuts(nextCuts);
            storyRepository.save(nextCuts);

            // 이미지 메시지 추가
            setMessages(prev => [
                ...prev,
                {
                    sender: 'bot',
                    type: 'image',
                    content: newCut.image,
                },
            ]);

            setCut(cut + 1);
            setPhase("PLACE");
        }
    };


    const prompt = getPrompt(phase, cut);

    useEffect(() => {
        if (!prompt) return;

        setMessages(prev => [
            ...prev,
            {
                sender: 'bot',
                type: 'text',
                content: prompt,
            },
        ]);
    }, [prompt]);


    return (
        <div className="flex flex-col h-full">
            {/* 채팅 영역 */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
                {messages.map((msg, idx) => (
                    <ChatBubble key={idx} message={msg} />
                ))}

                {cuts.map(c => (
                    <div key={c.cut} className="mt-4">
                        <img
                            src={c.image}
                            alt={`cut-${c.cut}`}
                            className="rounded-lg"
                        />
                        <p className="text-sm text-gray-600 mt-1">
                            {c.sentence}
                        </p>
                    </div>
                ))}
            </div>

            {/* 입력 */}
            <ChatInput
                key={phase} // 단계 바뀔 때 입력 리셋
                onSend={handleSubmit}
                placeholder="단어로 입력해줘"
            />
        </div>
    );
}
