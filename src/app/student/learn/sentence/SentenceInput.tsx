'use client';

import { useState } from 'react';

export default function SentenceInput({
      onSubmit,
      disabled = false,
}: {
    onSubmit: (v: string) => void;
    disabled?: boolean;
}) {
    const [value, setValue] = useState('');

    const send = () => {
        if (!value.trim()) return;
        onSubmit(value.trim());
        setValue('');
    };

    return (
        <div className="flex items-center gap-2 px-4 py-3 border-t bg-[#fffdf9]">

            <textarea
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="이야기를 문장으로 써보세요"
                rows={2}
                className="
                    flex-1
                    h-12
                    px-4 py-2
                    rounded-2xl
                    border
                    text-sm
                    resize-none
                    focus:outline-none
                "
                onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
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
