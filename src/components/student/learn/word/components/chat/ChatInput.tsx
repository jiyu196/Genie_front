"use client";

import { useState } from "react";
import Button from "@/components/b2b/Button";
import StudentButton from "@/components/student/StudentButton";

export default function ChatInput({
                                      onSend,
                                  }: {
    onSend: (message: string) => void;
    placeholder?: string;
}) {
    const [value, setValue] = useState("");

    const handleSend = () => {
        if (!value.trim()) return;
        onSend(value);
        setValue("");
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 flex gap-2">
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                }}
                placeholder="단어를 입력해보세요"
                className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
            />

            <StudentButton
                onClick={handleSend}
                className="bg-green-500 text-white px-4 py-2 rounded-full text-sm"
            >
                전송
            </StudentButton>
        </div>
    );
}
