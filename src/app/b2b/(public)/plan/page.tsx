// app/b2b/plan/page.tsx
import Button from "@/components/b2b/Button";
import Link from "next/link";

export default function PlanPage() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="py-24 bg-[#F4F6FF] text-center">
                <h1 className="text-3xl font-bold text-[#19344e] mb-4">
                    Genie 구독 플랜
                </h1>
                <p className="text-gray-600 text-lg">
                    교육 기관을 위한 단일 구독 플랜으로<br />
                    안정적인 학습 환경을 제공합니다
                </p>
            </section>

            {/* Main Plan */}
            <section className="max-w-[1100px] mx-auto px-6 py-20">
                <div className="max-w-[520px] mx-auto border-1 border-[#19344e] rounded-3xl p-10 text-center shadow-sm">
                    <h2 className="text-2xl font-bold mb-2 text-[#F59E0B]">
                        Genie 플랜
                    </h2>
                    <p className="text-gray-500 mb-8">
                        승인된 교육 기관만 이용 가능한 공식 구독 플랜
                    </p>
                <Link href="/b2b/inquiry">
                    <Button className="w-full cursor-pointer hover:brightness-95">
                        도입 문의하기
                    </Button>
                </Link>
                </div>
            </section>

            {/* Features */}
            <section className="bg-[#F4F6FF] py-20">
                <div className="max-w-[1100px] mx-auto px-6">
                    <h3 className="text-2xl font-bold text-[#19344e] mb-10 text-center">
                        플랜에 포함된 주요 기능
                    </h3>

                    <div className="grid md:grid-cols-2 gap-10">
                        <div>
                            <h4 className="font-semibold text-lg mb-2 text-[#F59E0B]">
                                기관 단위 계정 관리
                            </h4>
                            <p className="text-gray-600">
                                하나의 기관 계정으로 여러 학생 계정을
                                효율적으로 관리할 수 있습니다.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg mb-2 text-[#F59E0B]">
                                AI 기반 학습 콘텐츠
                            </h4>
                            <p className="text-gray-600">
                                문장과 이야기를 기반으로 한
                                AI 이미지 생성 학습을 제공합니다.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg mb-2 text-[#F59E0B]">
                                안전 필터링 시스템
                            </h4>
                            <p className="text-gray-600">
                                교육 환경에 적합하지 않은 표현은
                                자동으로 감지 및 처리됩니다.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg mb-2 text-[#F59E0B]">
                                학습 기록 관리
                            </h4>
                            <p className="text-gray-600">
                                학생별 학습 이력과 생성 결과를
                                체계적으로 관리할 수 있습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Options */}
            <section className="py-20">
                <div className="max-w-[1100px] mx-auto px-6">
                    <h3 className="text-2xl font-bold text-[#19344e] mb-8">
                        확장 및 맞춤 운영
                    </h3>

                    <ul className="text-gray-700 space-y-3">
                        <li>• 학생 수에 따른 이용 범위 조정</li>
                        <li>• 기관 맞춤 학습 구성 및 운영 정책 적용</li>
                        <li>• 관리자 기능 확장</li>
                        <li>• 대규모 기관 전용 운영 지원</li>
                    </ul>
                </div>
            </section>

            {/* Notice */}
            <section className="bg-[#F4F6FF] py-16 text-center">
                <p className="text-sm text-gray-600 leading-relaxed font-bold">
                    GenieTune은 관리자 승인 완료 후 서비스 이용이 가능하며,<br />
                    기관별 운영 환경에 따라 제공 범위가 달라질 수 있습니다.<br />
                    자세한 내용은 별도 문의를 통해 안내드립니다.
                </p>
            </section>
        </div>
    );
}
