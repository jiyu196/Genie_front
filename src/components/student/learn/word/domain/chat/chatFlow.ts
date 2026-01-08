// 현재 몇 컷인지
// 지금 입력 단계가 뭔지
// 다음에 무슨 질문 던질지
// 입력값 어떻게 해석할지

export type ChatPhase =
    | "CHARACTER"   // 캐릭터 묘사 (여기만 예외적으로 자유도 높음)
    | "TIME"        // 언제
    | "PLACE"       // 어디서
    | "ACTION"      // 무엇을
    | "STYLE"       // 어떻게 / 분위기
    | "CUT_RESULT"     // 컷 하나 완성 (작성 단어 + 이미지 + 재생성)
    | "FINAL_RESULT";  // 4컷 만화 + 최종 문장

export function getPrompt(
    phase: ChatPhase,
    currentIndex: number
): string {

    if (phase === "CHARACTER") {
        return (
            "이야기에 나올 주인공을 만들어보자!\n" +
            "사람, 동물, 요정처럼 떠오르는 모습들을 단어로 알려줘 😊\n" +
            "예: 빨간 모자 소녀, 반짝이는 인어공주"
        );
    }

    if (phase === "TIME") {
        return (
            `${currentIndex}번째 장면이야 🌙\n` +
            "언제일까? 떠오르는 시간을 단어로 골라줘!\n" +
            "예: 밤, 아침, 비 오는 날"
        );
    }

    if (phase === "PLACE") {
        return (
            `${currentIndex}번째 장면이야 🏰\n` +
            "어디에서 일어날까? 장소를 단어로 알려줘!\n" +
            "예: 바닷속, 숲속, 높은 성"
        );
    }

    if (phase === "ACTION") {
        return (
            `${currentIndex}번째 장면에서\n` +
            "주인공이 무엇을 하고 있을까?\n" +
            "짧은 행동 단어로 알려줘!\n" +
            "예: 헤엄쳐, 뛰어가, 숨었어"
        );
    }

    if (phase === "STYLE") {
        return (
            "그 장면은 어떤 느낌일까?\n" +
            "분위기나 방법을 단어로 골라줘!\n" +
            "예: 조용히, 신나게, 무섭게"
        );
    }

    if (phase === "CUT_RESULT") {
        return `${currentIndex}번째 장면이 완성됐어! 그림을 확인해볼까?`;
    }

    if (phase === "FINAL_RESULT") {
        return "이야기가 완성됐어! 4컷 만화를 볼까?";
    }


    return "";
}
