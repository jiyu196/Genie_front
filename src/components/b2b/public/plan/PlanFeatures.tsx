// components/b2b/plan/PlanFeatures.tsx
export default function PlanFeatures() {
    return (
        <>
            {/* Features */}
            <section className="bg-[#F4F6FF] py-24">
                <div className="max-w-[1100px] mx-auto px-6">
                    <h3 className="text-2xl font-bold text-[#19344e] mb-14 text-center">
                        기관 운영을 위한 핵심 기능
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8">
                        <FeatureCard
                            title="기관 단위 계정 관리"
                            desc="기관 계정 하나로 여러 학생 계정을 통합 관리할 수 있습니다."
                            icon="🏫"
                        />
                        <FeatureCard
                            title="AI 기반 학습 콘텐츠"
                            desc="문장과 이야기를 기반으로 한 AI 이미지 생성 학습 환경을 제공합니다."
                            icon="🤖"
                        />
                        <FeatureCard
                            title="안전 필터링 시스템"
                            desc="교육 환경에 부적합한 표현을 자동으로 감지하고 차단합니다."
                            icon="🛡️"
                        />
                        <FeatureCard
                            title="학습 기록 관리"
                            desc="학생별 학습 이력과 생성 결과를 체계적으로 관리할 수 있습니다."
                            icon="📊"
                        />
                    </div>
                </div>
            </section>

            {/* Notice */}
            <section className="bg-white py-14">
                <div className="max-w-[900px] mx-auto px-6">
                    <div className="border border-[#e5e7eb] rounded-xl p-6 text-center">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            GenieTune은 관리자 승인 완료 후 서비스 이용이 가능하며,<br />
                            기관별 운영 환경에 따라 제공 범위가 달라질 수 있습니다.<br />
                            자세한 내용은 별도 문의를 통해 안내드립니다.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

function FeatureCard({
                         title,
                         desc,
                         icon,
                     }: {
    title: string;
    desc: string;
    icon: string;
}) {
    return (
        <div className="bg-white rounded-2xl p-8 border border-[#e5e7eb] shadow-sm">
            <div className="text-3xl mb-4">{icon}</div>
            <h4 className="font-semibold text-lg mb-2 text-[#19344e]">
                {title}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
                {desc}
            </p>
        </div>
    );
}
