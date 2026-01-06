// components/b2b/plan/HeroSection.tsx
export default function HeroSection() {
    return (
        <section className="py-23 bg-[#F4F6FF] text-center">
            <h1 className="text-3xl font-bold text-[#19344e] mb-6">
                Genie 기관 전용 구독 플랜
            </h1>

            <p className="text-gray-600 text-lg max-w-[640px] mx-auto leading-relaxed">
                GenieTune은 교육 기관 단위로 운영되는 AI 학습 서비스입니다.<br />
                관리자 승인 완료 후, 기관 환경에 맞는 구독 플랜을 선택하여 이용할 수 있습니다.
            </p>

            <div className="mt-8 text-sm text-gray-500">
                ※ 본 서비스는 개인 사용자가 아닌, 승인된 교육 기관에 한해 제공됩니다.
            </div>
        </section>
    );
}
