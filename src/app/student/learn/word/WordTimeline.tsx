'use client';

import { useEffect, useRef, useState } from 'react';
import ChatBubble from '../_components/ChatBubble';
import WordInput from './WordInput';
import { wordQuestions } from '../_components/questions';

type Message = {
    id: number;
    sender: 'bot' | 'user';
    type: 'text' | 'button' | 'image';
    content: string;
};

type Step =
    | 'SELECT_MODE'
    | 'INTRO'
    | 'RULE'
    | 'WORD_QNA'
    | 'SENTENCE'
    | 'IMAGE_LOADING'
    | 'REFINE_DONE';

export default function WordTimeline() {
    const [step, setStep] = useState<Step>('SELECT_MODE');
    const [messages, setMessages] = useState<Message[]>([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const bottomRef = useRef<HTMLDivElement>(null);
    const messageIdRef = useRef(0);

    const pushMessage = (msg: Omit<Message, 'id'>) => {
        messageIdRef.current += 1;
        setMessages(prev => [...prev, { id: messageIdRef.current, ...msg }]);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    /** 시작 */
    if (step === 'SELECT_MODE') {
        return (
            <div className="flex items-center justify-center h-full">
                <button
                    className="px-6 py-3 rounded-2xl bg-[#d48c8c] text-white font-semibold"
                    onClick={() => {
                        setStep('RULE');
                        pushMessage({
                            sender: 'bot',
                            type: 'text',
                            content: '내가 질문하면 단어를 하나씩 입력해줘 😊',
                        });
                        setTimeout(() => {
                            pushMessage({
                                sender: 'bot',
                                type: 'text',
                                content: wordQuestions[0].text,
                            });
                            setStep('WORD_QNA');
                        }, 500);
                    }}
                >
                    단어로 이야기 만들기
                </button>
            </div>
        );
    }

    /** 단어 입력 처리 */
    const handleAnswer = (value: string) => {
        pushMessage({ sender: 'user', type: 'text', content: value });

        const nextIndex = questionIndex + 1;

        if (nextIndex < wordQuestions.length) {
            setQuestionIndex(nextIndex);
            setTimeout(() => {
                pushMessage({
                    sender: 'bot',
                    type: 'text',
                    content: wordQuestions[nextIndex].text,
                });
            }, 400);
        } else {
            makeSentence();
        }
    };

    /** 문장 생성 */
    const makeSentence = () => {
        setStep('SENTENCE');

        setTimeout(() => {
            pushMessage({
                sender: 'bot',
                type: 'text',
                content: '네가 고른 단어로 문장을 만들어봤어 ✨',
            });
            pushMessage({
                sender: 'user',
                type: 'text',
                content: '강아지가 공원에서 즐겁게 뛰어놀았어.',
            });
            loadImages();
        }, 600);
    };

    /** 이미지 생성 */
    const loadImages = () => {
        setStep('IMAGE_LOADING');
        pushMessage({
            sender: 'bot',
            type: 'text',
            content: '이제 이 문장으로 그림을 만들어볼게 🎨',
        });

        setTimeout(() => {
            for (let i = 1; i <= 4; i++) {
                pushMessage({
                    sender: 'bot',
                    type: 'image',
                    content: `/dummy/image${i}.png`,
                });
            }
            setStep('REFINE_DONE');
            pushMessage({
                sender: 'bot',
                type: 'text',
                content: '“날뛰다”를 “뛰어놀다”로 바꿨어 😊',
            });
        }, 1000);
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

            {/* 🔽 단어 입력창 (하단 고정) */}
            {step === 'WORD_QNA' && (
                <WordInput onSubmit={handleAnswer} />
            )}
        </div>
    );
}
