// components/b2b/solution/HeroSection.tsx
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="py-15 bg-[#F4F6FF] text-center">
            <div className="flex justify-center mb-6">
                <Image
                    src="/images/studentLogo.svg"
                    alt="GenieTune 로고"
                    width={200}
                    height={80}
                />
            </div>

            <h1 className="text-3xl font-bold text-[#19344e] mb-4">
                Genie 교육 솔루션
            </h1>

            <p className="text-gray-600 text-lg max-w-[640px] mx-auto">
                아이들의 문장을 이야기로,<br />
                이야기를 상상력으로 확장하는 AI 학습 흐름
            </p>
        </section>
    );
}
