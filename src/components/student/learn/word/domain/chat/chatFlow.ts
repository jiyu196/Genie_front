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
                "사람, 동물, 요정처럼 떠오르는 모습을 단어로 말해줘 😊\n" +
                "예) 빨간 모자 소녀, 반짝이는 금발머리 인어공주"
            );

        case "TIME":
            return (
                `⏰ ${index}번째 장면이야!\n` +
                "언제 일어나는 이야기일까?\n" +
                "시간을 단어로 골라줘!\n" +
                "예) 아침, 밤, 비오는날"
            );

        case "PLACE":
            return (
                `🏰 ${index}번째 장면이야!\n` +
                "어디에서 이야기가 펼쳐질까?\n" +
                "장소를 단어로 말해줘 😊\n" +
                "예) 바닷속, 숲속, 높은 성"
            );

        case "ACTION":
            return (
                `🎈 ${index}번째 장면이야!\n` +
                "주인공은 지금 뭐 하고 있을까?\n" +
                "하고 있는 모습을 단어로 말해줘!\n" +
                "예) 달리고 있어, 노래하고 있어"
            );

        case "STYLE":
            return (
                `✨ ${index}번째 장면이야!\n` +
                "이야기는 어떤 느낌이면 좋을까?\n" +
                "느낌을 단어로 골라줘 😊\n" +
                "예) 신나는, 신비로운, 따뜻한"
            );

        case "RESULT":
            return "";
        default:
            return "";
    }
}
