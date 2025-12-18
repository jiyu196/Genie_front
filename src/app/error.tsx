'use client';

import { useEffect } from 'react';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // 실제 서비스에서는 여기서 에러 로깅 (Sentry 등)
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F6FF] px-6">
            <div className="w-full max-w-[520px] bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] px-10 py-14 text-center">

                {/* 500 */}
                <h1 className="text-[56px] font-extrabold text-[#19344e] mb-4">
                    500
                </h1>

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    서버에 문제가 발생했어요
                </h2>

                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                    일시적인 오류로 요청을 처리하지 못했어요.<br />
                    잠시 후 다시 시도해 주세요.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center h-[44px] px-6 rounded-full
                                   bg-[#19344e] text-white text-sm font-medium
                                   hover:bg-[#162c42] transition"
                    >
                        다시 시도하기
                    </button>

                    <button
                        onClick={() => location.href = '/'}
                        className="inline-flex items-center justify-center h-[44px] px-6 rounded-full
                                   border border-[#19344e] text-[#19344e] text-sm font-medium
                                   hover:bg-[#F4F6FF] transition"
                    >
                        홈으로 이동
                    </button>
                </div>
            </div>
        </div>
    );
}
