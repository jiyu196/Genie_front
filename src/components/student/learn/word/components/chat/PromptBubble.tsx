'use client';

type Props = {
    message: {
        sender: 'bot' | 'user';
        type: 'text' | 'button' | 'image';
        content: string;
    };
    onButtonClick?: () => void;
};

export default function PromptBubble({ message, onButtonClick }: Props) {
    const isBot = message.sender === 'bot';

    // 버튼 타입
    if (message.type === 'button') {
        return (
            <div className="flex items-start gap-2 justify-start">
                {/* 캐릭터 */}
                <img
                    src="/images/bot-ready.svg"
                    alt="bot"
                    className="w-8 h-8 mt-1 shrink-0"
                />

                <button
                    onClick={onButtonClick}
                    className="
                      px-4 py-2
                      rounded-full
                      bg-[#f4f4f6]
                      text-sm
                      text-gray-800
                      shadow
                    "
                >
                    {message.content}
                </button>
            </div>
        );
    }

    // 이미지 타입
    if (message.type === 'image') {
        return (
            <div className="flex items-start gap-2 justify-start">
                {/* 캐릭터 */}
                <img
                    src="/images/bot-ready.svg"
                    alt="bot"
                    className="w-8 h-8 mt-1 shrink-0"
                />

                <div className="max-w-[75%] rounded-2xl overflow-hidden bg-gray-100">
                    <img src={message.content} alt="generated" />
                </div>
            </div>
        );
    }

    // 텍스트 타입
    return (
        <div
            className={`
                flex items-start gap-2
                ${isBot ? 'justify-start' : 'justify-end'}
            `}
        >
            {/* bot일 때만 캐릭터 표시 */}
            {isBot && (
                <img
                    src="/images/bot-ready.svg"
                    alt="bot"
                    className=" w-10 h-10 mt-1 shrink-0"
                />
            )}

            <div
                className={`
                  max-w-[70%]
                  px-4 py-3
                  rounded-2xl
                  text-sm
                  leading-relaxed
                  ${
                    isBot
                        ? 'bg-[#FFF8EE] text-[#5A4634]'
                        : 'bg-[#FFD6D6] text-[#7A3A3A]'
                }
                `}
            >
                {message.content}
            </div>
        </div>
    );
}
