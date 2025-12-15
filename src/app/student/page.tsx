import Link from "next/link";
import Image from "next/image";

export default function StudentMainPage() {
    return (
        <div className="min-h-screen bg-[#f6eeee] flex flex-col">

            {/* 메인 */}
            <main className="flex-1 flex items-center justify-center relative">

                <div className="relative bg-[#fffdf9] w-[min(92vw,1100px)] min-h-[70vh] rounded-[48px] px-16 py-20 flex flex-col items-center justify-center text-center shadow-sm">

                    {/* 캐릭터 */}
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2">
                        <Image
                            src="/images/character.svg"
                            alt="지니"
                            width={160}
                            height={160}
                            className="animate-bounce"
                        />
                    </div>

                    {/* 말풍선 */}
                    <div className="mb-8 bg-[#fdecec] px-6 py-3 rounded-full text-sm font-semibold text-[#d48c8c]">
                        💬 같이 이야기 만들어볼까?
                    </div>

                    {/* 제목 */}
                    <h1 className="text-[clamp(26px,3.5vw,48px)] font-extrabold text-[#4a3b3b] leading-tight mb-12">
                        나만의 <br /> 그림 이야기 만들기
                    </h1>

                    {/* 선택 카드 */}
                    <div className="flex gap-8 flex-wrap justify-center">

                        <Link href="/student/learn/word">
                            <div className="w-64 h-36 bg-[#d48c8c] text-white rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:scale-105 transition">
                                <div className="text-3xl">🧩</div>
                                <div className="font-bold">단어</div>
                                <div className="text-sm opacity-90">단어로 만들래요!</div>
                            </div>
                        </Link>

                        <div className="w-64 h-36 bg-white border-2 border-[#d48c8c] text-[#d48c8c] rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:scale-105 transition">
                            <Link href="/student/learn/sentence">
                                <div className="text-3xl">✏️</div>
                                <div className="font-bold">문장</div>
                                <div className="text-sm">내가 문장 쓸래요!</div>
                            </Link>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
