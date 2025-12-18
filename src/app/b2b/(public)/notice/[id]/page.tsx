// app/b2b/notice/[id]/page.tsx
import Link from "next/link";

export default function NoticeDetailPage() {
    return (
        <div className="bg-white">
            <section className="py-20 bg-[#f6f8fb] text-center">
                <h1 className="text-2xl font-bold text-[#19344e]">
                    GenieTune 서비스 베타 오픈 안내
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                    2025.01.05
                </p>
            </section>

            <section className="max-w-[800px] mx-auto px-6 py-20">
                <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>
                        안녕하세요. GenieTune입니다.
                    </p>
                    <p>
                        GenieTune 교육 솔루션의 베타 서비스가
                        정식으로 오픈되었습니다.
                    </p>
                    <p>
                        기관 회원가입 및 관리자 승인 완료 후
                        서비스를 이용하실 수 있으며,
                        보다 안정적인 운영을 위해 지속적으로 개선해 나갈 예정입니다.
                    </p>
                    <p>
                        많은 관심과 이용 부탁드립니다.
                    </p>
                </div>

                <div className="mt-12">
                    <Link
                        href="/b2b/notice"
                        className="text-sm text-[#19344e] hover:underline font-bold"
                    >
                        ← 목록으로 돌아가기
                    </Link>
                </div>
            </section>
        </div>
    );
}
