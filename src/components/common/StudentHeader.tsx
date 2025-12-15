// src/components/common/StudentHeader.tsx
import Link from "next/link";
import Image from "next/image";

export default function StudentHeader() {
    return (
        <header
            className="
            relative z-10
            h-20
            px-6
            flex items-center
            justify-between
            overflow-visible
            "
        >

        {/* 로고 */}
            <Link href="/student">
                <div className="flex items-center gap-2 cursor-pointer">
                    <Image
                        src="/images/studentLogo.svg"
                        alt="지니 로고"
                        width={120}
                        height={36}
                        priority
                        className="object-contain"
                    />
                </div>
            </Link>

            <nav className="flex items-center">
                <Link href="/student/login">
                    <button
                        className="
                            ml-6
                            text-sm
                            font-semibold
                            text-[#4a3b3b]
                            hover:text-[#d48c8c]
                            transition
                        "
                    >
                        로그인
                    </button>
                </Link>

                <Link href="/student/myPage">
                    <button
                        className="
                            ml-6
                            text-sm
                            font-semibold
                            text-[#4a3b3b]
                            hover:text-[#d48c8c]
                            transition
                        "
                    >
                        내 학습방
                    </button>
                </Link>
            </nav>
        </header>
    );
}
