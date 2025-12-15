'use client';

import { useState } from 'react';

export default function WordInput({ onSubmit }: { onSubmit: (v: string) => void }) {
    const [value, setValue] = useState('');

    const send = () => {
        if (!value.trim()) return;
        onSubmit(value.trim());
        setValue('');
    };

    return (
        <div className="flex items-center gap-2 px-4 py-3 border-t bg-[#fffdf9]">

            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="단어를 입력해줘"
                className="
                    flex-1
                    h-11
                    px-4
                    rounded-2xl
                    border
                    text-sm
                    focus:outline-none
                "
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        send();
                    }
                }}
            />

            <button
                onClick={send}
                className="
                    px-4 py-2
                    rounded-2xl
                    bg-[#d48c8c]
                    text-white
                    text-sm
                    font-semibold
                "
            >
                전송
            </button>
        </div>
    );
}
