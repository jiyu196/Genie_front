import IntroLayout from "@/components/student/learn/word/components/intro/IntroLayout";
import BotCharacter from "@/components/student/learn/word/components/character/BotCharacter";

export default function IntroStep2({ onNext }: { onNext: () => void }) {
    return (
        <IntroLayout
            character={<BotCharacter expression="excited" />}
            bubbleText={
                "단어를 골라서\n그림 이야기를 만들어볼 거예요!"
            }
            onNext={onNext}
        />
    );
}
