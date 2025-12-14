'use client';

import { useState } from 'react';

export default function ChatInput({ onSubmit }: { onSubmit: (v: string) => void }) {
    const [value, setValue] = useState('');

    return (
        <div className="input-area">
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="단어를 입력해줘"
            />
            <button
                onClick={() => {
                    if (!value) return;
                    onSubmit(value);
                    setValue('');
                }}
            >
                보내기
            </button>
        </div>
    );
}
