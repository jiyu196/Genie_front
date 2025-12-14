'use client';

import { useEffect, useRef, useState } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { wordQuestions } from './questions';

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
    | 'IMAGE_DONE'
    | 'REFINE_DONE';

export default function ChatTimeline() {
    const [step, setStep] = useState<Step>('SELECT_MODE');
    const [messages, setMessages] = useState<Message[]>([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const bottomRef = useRef<HTMLDivElement>(null);
    const messageIdRef = useRef(0);

    const pushMessage = (msg: Omit<Message, 'id'>) => {
        messageIdRef.current += 1;
        setMessages(prev => [
            ...prev,
            { id: messageIdRef.current, ...msg },
        ]);
    };


    // 자동 스크롤
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    /** 모드 선택 */
    if (step === 'SELECT_MODE') {
        return (
            <div className="center-buttons">
                <button
                    className="mode-btn"
                    onClick={() => {
                        setStep('INTRO');
                        setMessages([]);
                        pushMessage({ sender: 'bot', type: 'text', content: '단어로 이야기를 만들어볼까?' });
                        pushMessage({ sender: 'bot', type: 'button', content: '좋아!' });
                    }}
                >
                    단어로 이야기 만들기
                </button>
            </div>
        );
    }

    /** 버튼 클릭 처리 */
    const handleButtonClick = () => {
        setStep('RULE');
        pushMessage({ sender: 'bot', type: 'text', content: '내가 물어보는 질문에 단어를 입력해줘!' });
        setTimeout(() => {
            pushMessage({
                sender: 'bot',
                type: 'text',
                content: wordQuestions[0].text,
            });
            setStep('WORD_QNA');
        }, 300);
    };

    /** 단어 입력 처리 */
    const handleAnswer = (value: string) => {
        const q = wordQuestions[questionIndex];
        setAnswers(prev => ({ ...prev, [q.key]: value }));
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
            }, 300);
        } else {
            makeSentence();
        }
    };

    /** 문장 생성 */
    const makeSentence = () => {
        setStep('SENTENCE');
        const sentence = '강아지가 공원에서 즐겁게 뛰어놀았어.'; // TODO: 조사/받침 로직

        setTimeout(() => {
            pushMessage({ sender: 'bot', type: 'text', content: '네가 만든 문장이야!' });
            pushMessage({ sender: 'user', type: 'text', content: sentence });
            loadImages();
        }, 400);
    };

    /** 이미지 생성 연출 */
    const loadImages = () => {
        setStep('IMAGE_LOADING');
        pushMessage({
            sender: 'bot',
            type: 'text',
            content: '조금만 기다려줘! Genie가 그림 이야기를 만들고 있어!',
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
                content: '날뛰다 → 뛰어놀다 (더 부드러운 표현이에요)',
            });
        }, 1000);
    };

    return (
        <div className="chat-area">
            {messages.map(msg => (
                <ChatBubble
                    key={msg.id}
                    message={msg}
                    onButtonClick={handleButtonClick}
                />
            ))}

            {step === 'WORD_QNA' && <ChatInput onSubmit={handleAnswer} />}

            <div ref={bottomRef} />
        </div>
    );
}
