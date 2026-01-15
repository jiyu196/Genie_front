// app/b2b/(auth)/login/page.tsx
"use client";

import Link from "next/link";
import Button from "@/components/b2b/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { loginThunk } from "@/store/thunk/authThunk";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    // 로그인 시도 중 로그인 페이지 머무름 제거용
    const [submitting, setSubmitting] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleLogin = async () => {
        if(submitting) return; // 중복 방지

        if (!email || !password) {
            setError("이메일과 비밀번호를 입력해주세요.");
            return;
        }
        setSubmitting(true);

        try {
            const user = await dispatch(loginThunk({ email, password })).unwrap();
            // 성공 시 → AuthGate가 이동 처리
            const AUTH_ROUTES = {
                pending: "/b2b/pending",
                rejected: "/b2b/rejected",
                mypage: "/b2b", // 혹은 /b2b/mypage
                login: "/b2b/login",
            };
            // // 재실행 시 로그아웃 설정 ( AuthGate에서 3분 유예 설정 줌)
            // sessionStorage.setItem("b2b_session", "alive");
            // sessionStorage.setItem("b2b_last_active", Date.now().toString());
            if(!user || user.accountStatus === "INACTIVE") {
                alert("정지된 계정입니다.")
                router.replace(AUTH_ROUTES.login);
                return;
            } else if(!user || user.accountStatus === "DELETED") {
                alert("삭제된 계정입니다.")
                router.replace(AUTH_ROUTES.mypage);
                return;
            }


        } catch (err: any) {
            setSubmitting(false);

            console.log("LOGIN ERROR FINAL >>>", err);

            // unwrap() 기준: rejectWithValue 객체가 그대로 들어옴
            if (err?.code === "MEMBER_NOT_APPROVED") {
                setError("관리자 승인 후 서비스 이용이 가능합니다.");
                return;
            }

            setError(err?.message ?? "아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <>
            <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] px-10 py-8">
                <h1 className="text-2xl font-bold text-center text-[#19344e] mb-8">
                    로그인
                </h1>

                {/* form으로 감싸서 DOM 경고 및 엔터 로그인 처리 */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                    className="space-y-4"
                >
                    <input
                        className="auth-input"
                        placeholder="아이디"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError(null);
                        }}
                        autoComplete="username"
                    />

                    <input
                        className="auth-input"
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(null);
                        }}
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        className={`w-full mt-4 text-[#F4F6FF]
                        ${submitting ? "cursor-not-allowed opacity-80" : "hover:brightness-50"}
                    `}
                        disabled={submitting}
                    >
                        {submitting ? "로그인 중..." : "로그인"}
                    </Button>
                </form>
                    {error && (
                        <p className="text-sm text-red-600 mt-3 text-center">
                            {error}
                        </p>
                    )}

                <div className="flex justify-center gap-4 text-sm text-gray-500 mt-6 ">
                    <Link href="/b2b/signup" className="hover:underline">
                        회원가입
                    </Link>
                    <span>|</span>
                    <Link href="/b2b/findId" className="hover:underline">
                        아이디 찾기
                    </Link>
                    <span>|</span>
                    <Link href="/b2b/resetPassword" className="hover:underline">
                        비밀번호 찾기
                    </Link>
                </div>

                <p className="text-xs text-center text-red-700 mt-6">
                    * 관리자 승인 완료 후 서비스 이용이 가능합니다.
                </p>
            </div>
        </>
    );
}
