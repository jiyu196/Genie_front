// app/b2b/(auth)/login/page.tsx
import Link from "next/link";
import Button from "@/components/common/Button";

export default function LoginPage() {
    return (
        <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] px-10 py-8">
            <h1 className="text-2xl font-bold text-center text-[#19344e] mb-8">
                로그인
            </h1>

            <div className="space-y-4">
                <input className="auth-input" placeholder="아이디" />
                <input
                    className="auth-input"
                    type="password"
                    placeholder="비밀번호"
                />
            </div>

            <Button className="w-full mt-6 text-[#F4F6FF] hover:text-[#4c5c6b]/100 cursor-pointer">
                로그인
            </Button>

            <div className="flex justify-center gap-4 text-sm text-gray-500 mt-6 ">
                <Link href="/b2b/signup" className="hover:underline">
                    회원가입
                </Link>
                <span>|</span>
                <button className="hover:underline cursor-pointer">아이디 찾기</button>
                <span>|</span>
                <button className="hover:underline cursor-pointer">비밀번호 찾기</button>
            </div>

            <p className="text-xs text-center text-red-700 mt-6">
                * 관리자 승인 완료 후 서비스 이용이 가능합니다.
            </p>
        </div>
    );
}
