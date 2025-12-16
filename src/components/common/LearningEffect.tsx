import Image from "next/image";

export default function LearningEffect() {
    return (
        <section className="pt-28 pb-36">
            <div className="mx-auto max-w-[1200px] px-6 grid md:grid-cols-2 gap-20 items-center">

                <div>
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-[#19344e]">
                            지니튠 학습 효과 분석
                        </h2>
                        <div className="mt-3 w-10 h-[2px] bg-[#19344e]/20" />
                    </div>
                    <ul className="space-y-6 text-[#19344e]/80">
                        <li>
                            <strong className="text-[#F59E0B]">문법 정확성</strong>
                            <p className="text-sm mt-1">자연스러운 문장 구조 습득</p>
                        </li>
                        <li>
                            <strong className="text-[#F59E0B]">어휘 표현력</strong>
                            <p className="text-sm mt-1">확장된 표현으로 어휘력 강화</p>
                        </li>
                        <li>
                            <strong className="text-[#F59E0B]">사고력 확장</strong>
                            <p className="text-sm mt-1">단계적 사고 구조 형성</p>
                        </li>
                        <li>
                            <strong className="text-[#F59E0B]">몰입도 향상</strong>
                            <p className="text-sm mt-1">이미지 기반 학습 동기 강화</p>
                        </li>
                    </ul>
                </div>

                <div className="h-[360px] bg-white rounded-2xl border border-[#1F3A5F]/10 flex items-center justify-center text-[#1F3A5F]/30">
                    <Image
                        src="/images/learningEffect.svg"
                        alt="학습 효과 분석 예시"
                        width={1200}
                        height={800}
                        className="w-full max-w-[1100px]"
                    />
                </div>
            </div>
        </section>
    );
}
