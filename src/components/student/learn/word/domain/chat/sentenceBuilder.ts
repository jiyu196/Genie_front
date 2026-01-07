// 조사 붙이기
// 띄어쓰기 규칙
// 캐릭터 예외 처리

export function buildSentence({
                                  character,
                                  place,
                                  action,
                              }: {
    character: string;
    place: string;
    action: string;
}) {
    return `${character}가 ${place}에서 ${action}.`;
}
