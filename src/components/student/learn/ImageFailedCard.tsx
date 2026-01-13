// ImageFailedCard.tsx
export default function ImageFailedCard() {
    return (
        <div className="flex items-start gap-2 justify-start">
            {/* 캐릭터 */}
            <img
                src="/images/bot-sad.svg"
                alt="bot"
                className="w-10 h-10 mt-1 shrink-0"
            />

            {/* 실패 카드 */}
            <div className="
                w-60 h-60
                rounded-xl
                bg-gray-50
                border border-dashed border-gray-300
                flex
                flex-col
                items-center
                justify-center
                text-sm
                text-gray-500
                text-center
                px-4
            ">
                <p className="mb-2">😢</p>
                <p>
                    이 장면은<br />
                    조금 조심해야 할 것 같아<br />
                    다음 그림으로 넘어가보자!
                </p>
            </div>
        </div>
    );
}
