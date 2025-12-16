// app/b2b/(auth)/signup/page.tsx
import Button from "@/components/common/Button";

export default function SignupPage() {
    return (
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] px-10 py-8">
            <h1 className="text-2xl font-bold text-center text-[#19344e] mb-8">
                기관 / 단체 회원가입
            </h1>

            <section className="space-y-4 mb-6">
                <h2 className="font-semibold text-lg text-gray-700">
                    로그인 정보
                </h2>

                {/* 아이디 */}
                <input
                    className="auth-input"
                    placeholder="아이디 (6~16자)"
                />

                {/* 비밀번호 묶음 */}
                <div className="space-y-2">
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="비밀번호 (8~16자)"
                    />
                </div>
                <div className="space-y-2">
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="비밀번호 확인"
                    />
                </div>
            </section>


            <section className="space-y-4 mb-6">
                <h2 className="font-semibold text-lg text-gray-700">
                    기관 정보
                </h2>
                <input className="auth-input" placeholder="기관명" />
                <div className="flex gap-2">
                    <input className="auth-input flex-1" placeholder="사업자등록번호 (- 없이)" />
                    <Button variant="secondary" className="h-[44px] px-4 text-sm font-medium border-2 cursor-pointer transition hover:border-[#19344e] hover:text-[#19344e]">
                        인증
                    </Button>
                </div>
                <div className="flex gap-2">
                    <input className="auth-input flex-1" placeholder="이메일" />
                    <Button variant="secondary" className="h-[44px] px-4 text-sm font-medium border-2 cursor-pointer transition hover:border-[#19344e] hover:text-[#19344e]">
                        인증
                    </Button>
                </div>
            </section>

            <div className="text-sm space-y-2 mb-6 ">
                <label className="flex gap-2 cursor-pointer hover:text-[#0f1c29]/70 transition">
                    <input type="checkbox"  /> Genie 이용약관 동의 (필수)
                </label>
                <label className="flex gap-2 cursor-pointer hover:text-[#0f1c29]/70 transition">
                    <input type="checkbox" /> 개인정보 수집 및 이용 동의 (필수)
                </label>
                <label className="flex gap-2 cursor-pointer hover:text-[#0f1c29]/70 transition">
                    <input type="checkbox" /> 마케팅 정보 수신 동의 (선택)
                </label>
            </div>

            <Button className="w-full cursor-pointer transition hover:brightness-80">
                가입하기
            </Button>

            <p className="text-xs text-center text-red-700 mt-4">
                * 가입 후 관리자 승인 완료 시 서비스 이용이 가능합니다.
            </p>
        </div>
    );
}
