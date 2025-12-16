// app/b2b/pending/page.tsx
import Link from "next/link";
import Button from "@/components/common/Button";

export default function PendingPage() {
    return (
        <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-[#f6f8fb]">
            <div className="w-full max-w-[520px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] px-12 py-12 text-center">

                <h1 className="text-2xl font-bold text-[#19344e] mb-4">
                    관리자 승인 대기 중
                </h1>

                <p className="text-md text-gray-600 leading-relaxed mb-8">
                    기관 회원가입이 <b className="text-red-700">정상적</b>으로 접수되었습니다.<br />
                    관리자 승인 완료 후 Genie 서비스를 이용하실 수 있습니다.
                </p>

                <div className="bg-[#f9fafb] rounded-xl px-6 py-5 text-sm text-gray-700 mb-8 text-left">
                    <ul className="space-y-2">
                        <li>• 승인까지 <b>영업일 기준 1~2일</b> 소요됩니다.</li>
                        <li>• 승인 완료 시 <b>가입하신 이메일</b>로 안내드립니다.</li>
                        <li>• 승인 전까지 서비스 이용은 제한됩니다.</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <Button className="w-full cursor-pointer transition hover:brightness-80" disabled>
                        승인 대기 중
                    </Button>

                    <Link href="/b2b/login">
                        <Button variant="secondary" className="w-full cursor-pointer transition hover:brightness-90">
                            로그인 페이지로 돌아가기
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
}
