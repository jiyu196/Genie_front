import Image from "next/image";

export default function Banner() {
    return (
        <section className="pt-32 pb-40">
            <div className="mx-auto max-w-[1200px] px-6 grid md:grid-cols-2 gap-20 items-center">

                {/* 텍스트 */}
                <div>
                    <p className="text-lg font-semibold text-[#F59E0B]">
                        AI 기반 언어 학습 플랫폼
                    </p>

                    <h1 className="mt-4 text-5xl font-bold leading-tight">
                        아이의 생각을<br />
                        이야기로 완성하는<br />
                        학습 경험
                    </h1>

                    <p className="mt-6 text-lg text-[#1F3A5F]/70">
                        단어 입력부터 문장 구성, 이미지 생성까지<br />
                        아이의 언어 표현력과 사고력을 단계적으로 키웁니다.
                    </p>

                    <div className="mt-10 flex gap-4">
                        <button className="px-6 py-3 rounded-full bg-[#1F3A5F] text-white font-medium">
                            상품 구독 플랜
                        </button>
                        <button className="px-6 py-3 rounded-full border border-[#1F3A5F]/30">
                            서비스 소개
                        </button>
                    </div>
                </div>

                {/* 이미지 카드 */}
                <div className="h-[320px] bg-white rounded-2xl border border-[#1F3A5F]/10 flex items-center justify-center text-[#1F3A5F]/30">
                    <Image
                        src="/images/banner.svg"
                        alt="지니튠 미리보기"
                        width={1200}
                        height={800}
                        className="w-full max-w-[1100px]"
                    />
                </div>
            </div>
        </section>
    );
}
