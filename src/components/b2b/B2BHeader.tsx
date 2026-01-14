'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useCallback, useEffect, useRef, useState} from 'react';

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import {useRouter} from "next/navigation";
import {logoutThunk} from "@/store/thunk/authThunk";


export default function B2BHeader() {
    const [scrolled, setScrolled] = useState(false);
    // 축소 시 메뉴바
    const [menuOpen, setMenuOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);

    const userRef = useRef<HTMLDivElement>(null);


    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth
    );

    const handleLogout = async () => {
        await dispatch(logoutThunk());
        router.replace("/b2b/login");
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // 버튼 + 드롭다운
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (userRef.current && !userRef.current.contains(e.target as Node)) {
                setUserOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <header
            className={`
                sticky top-0 z-50 transition-all
                ${scrolled ? 'bg-[#dedfe6]/20 backdrop-blur' : 'bg-transparent'}
              `}
        >
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="flex h-[72px] items-center justify-between">

                    <Link href="/b2b">
                        <Image src="/images/b2bLogo.svg" alt="Genie" width={120} height={36} />
                    </Link>

                    <nav className="hidden md:flex gap-8 text-sm font-medium  text-[#19344e]/80 ">
                        <Link href="/b2b/company" className="hover:text-[#19344e] font-bold">회사소개</Link>
                        <Link href="/b2b/solution" className="hover:text-[#19344e] font-bold">교육 솔루션</Link>
                        <Link href="/b2b/plan" className="hover:text-[#19344e] font-bold">구독 플랜</Link>
                        <Link href="/b2b/notice" className="hover:text-[#19344e] font-bold">공지사항</Link>
                    </nav>

                    <div className="flex items-center gap-3 text-sm relative">
                        {isAuthenticated && user ? (
                            <>
                                {/* 사용자 드롭다운 (마이페이지, 로그아웃) */}
                                <div ref={userRef} className="relative">
                                    <button
                                        onClick={() => setUserOpen(v => !v)}
                                        className="
                                            flex items-center gap-1
                                            font-medium text-[#19344e]
                                            hover:opacity-80
                                            cursor-pointer
                                          "
                                    >
                                        {user.organizationName} 님
                                        <span
                                            className={`
                                              text-xs opacity-60
                                              transition-transform duration-200
                                              cursor-pointer
                                              ${userOpen ? 'rotate-180' : ''}
                                            `}
                                        >
                                                ▾
                                        </span>
                                    </button>

                                    {userOpen && (
                                    <div className="
                                        absolute right-0 top-[52px]
                                        w-[160px]
                                        rounded-2xl
                                        bg-white
                                        shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                                        cursor-pointer
                                        overflow-hidden
                                      ">
                                        <Link
                                            href="/b2b/mypage"
                                            className="
                                                block px-5 py-3
                                                text-sm text-[#19344e]
                                                hover:bg-[#f4f6fb]
                                                cursor-pointer
                                              "
                                            onClick={() => setUserOpen(false)}
                                        >
                                            마이페이지
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="
                                                w-full text-left
                                                px-5 py-3
                                                text-sm
                                                text-[#d64545]
                                                hover:bg-[#fff3f3]
                                                cursor-pointer
                                              "
                                        >
                                            로그아웃
                                        </button>
                                    </div>
                                )}
                                </div>


                                {/* Hamburger (Mobile) */}
                                <button
                                    className="md:hidden text-xl cursor-pointer"
                                    onClick={() => setMenuOpen(true)}
                                >
                                    ☰
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/b2b/login">로그인</Link>
                                <Link href="/b2b/signup">회원가입</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            {menuOpen && (
                <div className="fixed inset-0 z-50 bg-black/30">
                    <div className="absolute right-0 top-0 h-full w-[260px] bg-white p-6">
                        <button
                            className="mb-6 text-right w-full cursor-pointer"
                            onClick={() => setMenuOpen(false)}
                        >
                            ✕
                        </button>
                        <nav className="flex flex-col gap-4 font-bold">
                            <Link href="/b2b/company">회사소개</Link>
                            <Link href="/b2b/solution">교육 솔루션</Link>
                            <Link href="/b2b/plan">구독 플랜</Link>
                            <Link href="/b2b/notice">공지사항</Link>
                            <Link href="/b2b/mypage">마이페이지</Link>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}
