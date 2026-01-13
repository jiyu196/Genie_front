"use client"

import Image from "next/image";
import StudentButton from "@/components/student/StudentButton";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store";
import {studentLoginThunk} from "@/store/thunk/studentAuthThunk";

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { isLoggedIn, loading } = useSelector(
        (state: RootState) => state.studentAuth
    );

    const [serviceKey, setServiceKey] = useState("");
    const [error, setError] = useState("");

    const onLogin = async () => {
        setError("");
        const res = await dispatch(studentLoginThunk(serviceKey));

        if (studentLoginThunk.fulfilled.match(res)) {
            router.push("/student");
        } else {
            setError("서비스 키가 올바르지 않습니다.");
        }
    };

    return (
        <div
            className="
                min-h-screen relative overflow-hidden
                flex items-center justify-center
                bg-gradient-to-b
                from-[#e6f2ff]
                via-[#fde7f3]
                to-[#fff3df]
              "
        >
            {/* 로그인 카드 */}
            <div
                className="
                  relative z-10
                  w-[420px]
                  bg-white/90 backdrop-blur
                  rounded-[32px]
                  px-9 py-12
                  flex flex-col gap-5
                  shadow-[0_30px_60px_rgba(239,190,190,0.45)]
                "
            >
                {/* 캐릭터 */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2">
                    <Image
                        src="/images/mascot-genie.svg"
                        alt="지니"
                        width={150}
                        height={150}
                        className="animate-[float-bob_3.8s_ease-in-out_infinite]"
                    />
                </div>

                <h2 className="mt-5 text-[28px] font-extrabold text-[#4a3b3b] text-center">
                    수업 들어가기
                </h2>

                {/* 로그인 전 */}
                {!isLoggedIn && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onLogin();
                        }}
                        className="flex flex-col gap-5"
                    >
                        <input
                            value={serviceKey}
                            onChange={(e) => setServiceKey(e.target.value)}
                            className="
                                px-4 py-4 rounded-[18px]
                                border-2 border-[#f1dada]
                                bg-white
                                text-center tracking-widest text-lg
                                outline-none
                                text-[#3b2d2d]
                                placeholder:text-[#bfa7a7]
                                focus:border-[#d48c8c]
                                focus:ring-2 focus:ring-[#d48c8c]/30
                              "
                            placeholder="서비스 키를 입력해주세요"
                        />

                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}

                        <StudentButton type="submit" disabled={loading}>
                            {loading ? "확인 중..." : "수업 시작하기"}
                        </StudentButton>
                    </form>
                )}

                {/*/!* 로그인 후 *!/*/}
                {/*{isLoggedIn && (*/}
                {/*    <StudentButton onClick={() => router.push("/student")}>*/}
                {/*        수업하러 가기*/}
                {/*    </StudentButton>*/}
                {/*)}*/}
            </div>
        </div>
    );
}