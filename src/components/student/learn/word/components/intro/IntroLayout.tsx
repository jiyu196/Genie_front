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
                                        nextLabel = "계속하기",
                                    }: IntroLayoutProps) {
    return (
        <div className="flex items-center justify-center gap-16 py-24 bg-white">

            {/* 캐릭터 */}
            <div>
                {character}
            </div>

            {/* 설명 */}
            <div className="max-w-md space-y-8">
                <div className="text-2xl font-bold text-[#19344e]">
                    단어로 이야기를 만들어볼까?
                </div>

                <div className="px-6 py-4 bg-white rounded-xl shadow text-base leading-relaxed">
                    {bubbleText}
                </div>

                <StudentButton
                    onClick={onNext}
                    variant="primary"
                    className="px-10 py-4 text-base"
                >
                    {nextLabel}
                </StudentButton>
            </div>
        </div>
    );
}
