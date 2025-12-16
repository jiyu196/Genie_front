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
    if (message.type === 'button') {
        return (
            <button className="bubble bot" onClick={onButtonClick}>
                {message.content}
            </button>
        );
    }

    if (message.type === 'image') {
        return <div className="image-box">이미지</div>;
    }

    return (
        <div className={`bubble ${message.sender}`}>
            {message.content}
        </div>
    );
}
