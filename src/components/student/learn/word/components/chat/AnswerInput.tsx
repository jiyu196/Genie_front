"use client";

import { useState } from "react";
import StudentButton from "@/components/student/StudentButton";

type Props = {
    onSend: (value: string) => void;
    placeholder?: string;
    buttonLabel?: string;
    disabled?: boolean;
};

export default function AnswerInput({
                                        onSend,
                                        placeholder = "단어를 입력해줘",
                                        buttonLabel = "알려줄게!",
                                        disabled = false,
                                    }: Props) {
    const [value, setValue] = useState("");

    const handleSend = () => {
        if (disabled) return;
        if (!value.trim()) return;
        onSend(value);
        setValue("");
    };

    return (
        <div className="rounded-2xl bg-white p-4">

        <div className="flex items-center gap-3">
                <input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="
                        flex-1
                        h-11
                        px-4
                        rounded-xl
                        border
                        border-[#6b4f4f]/50
                        text-gray-800
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
                    disabled={disabled}
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
