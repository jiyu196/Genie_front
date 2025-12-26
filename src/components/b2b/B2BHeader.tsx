'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useCallback, useEffect, useState} from 'react';

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { logout } from "@/store/slice/authSlice";
import Button from "@/components/b2b/Button";
import {useRouter} from "next/navigation";
import {logoutThunk} from "@/store/thunk/authThunk";


export default function B2BHeader() {
    const [scrolled, setScrolled] = useState(false);

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

                    <div className="flex items-center gap-4 text-sm text-[#19344e]/80 hover:text-[#19344e]">
                        {isAuthenticated && user ? (
                            <>
                                <span className="font-medium text-[#19344e]">
                                    {user.organizationName}님
                                </span>

                                <Link
                                    href="/b2b/mypage"
                                    className="font-bold">
                                    마이페이지
                                </Link>

                                <Button
                                    onClick={handleLogout}
                                    className="text-[#19344e]/90 hover:bg-gray-600"
                                    variant="primary">
                                    로그아웃
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/b2b/login"
                                      className="text-[#19344e]/90 hover:text-[#19344e]">
                                    로그인
                                </Link>
                                <Link
                                    href="/b2b/signup"
                                    className="rounded-full border border-gray-300 px-4 py-2 text-[#19344e]/90 hover:bg-gray-100">
                                    회원가입
                                </Link>
                            </>
                            )}
                    </div>
                </div>
            </div>
        </header>
    );
}
