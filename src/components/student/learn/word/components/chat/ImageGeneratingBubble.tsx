"use client";

type Props = {
    text?: string;
};

export default function ImageGeneratingBubble({
                                                  text = "지니가 그림을 만들고 있어!",
                                              }: Props) {
    return (
        <div className="flex items-start gap-2 justify-start">
            {/* 지니 캐릭터 */}
            <img
                src="/images/bot-ready.svg"
                alt="bot"
                className="w-13 h-13 mt-1 shrink-0 animate-float"
            />

            {/* 생성중 박스 */}
            <div className="
                relative
                w-60 h-60
                rounded-xl
                bg-gray-100
                overflow-hidden
                flex
                items-center
                justify-center
                text-sm
                text-gray-600
            ">
                <div className="absolute inset-0 animate-brush opacity-40" />
                <span className="relative z-10">{text}</span>
            </div>
        </div>
    );
}
