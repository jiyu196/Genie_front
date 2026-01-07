import Image from "next/image";
import Button from "@/components/b2b/Button";
import Link from "next/link";

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
                        <Link href="/b2b/plan">
                            <Button className="px-6 py-3 rounded-full bg-[#1F3A5F] text-white font-medium cursor-pointer transition hover:brightness-80">
                                상품 구독 플랜
                            </Button>
                        </Link>
                        <Link href="/b2b/solution">
                            <Button variant="secondary" className="h-[44px] px-4 cursor-pointer transition hover:brightness-90">
                                교육 솔루션 소개
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* 이미지 프리뷰 영역 */}
                <div className="relative flex flex-col items-center">
                    <div className="relative flex justify-center items-center">
                        {/* 뒤 이미지들 */}
                        <Image
                            src="/images/banner-2.svg"
                            alt=""
                            width={1200}
                            height={800}
                            className="absolute -rotate-2 translate-x-[-40px] scale-[0.96] opacity-70 rounded-[24px] shadow-lg"
                        />

                        <Image
                            src="/images/banner-3.svg"
                            alt=""
                            width={1200}
                            height={800}
                            className="absolute rotate-1 translate-x-[40px] scale-[0.96] opacity-70 rounded-[24px] shadow-lg"
                        />

                        {/* 메인 이미지 */}
                        <Image
                            src="/images/banner-1.svg"
                            alt="지니튠 학생 학습 화면"
                            width={1200}
                            height={800}
                            className="relative z-10 rounded-[24px] shadow-[0_40px_100px_rgba(31,58,95,0.28)]"
                        />
                    </div>

                    {/* 캡션 */}
                    <p className="mt-4 text-sm text-[#1F3A5F]/60 text-center">
                        실제 학생 학습 사이트 화면 예시
                    </p>
                </div>


            </div>
        </section>
    );
}
