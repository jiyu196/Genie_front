// components/b2b/company/ValueSection.tsx
export default function ValueSection() {
    return (
        <section className="bg-[#F4F6FF] py-24">
            <div className="max-w-[1100px] mx-auto px-6 grid md:grid-cols-2 gap-10">
                <Value
                    title="교육 환경에 맞춘 안전 설계"
                    desc="비속어 및 부적절한 표현을 자동으로 필터링하여
                    아이들이 안전한 환경에서 학습할 수 있도록 지원합니다."
                />
                <Value
                    title="기관 단위 관리 시스템"
                    desc="관리자 승인 기반 계정 운영으로
                    교육 기관에 최적화된 관리 환경을 제공합니다."
                />
                <Value
                    title="학생 맞춤 학습 경험"
                    desc="연령과 수준에 맞는 학습 흐름으로
                    자연스러운 표현력 향상을 돕습니다."
                />
                <Value
                    title="학습 기록 관리"
                    desc="학생의 학습 이력을 기반으로
                    성장 과정을 체계적으로 관리할 수 있습니다."
                />
            </div>
        </section>
    );
}

function Value({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="bg-white rounded-2xl p-8 border border-[#e5e7eb]">
            <h3 className="font-semibold text-lg text-[#19344e] mb-3">
                {title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
                {desc}
            </p>
        </div>
    );
}
