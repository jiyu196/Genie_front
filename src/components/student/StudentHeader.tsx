// src/components/common/StudentHeader.tsx
"use client"

import Link from "next/link";
import Image from "next/image";
import StudentButton from "@/components/student/StudentButton";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import {studentLogoutThunk} from "@/store/thunk/studentAuthThunk";

export default function StudentHeader(){
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const {isLoggedIn, initialized } = useSelector(
        (state: RootState) => state.studentAuth
    );

    if (!initialized) return null;

    const onLogout = async () => {
        await dispatch(studentLogoutThunk());
        router.push("/student/login");
    };

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
                {!isLoggedIn && (
                    <Link href="/student/login">
                        <StudentButton className="px-4 ml-6 font-semibold text-[#4a3b3b]">
                            로그인
                        </StudentButton>
                    </Link>
                )}

                {isLoggedIn && (
                    <div className="flex items-center gap-3 ml-6">
                        <Link href="/student/mypage">
                            <StudentButton className="px-4 font-semibold text-[#4a3b3b]">
                                내 학습방
                            </StudentButton>
                        </Link>

                        <StudentButton
                            onClick={onLogout}
                            className="
                                px-4
                                text-sm
                                text-[#8a6f6f]
                                hover:text-[#d48c8c]
                              "
                            variant="ghost"
                        >
                            로그아웃
                        </StudentButton>
                    </div>
                )}
            </nav>
        </header>
    );
}
