 // 이메일 주소를 마스킹 처리
 // 예) testemail@example.com -> te*******@example.com

export function maskEmail(email: string): string {
    const [id, domain] = email.split("@");

    // 아이디 길이가 짧은 경우 예외 처리
    if (!id || !domain) return "";
    if (id.length <= 2) {
        return `**@${domain}`;
    }

    // 앞 두 글자만 노출하고 나머지는 * 처리
    return (
        id.slice(0, 2) +
        "*".repeat(id.length - 2) +
        "@" +
        domain
    );
}
