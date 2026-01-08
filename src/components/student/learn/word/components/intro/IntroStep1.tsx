import IntroLayout from "./IntroLayout";
import BotCharacter from "@/components/student/learn/word/components/character/BotCharacter";

export default function IntroStep1({ onNext }: { onNext: () => void }) {
    return (
        <IntroLayout
            character={<BotCharacter expression="smile" />}
            bubbleText="안녕! 난 이야기 요정 지니야 ✨"
            onNext={onNext}
        />
    );
}
