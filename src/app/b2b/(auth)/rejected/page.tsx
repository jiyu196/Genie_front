import Link from "next/link";
import Button from "@/components/b2b/Button";

export default function RejectedPage() {
    return (
        <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-[#f6f8fb]">
            <div className="w-full max-w-[520px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] px-12 py-12 text-center">

                {/* 제목 */}
                <h1 className="text-2xl font-bold text-[#19344e] mb-4">
                    관리자 승인 반려
                </h1>

                {/* 설명 */}
                <p className="text-md text-gray-600 leading-relaxed mb-8">
                    기관 회원가입이 <b className="text-red-700">반려</b>되었습니다.<br />
                    현재 해당 계정은 서비스 이용이 제한된 상태입니다.
                </p>

                {/* 안내 박스 */}
                <div className="bg-[#fff5f5] border border-red-100 rounded-xl px-6 py-5 text-sm text-gray-700 mb-10 text-left">
                    <ul className="space-y-2">
                        <li>• 제출하신 정보 중 확인이 필요한 항목이 있습니다.</li>
                        <li>
                            • 자세한 안내를 위해
                            <b className="text-red-700"> 고객센터로 전화 문의</b> 부탁드립니다.
                        </li>
                    </ul>
                </div>

                {/* 액션 버튼 */}
                <div className="flex flex-col gap-3">
                    <a href="tel:1600-0000">
                        <Button className="w-full transition hover:brightness-90">
                            고객센터 전화하기
                        </Button>
                    </a>

                    <Link href="/b2b/rejected">
                        <Button
                            variant="secondary"
                            className="w-full transition hover:brightness-90"
                        >
                            메인 페이지로 돌아가기
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
}
