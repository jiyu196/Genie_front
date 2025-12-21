import Link from "next/link";
import Image from "next/image";

export default function StudentMainPage() {
    return (
        <div className="
  h-screen
  relative overflow-hidden
  flex items-center justify-center
  bg-gradient-to-b from-[#f6eeee] via-[#f6eeee] to-[#efe4e4]
">


        {/* 🌥️ 배경 장식 : 달 / 구름 / 별 */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.28]">

                {/* 🌙 달 (포인트용, 소수) */}
                {[
                    { top: "15%", left: "10%", size: "text-5xl" },
                    { top: "70%", right: "8%", size: "text-6xl" },
                ].map((moon, i) => (
                    <div
                        key={`moon-${i}`}
                        className={`absolute ${moon.size}`}
                        style={moon}
                    >
                        🌙
                    </div>
                ))}

                {/* ☁️ 구름 (공간 채우기용, 다수) */}
                {[
                    { top: "10%", left: "20%", size: "text-6xl" },
                    { top: "18%", right: "15%", size: "text-7xl" },
                    { top: "35%", left: "8%", size: "text-6xl" },
                    { top: "42%", right: "25%", size: "text-6xl" },
                    { top: "60%", left: "30%", size: "text-7xl" },
                    { bottom: "20%", right: "18%", size: "text-6xl" },
                    { bottom: "12%", left: "12%", size: "text-6xl" },
                ].map((cloud, i) => (
                    <div
                        key={`cloud-${i}`}
                        className={`absolute ${cloud.size}`}
                        style={cloud}
                    >
                        ☁️
                    </div>
                ))}

                {/* ⭐ 별 (가장 많이, 리듬감용) */}
                {[
                    { top: "8%", left: "40%" },
                    { top: "12%", right: "35%" },
                    { top: "22%", left: "55%" },
                    { top: "28%", right: "10%" },
                    { top: "38%", left: "18%" },
                    { top: "45%", right: "45%" },
                    { top: "55%", left: "65%" },
                    { bottom: "35%", right: "30%" },
                    { bottom: "28%", left: "42%" },
                    { bottom: "18%", right: "12%" },
                    { bottom: "10%", left: "55%" },
                ].map((star, i) => (
                    <div
                        key={`star-${i}`}
                        className="absolute text-2xl"
                        style={star}
                    >
                        ⭐
                    </div>
                ))}
            </div>



            <main className="w-[min(94vw,1200px)] relative z-10">
                <div className="relative">

                    {/* 박스 아래 그림자 */}
                    <div className="
                        absolute -bottom-8 left-1/2 -translate-x-1/2
                        w-[75%] h-12 bg-black/5 blur-2xl rounded-full
                    " />

                    {/* 메인 박스 */}
                    <div className="
                        relative bg-[#fffdf9]
                        rounded-[48px]
                        px-28 py-28
                        shadow-sm text-center
                    ">

                        {/* 캐릭터 */}
                        <div className="absolute -top-28 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <Image
                                src="/images/character.svg"
                                alt="지니"
                                width={160}
                                height={160}
                                className="animate-bounce"
                            />

                            <div className="
                                  mt-4 bg-[#fdecec]
                                  px-6 py-2 rounded-full
                                  text-sm font-semibold text-[#d48c8c]
                                  shadow-sm
                                  animate-[float_4s_ease-in-out_infinite]
                                ">
                                안녕! 오늘은 어떤 이야기를 만들어볼까?
                            </div>

                        </div>

                        {/* 제목 */}
                        <h1 className="text-5xl font-extrabold text-[#4a3b3b] mt-20 mb-6">
                            그림 이야기 놀이터
                        </h1>

                        {/* 설명 */}
                        <p className="text-base text-[#7a6f6f] mb-20 leading-relaxed">
                            단어를 골라도 되고,<br />
                            문장을 직접 써도 돼요.<br />
                            지니와 함께 그림 이야기를 만들어봐요!
                        </p>

                        {/* 선택 카드 */}
                        <div className="flex justify-center gap-14">
                            <Link href="/student/learn/word">
                                <div className="
                                      w-72 h-40 bg-[#fdecec]
                                      rounded-3xl
                                      flex flex-col items-center justify-center
                                      cursor-pointer
                                      shadow-[0_6px_0_#e6cfcf]
                                      hover:translate-y-[-4px]
                                      hover:shadow-[0_10px_0_#e6cfcf]
                                      transition
                                    ">

                                <div className="text-4xl mb-3">🧩</div>
                                    <div className="font-bold text-lg text-[#4a3b3b]">
                                        단어로 만들기
                                    </div>
                                    <div className="text-sm text-[#7a6f6f] mt-2">
                                        단어를 골라서 시작해요
                                    </div>
                                </div>
                            </Link>

                            <Link href="/student/learn/sentence">
                                <div className="
                                      w-72 h-40 bg-[#f1f3f5]
                                      rounded-3xl
                                      flex flex-col items-center justify-center
                                      cursor-pointer
                                      shadow-[0_6px_0_#ced5db]
                                      hover:translate-y-[-4px]
                                      hover:shadow-[0_10px_0_#ced5db]
                                      transition
                                    ">

                                <div className="text-4xl mb-3">✏️</div>
                                    <div className="font-bold text-lg text-[#4a3b3b]">
                                        문장으로 만들기
                                    </div>
                                    <div className="text-sm text-[#7a6f6f] mt-2">
                                        내가 문장을 써볼래요
                                    </div>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </main>

            {/* 하단 문구 */}
            <div className="
                absolute bottom-10 left-1/2 -translate-x-1/2
                text-sm text-[#9c8f8f] font-bold
            ">
                지니와 함께 만드는 나만의 그림 이야기 ✨
            </div>
        </div>
    );
}
