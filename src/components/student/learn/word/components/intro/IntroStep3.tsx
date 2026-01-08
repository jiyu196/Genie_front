import IntroLayout from "@/components/student/learn/word/components/intro/IntroLayout";
import BotCharacter from "@/components/student/learn/word/components/character/BotCharacter";

export default function IntroStep3({ onNext }: { onNext: () => void }) {
    return (
        <IntroLayout
            character={<BotCharacter expression="ready" />}
            bubbleText="그럼 바로 시작해볼까?"
            onNext={onNext}
            nextLabel="시작하기"
        />
    );
}
