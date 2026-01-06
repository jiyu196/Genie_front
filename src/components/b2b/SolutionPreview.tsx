// components/b2b/home/SolutionPreview.tsx
import Link from "next/link";
import Button from "@/components/b2b/Button";

export default function SolutionPreview() {
    return (
        <section className="py-28 bg-[#F4F6FF]">
            <div className="mx-auto max-w-[1100px] px-6">

                {/* 섹션 헤더 */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[#19344e] mb-4">
                        Genie 교육 솔루션
                    </h2>
                    <p className="text-gray-600 text-lg">
                        아이의 문장을 이야기로 확장하는<br />
                        AI 기반 학습 흐름
                    </p>
                </div>

                {/* 학습 흐름 요약 */}
                <div className="grid md:grid-cols-4 gap-8 mb-20">
                    <Step
                        step="STEP 1"
                        title="문장 입력"
                        desc="아이가 직접 문장 또는 이야기를 작성합니다."
                    />
                    <Step
                        step="STEP 2"
                        title="표현 검증"
                        desc="교육 환경에 맞지 않는 표현은 자동으로 필터링됩니다."
                    />
                    <Step
                        step="STEP 3"
                        title="이미지 생성"
                        desc="AI가 문장을 기반으로 이야기를 시각화합니다."
                    />
                    <Step
                        step="STEP 4"
                        title="학습 기록"
                        desc="학습 결과와 이력이 자동으로 저장됩니다."
                    />
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link href="/b2b/solution">
                        <Button
                            variant="secondary"
                            className="px-6 py-3 cursor-pointer hover:brightness-95"
                        >
                            교육 솔루션 자세히 보기
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

function Step({
                  step,
                  title,
                  desc,
              }: {
    step: string;
    title: string;
    desc: string;
}) {
    return (
        <div className="bg-white rounded-2xl p-8 border border-[#19344e]/10 text-center">
            <div className="text-xs font-semibold text-[#19344e]/60 mb-2">
                {step}
            </div>
            <h3 className="font-semibold text-lg text-[#F59E0B] mb-3">
                {title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
                {desc}
            </p>
        </div>
    );
}
