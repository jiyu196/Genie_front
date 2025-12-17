// app/b2b/(auth)/signup/page.tsx
import Button from "@/components/b2b/Button";
import Link from "next/link";

export default function SignupBizCheckPage() {
    return (
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] px-10 py-10">
            <h1 className="text-2xl font-bold text-center text-[#19344e] mb-4">
                기관 / 단체 회원가입
            </h1>

            <p className="text-sm text-center text-gray-500 mb-8">
                회원가입을 위해 먼저<br />
                <span className="font-medium text-[#19344e]">
                    사업자등록번호 인증
                </span>
                이 필요합니다.
            </p>

            {/* 사업자 조회 */}
            <section className="space-y-4 mb-8">
                <h2 className="font-semibold text-lg text-gray-700">
                    사업자 정보 확인
                </h2>

                <input
                    className="auth-input"
                    placeholder="사업자등록번호 (- 없이 입력)"
                />
            <Link href="/b2b/signup/register">
                <Button
                    className="w-full cursor-pointer transition hover:brightness-80"
                >
                    사업자 조회
                </Button>
            </Link>
            </section>

            {/* 안내 메시지 영역 (상태별로 분기 렌더링 예정) */}
            <div className="text-sm text-center text-gray-500 space-y-2">
                <p>
                    • 정상 사업자 확인 시 회원가입을 진행할 수 있습니다.
                </p>
                <p className="text-red-700">
                    • 휴업 / 폐업 사업자는 가입이 불가합니다.
                </p>
            </div>
        </div>
    );
}
