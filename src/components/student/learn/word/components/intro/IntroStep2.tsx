import IntroLayout from "@/components/student/learn/word/components/intro/IntroLayout";
import BotCharacter from "@/components/student/learn/word/components/character/BotCharacter";

export default function IntroStep2({ onNext }: { onNext: () => void }) {
    return (
        <IntroLayout
            character={<BotCharacter expression="excited" />}
            bubbleText={
                "네가 쓴 단어로 내가 이야기를 만들어줄게!"
            }
            onNext={onNext}
        />
    );
}
