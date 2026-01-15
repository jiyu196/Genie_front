export type ChatPhase =
    | "CHARACTER"
    | "TIME"
    | "PLACE"
    | "ACTION"
    | "STYLE"
    | "RESULT";

export function getPrompt(phase: ChatPhase, index: number): string {
    switch (phase) {
        case "CHARACTER":
            return (
                "🧚‍♀️ 이야기 주인공을 만들어볼까?\n" +
                "사람, 동물, 요정처럼 떠오르는 모습을 말해줘 😊\n" +
                "짧은 문장도 괜찮아!\n" +
                "예) 하얀 털 말티즈 강아지, 빨간 모자를 쓴 소녀"
            );

        case "TIME":
            return (
                `⏰ ${index}번째 장면이야!\n` +
                "언제 일어나는 이야기일까?\n" +
                "시간을 말해줘!\n" +
                "예) 아침, 어두운 밤, 비 오는 날"
            );

        case "PLACE":
            return (
                `🏰 ${index}번째 장면이야!\n` +
                "어디에서 이야기가 펼쳐질까?\n" +
                "장소를 말해줘 😊\n" +
                "예) 집 앞 정원, 깊은 숲속, 반짝이는 바닷속"
            );

        case "ACTION":
            return (
                `🎈 ${index}번째 장면이야!\n` +
                "주인공은 지금 뭐 하고 있을까?\n" +
                "하고 있는 모습을 말해줘!\n" +
                "예) 뛰어다녀, 나비 구경"
            );

        case "STYLE":
            return (
                `✨ ${index}번째 장면이야!\n` +
                "이 장면은 어떤 느낌이면 좋을까?\n" +
                "느낌을 말해줘 😊\n" +
                "예) 따뜻하게, 신나게, 긴장되게"
            );

        case "RESULT":
            return "";
        default:
            return "";
    }
}
