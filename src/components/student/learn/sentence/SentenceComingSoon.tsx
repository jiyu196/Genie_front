"use client";

import Link from "next/link";
import Image from "next/image";
import StudentButton from "@/components/student/StudentButton";

export default function SentenceComingSoonPage() {
    return (
        <div className="learn-bg min-h-[calc(100vh-64px)] flex items-center justify-center">
            <div className="text-center px-6">

                {/* 캐릭터 */}
                <div className="mb-1 flex justify-center">
                    <Image
                        src="/images/mascot-genie.svg"
                        alt="지니 캐릭터"
                        width={120}
                        height={120}
                    />
                </div>

                {/* 단계 힌트 말풍선 */}
                <div className="mb-6 inline-block rounded-full bg-white/80 px-6 py-2 text-sm text-gray-700 shadow">
                    지금은 단어로 이야기 만드는 단계예요 ✨
                </div>

                {/* 제목 */}
                <h1 className="text-3xl font-bold mb-4 text-[#3b2d2d]">
                    그림 이야기 놀이터
                </h1>

                {/* 보조 설명 (이게 핵심) */}
                <p className="text-sm text-gray-600 mb-10 leading-relaxed">
                    단어로 생각을 만들고 나면,<br />
                    그 다음에 문장으로 이야기를 이어갈 수 있어요 😊
                </p>

                {/* 메인급 CTA */}
                <div className="flex justify-center">
                    <Link href="/student/learn/word">
                        <StudentButton className="px-8">
                            단어로 만들기
                        </StudentButton>
                    </Link>
                </div>

                {/* 최소 안내 */}
                <p className="mt-6 text-xs text-gray-500">
                    문장으로 만드는 놀이는 다음에 열릴 거예요 🌱
                </p>
                <p className="mt-2 text-[11px] text-gray-500">
                    ※ 현재 서비스는 단어 기반 이야기 생성 기능을 우선 제공하고 있습니다.
                </p>
            </div>
        </div>
    );
}
