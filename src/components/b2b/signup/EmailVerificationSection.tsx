import Button from "@/components/b2b/Button";

type Props = {
    email: string;
    setEmail: (v: string) => void;

    emailCode: string;
    setEmailCode: (v: string) => void;

    isEmailSent: boolean;
    isEmailVerified: boolean;

    remainSeconds: number;
    emailMessage: string | null;

    onSendEmailCode: () => void;
    onVerifyEmailCode: () => void;
};

export default function EmailVerificationSection({
     email,
     setEmail,
     emailCode,
     setEmailCode,
     isEmailSent,
     isEmailVerified,
     remainSeconds,
     emailMessage,
     onSendEmailCode,
     onVerifyEmailCode,
 }: Props) {
    return (
        <section className="space-y-4 mb-6">
            <h2 className="font-semibold text-lg text-gray-700">
                로그인 정보
            </h2>

            {/* 이메일 입력 */}
            <div>
                <div className="relative">
                    <input
                        className={`auth-input ${
                            isEmailVerified ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                        placeholder="이메일 (로그인 ID)"
                        value={email}
                        readOnly={isEmailVerified}
                        onChange={(e) => {
                            if (!isEmailVerified) setEmail(e.target.value);
                        }}
                    />

                    {!isEmailVerified && (
                        <Button
                            onClick={onSendEmailCode}
                            variant="secondary"
                            type="button"
                            disabled={isEmailSent}
                            className="absolute right-3 top-1/2 -translate-y-1/2 h-[30px] px-4 text-xs flex items-center justify-center leading-none"
                        >
                            인증메일 발송
                        </Button>
                    )}

                </div>

                <div className="min-h-[16px] text-xs text-center mt-2 text-blue-600">
                    {emailMessage}
                </div>
            </div>

            {/* 인증번호 */}
            {isEmailSent && !isEmailVerified && (
                <div>
                    <div className="relative">
                        <input
                            className="auth-input pr-24"
                            placeholder="이메일 인증번호 입력"
                            value={emailCode}
                            readOnly={isEmailVerified}
                            onChange={(e) => setEmailCode(e.target.value)}
                        />
                        <Button
                            onClick={onVerifyEmailCode}
                            disabled={remainSeconds <= 0}
                            variant="secondary"
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 h-[30px] px-4 text-xs flex items-center justify-center leading-none"
                        >
                            확인
                        </Button>
                    </div>

                    <div className="text-xs text-right mt-1 text-gray-500">
                        남은 시간 {Math.floor(remainSeconds / 60)}:
                        {(remainSeconds % 60).toString().padStart(2, "0")}
                    </div>
                </div>
            )}
        </section>
    );
}
