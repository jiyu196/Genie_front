import Button from "@/components/b2b/Button";
import StudentButton from "@/components/student/StudentButton";

type IntroLayoutProps = {
    character: React.ReactNode;
    bubbleText: string;
    onNext: () => void;
    nextLabel?: string;
};

export default function IntroLayout({
                                        character,
                                        bubbleText,
                                        onNext,
                                    }: IntroLayoutProps) {
    return (
        <div className="relative z-10 h-full flex flex-col">

            {/* 중앙 영역 */}
            <div className="flex flex-1 items-center justify-center">
                {/* 캐릭터 + 말풍선 묶음 */}
                <div className="flex flex-col items-center gap-4 animate-[float_3s_ease-in-out_infinite]">

                    {/* 말풍선 */}
                    <div
                        className="
                            relative
                            px-5 py-3
                            bg-[#FFF8EE]
                            border border-[#EEDFCC]
                            rounded-2xl
                            text-sm
                            text-[#5A4634]
                            shadow-[0_4px_12px_rgba(0,0,0,0.08)]
                        "
                    >
                        {bubbleText}
                        <div
                            className="
                                absolute
                                -bottom-1 left-1/2
                                w-3 h-3
                                bg-[#FFF8EE]
                                border-r border-b border-[#EEDFCC]
                                rotate-45
                                -translate-x-1/2
                            "
                        />
                    </div>

                    {/* 캐릭터 */}
                    {character}
                </div>
            </div>

            {/* 하단 버튼 */}
            <div className="pb-10 flex justify-center">
                <StudentButton
                    onClick={onNext}
                    className="
                        px-6 py-2
                        rounded-full
                        bg-[#7C5C5C]
                        text-white
                        text-sm
                        shadow-md
                        active:scale-95
                        transition
                    "
                >
                    계속하기
                </StudentButton>
            </div>
        </div>
    );
}
