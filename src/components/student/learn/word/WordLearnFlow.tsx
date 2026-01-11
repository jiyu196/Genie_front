'use client';

import { useState } from 'react';
import IntroStep1 from './components/intro/IntroStep1';
import IntroStep2 from './components/intro/IntroStep2';
import IntroStep3 from './components/intro/IntroStep3';
import WordTimeline from './WordTimeline';
import BotCharacter from "@/components/student/learn/word/components/character/BotCharacter";
import ConversationStage from "@/components/student/learn/word/components/chat/ConversationStage";

type FlowStep = 'INTRO_1' | 'INTRO_2' | 'INTRO_3' | 'CHAT';

export default function WordLearnFlow() {
    const [step, setStep] = useState<FlowStep>('INTRO_1');

    return (
        <div className="flex flex-col h-full min-h-0 overflow-hidden">
            {step === 'INTRO_1' && (
                <IntroStep1 onNext={() => setStep('INTRO_2')} />
            )}

            {step === 'INTRO_2' && (
                <IntroStep2 onNext={() => setStep('INTRO_3')} />
            )}

            {step === 'INTRO_3' && (
                <IntroStep3 onNext={() => setStep('CHAT')} />
            )}

            {step === 'CHAT' && (
                    <div className="relative flex-1 min-h-0">
                        {/* 채팅 */}
                        <div className="flex-1 h-full">
                            <ConversationStage />
                        </div>
                    </div>

            )}
        </div>
    );
}

