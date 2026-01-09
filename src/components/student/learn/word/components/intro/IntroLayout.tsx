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

            {/* 중앙 캐릭터 */}
            <div className="flex items-center justify-center flex-col gap-4 mt-24">
                {/* 말풍선 */}
                <div
                    className="
                        relative
                        px-4 py-2
                        bg-white
                        border border-black/10
                        rounded-lg
                        text-sm
                        shadow-sm
                    "
                >
                    {bubbleText}
                    <div
                        className="
                            absolute
                            -bottom-1 left-1/2
                            w-3 h-3
                            bg-white
                            border-r border-b border-black/10
                            rotate-45
                            -translate-x-1/2
                        "
                    />
                </div>

                {character}
            </div>

            {/* 하단 버튼 */}
            <div className="mt-auto pb-10 flex justify-center">
                <StudentButton
                    onClick={onNext}
                    className="
                        px-6 py-2
                        rounded-full
                        bg-[#7C5C5C]
                        text-white
                        text-sm
                    "
                >
                    계속하기
                </StudentButton>
            </div>
        </div>
    );
}
