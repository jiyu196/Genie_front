// app/b2b/solution/page.tsx
import Image from "next/image";

export default function SolutionPage() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="py-24 bg-[#F4F6FF] text-center">
                <div className="mt-0 flex justify-center">
                    <Image
                        src="/images/studentLogo.svg"
                        alt="지니튠 로고"
                        width={200}
                        height={100}
                        priority
                        className="object-contain"
                    />
                </div>
                <h1 className="text-3xl font-bold text-[#19344e] leading-relaxed mb-4">
                    GenieTune 교육 솔루션
                </h1>
                <p className="text-gray-600 text-lg">
                    아이들의 문장을 이야기로, 이야기를 상상력으로 확장하는<br />
                    AI 기반 학습 플랫폼
                </p>
            </section>

            {/* Learning Flow */}
            <section className="max-w-[1100px] mx-auto px-6 py-20">
                <h2 className="text-2xl font-bold text-[#19344e] text-center mb-12">
                    학습 흐름
                </h2>

                <div className="grid md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-sm font-semibold text-[#19344e] mb-2">
                            STEP 1
                        </div>
                        <h3 className="font-semibold mb-2 text-[#F59E0B]">문장 입력</h3>
                        <p className="text-gray-600 text-sm">
                            아이가 직접 문장 또는 짧은 이야기를 작성합니다.
                        </p>
                    </div>

                    <div>
                        <div className="text-sm font-semibold text-[#19344e] mb-2">
                            STEP 2
                        </div>
                        <h3 className="font-semibold mb-2 text-[#F59E0B]">표현 검증</h3>
                        <p className="text-gray-600 text-sm">
                            부적절한 표현은 자동으로 순화·필터링됩니다.
                        </p>
                    </div>

                    <div>
                        <div className="text-sm font-semibold text-[#19344e] mb-2">
                            STEP 3
                        </div>
                        <h3 className="font-semibold mb-2 text-[#F59E0B]">이미지 생성</h3>
                        <p className="text-gray-600 text-sm">
                            AI가 문장을 기반으로 이야기를 시각화합니다.
                        </p>
                    </div>

                    <div>
                        <div className="text-sm font-semibold text-[#19344e] mb-2">
                            STEP 4
                        </div>
                        <h3 className="font-semibold mb-2 text-[#F59E0B]">학습 기록</h3>
                        <p className="text-gray-600 text-sm">
                            생성 결과와 학습 이력이 자동으로 저장됩니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Student Experience */}
            <section className="bg-[#F4F6FF] py-20">
                <div className="max-w-[1100px] mx-auto px-6">
                    <h2 className="text-2xl font-bold text-[#19344e] mb-8">
                        학생 학습 경험
                    </h2>

                    <p className="text-gray-700 leading-relaxed max-w-[800px]">
                        GenieTune은 아이들이 단순히 문제를 푸는 것이 아니라,
                        스스로 문장을 만들고 이야기를 구성하며
                        창의적 사고와 표현력을 자연스럽게 키울 수 있도록 설계되었습니다.
                    </p>
                </div>
            </section>

            {/* Institution Value */}
            <section className="max-w-[1100px] mx-auto px-6 py-20">
                <h2 className="text-2xl font-bold text-[#19344e] mb-10">
                    기관·교사를 위한 관리 포인트
                </h2>

                <div className="grid md:grid-cols-2 gap-10">
                    <div>
                        <h3 className="font-semibold text-lg mb-2 text-[#F59E0B]">
                            기관 단위 계정 관리
                        </h3>
                        <p className="text-gray-600">
                            하나의 기관 계정으로 여러 학생 계정을 관리할 수 있으며,
                            학습 현황을 한눈에 확인할 수 있습니다.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-2 text-[#F59E0B]">
                            학습 기록 조회
                        </h3>
                        <p className="text-gray-600">
                            학생별 문장 입력, 생성 결과, 학습 이력이
                            체계적으로 관리됩니다.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-2 text-[#F59E0B]">
                            안전 필터링 시스템
                        </h3>
                        <p className="text-gray-600">
                            교육 환경에 맞지 않는 표현은
                            자동으로 감지·처리됩니다.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-2 text-[#F59E0B]">
                            관리자 승인 기반 운영
                        </h3>
                        <p className="text-gray-600">
                            승인된 기관만 이용할 수 있어
                            안정적인 서비스 운영이 가능합니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Trust */}
            <section className="py-20 bg-[#F4F6FF] text-center">
                <p className="text-[#19344e] font-bold">
                    GenieTune은 교육 기관을 위한 환경을 최우선으로 고려하여<br />
                    안전하고 신뢰할 수 있는 학습 경험을 제공합니다.
                </p>
            </section>
        </div>
    );
}
