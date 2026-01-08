'use client';

import { useEffect, useRef, useState } from 'react';
import PromptBubble from "@/components/student/learn/word/components/chat/PromptBubble";
import AnswerInput from "@/components/student/learn/word/components/chat/AnswerInput";
import { wordQuestions } from "@/components/student/learn/word/domain/questions";

type Message = {
    id: number;
    sender: 'bot' | 'user';
    type: 'text' | 'image';
    content: string;
};

type Step =
    | 'INTRO'
    | 'WORD_QNA'
    | 'SENTENCE'
    | 'IMAGE_LOADING'
    | 'REFINE_DONE';

export default function WordTimeline() {
    const [step, setStep] = useState<Step>('WORD_QNA');
    const [messages, setMessages] = useState<Message[]>([]);
    const [questionIndex, setQuestionIndex] = useState(0);

    const bottomRef = useRef<HTMLDivElement>(null);
    const messageIdRef = useRef(0);

    const pushMessage = (msg: Omit<Message, 'id'>) => {
        messageIdRef.current += 1;
        setMessages(prev => [...prev, { id: messageIdRef.current, ...msg }]);
    };

    // 대화 추가되면서 스크롤 나옴
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // 채팅 진입 시 자동 시작
    useEffect(() => {
        pushMessage({
            sender: 'bot',
            type: 'text',
            content: '안녕! 지금부터 그림 이야기를 같이 만들어볼까? ✨',
        });

        setTimeout(() => {
            pushMessage({
                sender: 'bot',
                type: 'text',
                content: '내가 질문하면 단어를 하나씩 입력해줘 😊',
            });
        }, 1200);

        setTimeout(() => {
            pushMessage({
                sender: 'bot',
                type: 'text',
                content: wordQuestions[0].text,
            });
            setStep('WORD_QNA');
        }, 2200);
    }, []);

    // 단어 입력처리
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
            }, 500);
        } else {
            makeSentence();
        }
    };

    // 문장 생성
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
        }, 800);
    };

    // 이미지 생성
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
        }, 1200);
    };

    return (
        <div className="flex flex-col h-full min-h-0">
            {/* 채팅 로그 */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-6 space-y-3">
                {messages.map(msg => (
                    <PromptBubble key={msg.id} message={msg} />
                ))}
                <div ref={bottomRef} />
            </div>

            {/* 입력창 (항상 하단) */}
            {step === 'WORD_QNA' && (
                <div className="border-t bg-white shrink-0">
                    <AnswerInput onSend={handleAnswer} />
                </div>
            )}
        </div>
    );
}
