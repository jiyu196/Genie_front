// src/components/common/StudentHeader.tsx
import Link from "next/link";
import Image from "next/image";

export default function StudentHeader() {
    return (
        <header
            className="
                sticky top-0 z-20 h-20 px-6 flex items-center
                justify-between
                bg-[#eaeffc]/80 backdrop-blur-sm
                border-b border-white/40
                transition
                overflow-hidden
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

            {/* 네비 */}
            <nav className="flex items-center">
                <Link href="/student/login">
                    <button
                        className="
                            ml-6
                            text-md
                            font-semibold
                            text-[#4a3b3b]
                            hover:text-[#d48c8c]
                            transition
                            cursor-pointer
                        "
                    >
                        로그인
                    </button>
                </Link>

                <Link href="/student/myPage">
                    <button
                        className="
                            ml-6
                            text-md
                            font-semibold
                            text-[#4a3b3b]
                            hover:text-[#d48c8c]
                            transition
                            cursor-pointer
                        "
                    >
                        내 학습방
                    </button>
                </Link>
            </nav>
        </header>
    );
}
