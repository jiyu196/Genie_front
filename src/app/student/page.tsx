import Link from "next/link";
import StudentIndexBackground from "@/components/student/StudentIndexBackground";
import Image from "next/image";

export default function StudentMainPage() {
    return (
        <div className="w-full h-full relative overflow-hidden flex flex-col">
            {/* 인덱스 배경 */}
            <StudentIndexBackground />

            {/* 메인 콘텐츠 */}
            <main
                className="
                    flex-1
                    flex flex-col
                    items-center
                    justify-center
                    gap-10
                    relative z-10
                "
            >
                <div className="pt-28">
                    <div
                        className="
                            relative
                            max-w-[900px]
                            w-full
                            px-12
                            pt-24
                            pb-16
                            rounded-[64px]
                            bg-white/40
                            backdrop-blur-md
                            text-center
                          "
                    >
                    {/* 메인 캐릭터 */}
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2">
                            <Image
                                src="/images/mascot-genie.svg"
                                alt="지니"
                                width={180}
                                height={180}
                                className="animate-[float-bob_3.8s_ease-in-out_infinite]"
                            />
                        </div>

                        {/* 말풍선 */}
                        <div className="mb-6 inline-block bg-white/80 px-6 py-3 rounded-full text-sm font-semibold text-[#c96b8c] shadow">
                            안녕! 오늘은 어떤 이야기를 만들어볼까?
                        </div>

                        {/* 제목 */}
                        <h1 className="text-5xl font-extrabold text-[#3b2d2d] mb-4">
                            그림 이야기 놀이터
                        </h1>

                        {/* 설명 */}
                        <p className="text-base text-[#6f6464] leading-relaxed mt-10 mb-1">
                            단어로 써도 되고,<br />
                            문장을 직접 써도 돼요.<br />
                            지니와 함께 그림 이야기를 만들어봐요!
                        </p>

                    {/* 선택 카드 */}
                        <div className="flex justify-center gap-16">
                        {/* 선택 카드 */}
                        <div className="mt-20 flex gap-16">
                            <Link href="/student/learn/word">
                                <div
                                    className="
                                    w-72 h-40 bg-white
                                    rounded-[32px]
                                    flex flex-col items-center justify-center
                                    cursor-pointer
                                    text-[#3b2d2d]
                                    shadow-[0_20px_40px_rgba(239,190,190,0.6)]
                                    hover:-translate-y-2
                                    hover:shadow-[0_30px_50px_rgba(239,190,190,0.7)]
                                    transition
                                  "
                                >
                                    <div className="flex flex-col items-center">
                                        <Image
                                            src="/images/mascot-yellow.svg"   // 초록 지니
                                            alt="단어로 만들기"
                                            width={72}
                                            height={72}
                                            className="mb-2 hover:scale-110 transition"
                                        />
                                        <div className="font-bold">단어로 만들기</div>
                                        <div className="text-sm text-gray-500">단어로 쓸래요!</div>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/student/learn/sentence">
                                <div
                                    className="
                                    w-72 h-40 bg-white
                                    rounded-[32px]
                                    text-[#3b2d2d]
                                    flex flex-col items-center justify-center
                                    cursor-pointer
                                    shadow-[0_20px_40px_rgba(190,210,255,0.6)]
                                    hover:-translate-y-2
                                    hover:shadow-[0_30px_50px_rgba(190,210,255,0.7)]
                                    transition
                                  "
                                >

                                    <div className="flex flex-col items-center">
                                        <Image
                                            src="/images/mascot-green.svg"   // 초록 지니
                                            alt="단어로 만들기"
                                            width={72}
                                            height={72}
                                            className="mb-2 hover:scale-110 transition"
                                        />
                                        <div className="font-bold">문장으로 만들기</div>
                                        <div className="text-sm text-gray-500">제가 문장을 써볼래요!</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* 하단 문구 (여기로 이동) */}
                        <div className="mt-10 text-sm text-[#9c8f8f] font-semibold">
                        지니와 함께 만드는 나만의 그림 이야기 ✨
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
