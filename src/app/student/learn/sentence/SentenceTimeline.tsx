'use client';

import { useEffect, useRef, useState } from 'react';
import ChatBubble from '../_components/ChatBubble';
import SentenceInput from './SentenceInput';

type Message = {
    id: number;
    sender: 'bot' | 'user';
    type: 'text' | 'image';
    content: string;
};

export default function SentenceTimeline() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: 'bot',
            type: 'text',
            content: '짧아도 괜찮아! 만들고 싶은 이야기를 써줘 ✏️',
        },
    ]);

    const [sentences, setSentences] = useState<string[]>([]);
    const MAX_SENTENCE = 4;

    const bottomRef = useRef<HTMLDivElement>(null);
    const idRef = useRef(1);

    const push = (msg: Omit<Message, 'id'>) => {
        idRef.current += 1;
        setMessages(prev => [...prev, { id: idRef.current, ...msg }]);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    const handleSubmitSentence = (text: string) => {
        push({ sender: 'user', type: 'text', content: text });

        setSentences(prev => {
            const next = [...prev, text];

            setTimeout(() => {
                push({
                    sender: 'bot',
                    type: 'text',
                    content: '이 문장을 아이들이 이해하기 쉽게 고쳐봤어 😊',
                });
            }, 400);

            setTimeout(() => {
                push({
                    sender: 'bot',
                    type: 'image',
                    content: `/dummy/sentence_${next.length}.png`,
                });
            }, 900);

            if (next.length === MAX_SENTENCE) {
                setTimeout(() => {
                    push({
                        sender: 'bot',
                        type: 'text',
                        content: '이제 네 문장으로 네 컷 이야기를 완성했어 🎉',
                    });
                }, 1400);
            }

            return next;
        });
    };


    return (
        <div className="flex flex-col h-full">

            {/* 채팅 로그 */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
                {messages.map(msg => (
                    <ChatBubble key={msg.id} message={msg} />
                ))}
                <div ref={bottomRef} />
            </div>

            {/* 입력창 (하단 고정) */}
            <SentenceInput
                onSubmit={handleSubmitSentence}
                disabled={sentences.length >= MAX_SENTENCE}
            />
        </div>
    );
}
