'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F6FF] px-6">
            <div className="w-full max-w-[520px] bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] px-10 py-14 text-center">

                {/* 404 */}
                <h1 className="text-[72px] font-extrabold text-[#19344e] mb-4">
                    404
                </h1>

                {/* 메시지 */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    페이지를 찾을 수 없어요
                </h2>

                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                    요청하신 페이지가 존재하지 않거나<br />
                    주소가 잘못 입력되었을 수 있어요.
                </p>

                {/* 버튼 영역 */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/b2b"
                        className="inline-flex items-center justify-center h-[44px] px-6 rounded-full
                                   bg-[#19344e] text-white text-sm font-medium
                                   hover:bg-[#162c42] transition"
                    >
                        홈으로 돌아가기
                    </Link>

                    <button
                        onClick={() => history.back()}
                        className="inline-flex items-center justify-center h-[44px] px-6 rounded-full
                                   border border-[#19344e] text-[#19344e] text-sm font-medium
                                   hover:bg-[#F4F6FF] transition"
                    >
                        이전 페이지
                    </button>
                </div>
            </div>
        </div>
    );
}
