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
        <div className="relative flex-1 flex flex-col items-center justify-center bg-white">

            {/* 캐릭터 */}
            <div className="mb-6">
                {character}
            </div>

            {/* 말풍선 */}
            <div className="mb-10 px-6 py-3 bg-white rounded-xl shadow text-sm">
                {bubbleText}
            </div>

            {/* 버튼 */}
            <StudentButton
                onClick={onNext}
                className="
                    mt-4
                    w-full
                    h-12
                    rounded-full
                    text-white
                    font-semibold"
                >
                {nextLabel}
            </StudentButton>
        </div>
    );
}
