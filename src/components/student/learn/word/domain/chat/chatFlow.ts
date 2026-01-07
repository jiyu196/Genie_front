// 현재 몇 컷인지
// 지금 입력 단계가 뭔지
// 다음에 무슨 질문 던질지
// 입력값 어떻게 해석할지

export type ChatPhase =
    | "CHARACTER"
    | "PLACE"
    | "ACTION"
    | "RESULT";

export function getPrompt(phase: ChatPhase, cut: number) {
    if (cut === 0 && phase === "CHARACTER") {
        return "주인공을 단어로 알려줘 (띄어쓰기 가능)";
    }

    if (phase === "PLACE") {
        return "어디에 있을까? (단어)";
    }

    if (phase === "ACTION") {
        return "무엇을 하고 있을까? (단어)";
    }

    return "";
}
