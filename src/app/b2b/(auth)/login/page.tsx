// app/b2b/(auth)/login/page.tsx
"use client"

import Link from "next/link";
import Button from "@/components/b2b/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { loginThunk } from "@/store/thunk/authThunk";
import {useRouter} from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";



export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[error, setError] = useState<string | null>(null);

    // 로그인 시도 중 로그인 페이지 머무름 제거용
    const [submitting, setSubmitting] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleLogin = async () => {
        setError(null);
        setSubmitting(true);

        try {
            await dispatch(loginThunk({ email, password })).unwrap();
            // 성공 시 → AuthGate가 이동 처리
        } catch (err) {
            setSubmitting(false);
            setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    };



    return (
        <>
                {/* 전체 화면 덮는 spinner */}
                {/*{submitting && !error && <LoadingSpinner />}*/}
        <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] px-10 py-8">
            <h1 className="text-2xl font-bold text-center text-[#19344e] mb-8">
                로그인
            </h1>

            <div className="space-y-4">
                <input
                    className="auth-input"
                    placeholder="아이디"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="auth-input"
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && (
                <p className="text-sm text-red-600 mt-3 text-center">
                    {error}
                </p>
            )}

            <Button
                className="w-full mt-6 text-[#F4F6FF] hover:brightness-50 cursor-pointer"
                onClick={handleLogin}
            >
                로그인
            </Button>

            <div className="flex justify-center gap-4 text-sm text-gray-500 mt-6 ">
                <Link href="/b2b/signup" className="hover:underline">
                    회원가입
                </Link>
                <span>|</span>
                <button className="hover:underline cursor-pointer">
                    아이디 찾기
                </button>

                <span>|</span>
                <button className="hover:underline cursor-pointer">
                    비밀번호 찾기
                </button>
            </div>

            <p className="text-xs text-center text-red-700 mt-6">
                * 관리자 승인 완료 후 서비스 이용이 가능합니다.
            </p>
        </div>
        </>
    );
}
