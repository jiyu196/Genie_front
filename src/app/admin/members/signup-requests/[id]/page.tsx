'use client';

import Button from '@/components/admin/AdminButton';

export default function SignupRequestDetailPage() {
    return (
        <div className="max-w-[900px] mx-auto bg-white rounded-2xl shadow px-10 py-8">

            <h1 className="text-2xl font-bold text-[#19344e] mb-8">
                기관 회원가입 요청 상세
            </h1>

            {/* 기본 정보 */}
            <section className="mb-8 space-y-3">
                <h2 className="font-semibold text-lg text-gray-700">
                    기본 정보
                </h2>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-500">기관명</span>
                        <p className="font-medium">지니교육센터</p>
                    </div>
                    <div>
                        <span className="text-gray-500">사업자등록번호</span>
                        <p className="font-medium">123-45-67890</p>
                    </div>
                    <div>
                        <span className="text-gray-500">담당자</span>
                        <p className="font-medium">김지유</p>
                    </div>
                    <div>
                        <span className="text-gray-500">이메일</span>
                        <p className="font-medium">admin@genie.co.kr</p>
                    </div>
                </div>
            </section>

            {/* 제출 서류 */}
            <section className="mb-8 space-y-4">
                <h2 className="font-semibold text-lg text-gray-700">
                    제출 서류
                </h2>

                <div className="border rounded-lg p-4 space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                        <span>사업자등록증</span>
                        <div className="flex gap-2">
                            <button className="text-[#19344e] underline">
                                미리보기
                            </button>
                            <button className="text-gray-500 underline">
                                다운로드
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <span>재직증명서</span>
                        <div className="flex gap-2">
                            <button className="text-[#19344e] underline">
                                미리보기
                            </button>
                            <button className="text-gray-500 underline">
                                다운로드
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 사업자 진위여부 검증 */}
            <section className="mb-10 space-y-4">
                <h2 className="font-semibold text-lg text-gray-700">
                    사업자 진위여부 검증
                </h2>

                <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-500">검증 상태</span>
                    <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                        미검증
                    </span>
                </div>

                <Button
                    label="진위여부 API 검증 실행"
                    onClick={() => alert('UI 전용')}
                />

                {/* 검증 완료 상태 예시 */}
                {/*
                <p className="text-green-600 text-sm">
                    ✔ 국세청 기준 정상 사업자 확인
                </p>
                */}
            </section>

            {/* 승인 / 반려 */}
            <section className="border-t pt-8 space-y-4">
                <h2 className="font-semibold text-lg text-gray-700">
                    최종 처리
                </h2>

                <textarea
                    placeholder="반려 사유 입력 (선택)"
                    className="w-full border rounded-lg p-3 text-sm h-[90px]"
                />

                <div className="flex gap-3">
                    <Button
                        label="승인"
                        onClick={() => alert('승인')}
                    />
                    <Button
                        label="반려"
                        variant="reject"
                        onClick={() => alert('반려')}
                    />
                </div>
            </section>
        </div>
    );
}
