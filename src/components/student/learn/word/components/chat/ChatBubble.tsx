'use client';

type Props = {
    message: {
        sender: 'bot' | 'user';
        type: 'text' | 'button' | 'image';
        content: string;
    };
    onButtonClick?: () => void;
};

export default function ChatBubble({ message, onButtonClick }: Props) {
    const isBot = message.sender === 'bot';

    // 버튼 타입
    if (message.type === 'button') {
        return (
            <div className="flex justify-start">
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
            <div className="flex justify-start">
                <div className="max-w-[75%] rounded-2xl overflow-hidden bg-gray-100">
                    <img src={message.content} alt="generated" />
                </div>
            </div>
        );
    }

    // 텍스트 타입
    return (
        <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
            <div
                className={`
                  max-w-[75%]
                  px-4 py-3
                  rounded-2xl
                  text-sm
                  leading-relaxed
                  ${
                    isBot
                        ? 'bg-[#f4f4f6] text-gray-800'
                        : 'bg-[#d48c8c] text-white'
                }
                `}
            >
                {message.content}
            </div>
        </div>
    );
}
