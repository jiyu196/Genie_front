// app/b2b/company/page.tsx
import Image from "next/image";

export default function CompanyPage() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-[#F4F6FF] min-h-[80vh] flex items-center">
                <div className="w-full max-w-[800px] mx-auto text-center">
                    <h1 className="text-3xl font-bold text-[#F59E0B] leading-relaxed">
                        AI로 아이들의 이야기를 키우는<br />
                        교육용 학습 플랫폼
                    </h1>

                    <div className="mt-2 flex justify-center">
                        <Image
                            src="/images/studentLogo.svg"
                            alt="지니튠 로고"
                            width={300}
                            height={100}
                            priority
                            className="object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* Intro */}
            <section className="max-w-[1100px] mx-auto px-6 py-20">
                <p className="text-lg text-gray-700 leading-relaxed text-center">
                    GenieTune은 아이들이 문장과 이야기를 만들고<br />
                    AI를 통해 안전하게 시각화하며<br />
                    창의력과 언어 표현력을 함께 키울 수 있는<br />
                    <span className="font-semibold text-[#19344e]">
                        교육 기관 전용 학습 플랫폼
                    </span>
                    입니다.
                </p>
            </section>

            {/* Values */}
            <section className="bg-[#F4F6FF] py-20">
                <div className="max-w-[1100px] mx-auto px-6 grid md:grid-cols-2 gap-10">
                    <div>
                        <h3 className="font-semibold text-lg text-[#F59E0B] mb-2">
                            교육 환경에 맞춘 안전 설계
                        </h3>
                        <p className="text-[#19344e] ">
                            비속어 및 부적절한 표현을 자동으로 필터링하여
                            아이들이 안전한 환경에서 학습할 수 있습니다.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg text-[#F59E0B] mb-2">
                            기관 단위 관리 시스템
                        </h3>
                        <p className="text-[#19344e] ">
                            관리자 승인 기반 계정 운영으로
                            교육 기관에 최적화된 관리 환경을 제공합니다.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg text-[#F59E0B] mb-2">
                            학생 맞춤 학습 경험
                        </h3>
                        <p className="text-[#19344e]">
                            연령과 수준에 맞는 학습 흐름으로
                            자연스러운 표현력 향상을 돕습니다.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg text-[#F59E0B] mb-2">
                            학습 기록 관리
                        </h3>
                        <p className="text-[#19344e]">
                            학습 이력을 기반으로
                            학생의 성장 과정을 체계적으로 관리할 수 있습니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Trust */}
            <section className="py-20 text-center">
                <p className="text-[#19344e] font-bold">
                    GenieTune은 관리자 승인 기반으로만 서비스가 제공되며<br />
                    교육 기관을 위한 안정적인 운영 구조를 갖추고 있습니다.
                </p>
            </section>
        </div>
    );
}
