import IntroLayout from "./IntroLayout";
import BotCharacter from "@/components/student/learn/word/components/character/BotCharacter";

export default function IntroStep1({ onNext }: { onNext: () => void }) {
    return (
        <IntroLayout
            character={<BotCharacter expression="smile" />}
            bubbleText="안녕하세요! 지니예요 ✨"
            onNext={onNext}
        />
    );
}
