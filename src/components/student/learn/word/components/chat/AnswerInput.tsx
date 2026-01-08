"use client";

import { useState } from "react";
import StudentButton from "@/components/student/StudentButton";

type Props = {
    onSend: (value: string) => void;
    placeholder?: string;
    buttonLabel?: string;
};

export default function AnswerInput({
                                        onSend,
                                        placeholder = "단어를 입력해줘",
                                        buttonLabel = "알려줄게!",
                                    }: Props) {
    const [value, setValue] = useState("");

    const handleSend = () => {
        if (!value.trim()) return;
        onSend(value);
        setValue("");
    };

    return (
        <div className="mt-6 rounded-2xl bg-[#fffdf9] p-4 shadow-sm">
            <div className="flex items-center gap-3">
                <input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={placeholder}
                    className="
            flex-1
            h-11
            px-4
            rounded-xl
            border
            text-sm
            focus:outline-none
          "
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />

                <StudentButton
                    onClick={handleSend}
                    className="
            h-11
            px-4
            text-sm
            rounded-xl
            shrink-0
          "
                >
                    {buttonLabel}
                </StudentButton>
            </div>
        </div>
    );
}
