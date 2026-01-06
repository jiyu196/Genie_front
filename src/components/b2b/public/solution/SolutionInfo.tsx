// components/b2b/solution/SolutionInfo.tsx
export default function SolutionInfo() {
    return (
        <section className="max-w-[1100px] mx-auto px-6 py-24">
            {/* Learning Flow */}
            <h2 className="text-2xl font-bold text-[#19344e] text-center mb-16">
                학습 흐름
            </h2>

            <div className="grid md:grid-cols-4 gap-8 text-center mb-20">
                <Step title="문장 입력" desc="아이가 직접 문장 또는 짧은 이야기를 작성합니다." />
                <Step title="표현 검증" desc="부적절한 표현은 자동으로 순화·필터링됩니다." />
                <Step title="이미지 생성" desc="AI가 문장을 기반으로 이야기를 시각화합니다." />
                <Step title="학습 기록" desc="학습 결과와 이력이 자동으로 저장됩니다." />
            </div>

            {/* Student Experience */}
            <div className="max-w-[900px] mx-auto text-center mb-20">
                <h3 className="text-xl font-semibold text-[#19344e] mb-6">
                    학생 학습 경험
                </h3>
                <p className="text-gray-700 leading-relaxed">
                    GenieTune은 아이들이 단순히 정답을 입력하는 학습이 아니라,<br />
                    스스로 문장을 만들고 이야기를 구성하는 과정을 통해<br />
                    표현력과 사고력을 자연스럽게 확장할 수 있도록 설계되었습니다.<br /><br />

                    AI는 학습의 결과물이 아니라,
                    <span className="font-semibold text-[#19344e]">
                        {" "}아이의 생각을 시각화해주는 도구
                    </span>
                    로 작동합니다.
                </p>
            </div>

            {/* Learning Outcome */}
            <div className="grid md:grid-cols-3 gap-8">
                <Outcome
                    title="자기 주도적 학습"
                    desc="아이 스스로 문장을 만들고 이야기를 확장하며 학습에 참여합니다."
                />
                <Outcome
                    title="표현력 및 사고력 향상"
                    desc="문장 구성과 시각화 과정을 통해 언어 표현력과 사고력을 함께 키웁니다."
                />
                <Outcome
                    title="안전한 학습 환경"
                    desc="교육 환경에 맞지 않는 표현은 자동으로 필터링되어 안전하게 학습할 수 있습니다."
                />
            </div>
        </section>
    );
}

function Step({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="bg-white rounded-xl p-6 border border-[#e5e7eb]">
            <h3 className="font-semibold text-[#F59E0B] mb-2">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
        </div>
    );
}

function Outcome({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="bg-white rounded-2xl p-8 border border-[#e5e7eb] text-center">
            <h4 className="font-semibold text-lg text-[#19344e] mb-3">
                {title}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
                {desc}
            </p>
        </div>
    );
}
