import Link from "next/link";
import Button from "@/components/b2b/Button";

export default function RejectedPage() {
    return (
        <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-[#f6f8fb]">
            <div className="w-full max-w-[520px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] px-12 py-12 text-center">

                <h1 className="text-2xl font-bold text-[#19344e] mb-4">
                    관리자 승인 반려
                </h1>

                <p className="text-md text-gray-600 leading-relaxed mb-8">
                    기관 회원가입이 <b className="text-red-700">반려</b>되었습니다.<br />
                    추가 확인이 필요하여 서비스 이용이 제한됩니다.
                </p>

                <div className="bg-[#fff5f5] border border-red-100 rounded-xl px-6 py-5 text-sm text-gray-700 mb-8 text-left">
                    <ul className="space-y-2">
                        <li>• 제출하신 정보에 확인이 필요한 항목이 있습니다.</li>
                        <li>
                            • 원활한 안내를 위해
                            <b className="text-red-700"> 고객센터로 전화 문의</b> 부탁드립니다.
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <Button className="w-full cursor-not-allowed" disabled>
                        승인 반려됨
                    </Button>

                    <a href="tel:1600-0000">
                        <Button variant="secondary" className="w-full cursor-pointer transition hover:brightness-90">
                            고객센터 전화하기
                        </Button>
                    </a>

                    <Link href="/b2b">
                        <Button variant="secondary" className="w-full cursor-pointer transition hover:brightness-90">
                            메인 페이지로 돌아가기
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
}
