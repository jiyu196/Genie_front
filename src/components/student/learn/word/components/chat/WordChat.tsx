"use client";

import { useState } from "react";
import AnswerInput from "./AnswerInput";
import BotCharacter from "../character/BotCharacter";

export default function WordChat() {
    const [messages, setMessages] = useState<string[]>([]);

    const handleSend = (message: string) => {
        setMessages((prev) => [...prev, message]);
    };

    return (
        <div className="relative min-h-screen bg-white pb-20">

            {/* 캐릭터 */}
            <div className="absolute top-6 left-6 w-20 h-20">
                <BotCharacter expression="smile" />
            </div>

            {/* 메시지 영역 */}
            <div className="pt-28 px-4 space-y-2">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className="bg-green-100 px-4 py-2 rounded-xl text-sm w-fit ml-auto"
                    >
                        {msg}
                    </div>
                ))}
            </div>

            {/* 입력창 */}
            <AnswerInput onSend={handleSend} />
        </div>
    );
}
