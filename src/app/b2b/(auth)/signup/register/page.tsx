// app/b2b/(auth)/signup/register/page.tsx
import Button from "@/components/b2b/Button";
import Link from "next/link";

export default function SignupRegisterPage() {
    return (
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] px-10 py-9">
            <h1 className="text-2xl font-bold text-center text-[#19344e] mb-8">
                기관 / 단체 회원가입
            </h1>

            {/* 로그인 정보 */}
            <section className="space-y-4 mb-6">
                <h2 className="font-semibold text-lg text-gray-700">
                    로그인 정보
                </h2>

                <input
                    className="auth-input"
                    placeholder="이메일 (로그인 ID)"
                />

                <div className="relative">
                    <input
                        className="auth-input pr-24"
                        placeholder="이메일 인증번호 입력"
                    />
                    <Button
                        variant="secondary"
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-[30px] px-4 text-xs font-medium flex items-center justify-center whitespace-nowrap"
                    >
                        인증
                    </Button>
                </div>

                <input
                    className="auth-input"
                    type="password"
                    placeholder="비밀번호 (8~16자)"
                />

                <input
                    className="auth-input"
                    type="password"
                    placeholder="비밀번호 확인"
                />
            </section>

            {/* 기관 / 담당자 정보 */}
            <section className="space-y-4 mb-8">
                <h2 className="font-semibold text-lg text-gray-700">
                    기관 정보
                </h2>

                <input
                    className="auth-input"
                    placeholder="기관명"
                />

                <input
                    className="auth-input bg-gray-100 text-gray-500 cursor-not-allowed"
                    value="123-45-67890"
                    readOnly
                />

                <input
                    className="auth-input"
                    placeholder="담당자 이름"
                />

                {/* 재직증명서 첨부 */}
                <div className="space-y-1">
                    <label className="text-sm text-red-700">
                        * 재직증명서 첨부 (필수)
                    </label>
                    <input
                        type="file"
                        className="auth-input cursor-pointer h-[44px] flex items-center file:h-full"
                        accept=".pdf,.jpg,.png"
                    />
                    <p className="text-xs text-gray-500">
                        * 담당자 재직 확인용 (PDF / JPG / PNG)
                    </p>
                </div>
            </section>

            {/* 약관 동의 */}
            <div className="text-sm space-y-2 mb-6">
                <label className="flex gap-2 cursor-pointer">
                    <input type="checkbox" />
                    Genie 이용약관 동의 (필수)
                </label>
                <label className="flex gap-2 cursor-pointer">
                    <input type="checkbox" />
                    개인정보 수집 및 이용 동의 (필수)
                </label>
                <label className="flex gap-2 cursor-pointer">
                    <input type="checkbox" />
                    마케팅 정보 수신 동의 (선택)
                </label>
            </div>

            <Link href="/b2b/pending">
                <Button className="w-full cursor-pointer transition hover:brightness-80">
                    가입 요청
                </Button>
            </Link>

            <p className="text-xs text-center text-red-700 mt-4">
                * 가입 요청 후 관리자 승인 완료 시 서비스 이용이 가능합니다.
            </p>
        </div>
    );
}
