// components/b2b/company/HeroSection.tsx
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="bg-[#F4F6FF] py-15 text-center">
            <div className="flex justify-center mb-6">
                <Image
                    src="/images/studentLogo.svg"
                    alt="GenieTune 로고"
                    width={260}
                    height={100}
                    priority
                />
            </div>

            <h1 className="text-3xl font-bold text-[#19344e] leading-relaxed mb-6">
                교육 환경을 위한<br />
                AI 기반 학습 플랫폼
            </h1>

            <p className="text-gray-600 text-lg max-w-[640px] mx-auto leading-relaxed">
                GenieTune은 아이들의 문장과 이야기를 안전하게 확장하고,<br />
                교육 기관이 신뢰할 수 있는 학습 환경을 제공하기 위해 설계된<br />
                기관 전용 AI 학습 플랫폼입니다.
            </p>
        </section>
    );
}
