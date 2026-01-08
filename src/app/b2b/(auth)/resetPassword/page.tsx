"use client"

import Button from "@/components/b2b/Button";
import BackButton from "@/components/b2b/BackButton";
import {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {RESET_PASSWORD} from "@/graphql/b2b/auth/resetPassword";

export default function FindPasswordPage() {

    const [bizNumber, setBizNumber] = useState("");
    const [contactName, setContactName] = useState("");

    // 결과 상태
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);

    const [resetPassword, { loading }] = useMutation(
        RESET_PASSWORD,
        {
            errorPolicy: "all",
        }
    );

    // 스크롤 방지
    useEffect(() => {
        document.body.style.overflow = isResultModalOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isResultModalOpen]);


    const handleSubmit = async () => {
        // 입력값 검증
        if (!email || !bizNumber || !contactName) {
            setErrorMessage("모든 항목을 입력해주세요.");
            return;
        }

        setErrorMessage(null);

        try {
            const result = await resetPassword({
                variables: {
                    input: {
                        email,
                        bizNumber,
                        contactName,
                    },
                },
            });

            const { data, errors } = result;

            // 성공 시
            if (data?.resetPassword?.result) {
                setIsResultModalOpen(true);
                return;
            }

            // 회원 없을 시
            if (errors?.some(e => e.extensions?.errorCode === "MEMBER_NOT_FOUND")) {
                setErrorMessage("입력한 정보와 일치하는 회원이 없습니다.");
                return;
            }

            // 기타 서버 오류
            setErrorMessage("요청 처리 중 오류가 발생했습니다.");

        } catch {
            setErrorMessage("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
    };


    return (
        <section className="max-w-[480px] ml-8 mt-10 space-y-8">

            {/* 타이틀 */}
            <div className="space-y-2">
                {/* 뒤로가기 */}
                <BackButton />
                <h1 className="text-2xl font-bold text-[#19344e]">
                    비밀번호 찾기
                </h1>
                <p className="text-sm text-[#19344e]/60 mt-1">
                    가입 시 사용한 이메일로 인증을 진행합니다.
                </p>
            </div>



            {/* 이메일 입력 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
                <input
                    type="text"
                    placeholder="사업자등록번호"
                    value={bizNumber}
                    onChange={(e) => setBizNumber(e.target.value)}
                    className="auth-input"
                />

                <input
                    type="text"
                    placeholder="담당자명"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="auth-input"
                />

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 주소"
                    className="auth-input"
                />

                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-3 hover:brightness-80"
                >
                    {loading ? "전송 중..." : "인증 메일 보내기"}
                </Button>
            {errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
            )}
            </div>

            {/* 안내 */}
            <div className="text-xs text-[#19344e]/60 leading-relaxed">
                입력한 이메일로 인증 코드가 전송됩니다.<br />
                메일이 도착하지 않는 경우 스팸함을 확인해주세요.
            </div>

            {isResultModalOpen && (
                <div className="
                    fixed inset-0 z-50
                    flex items-center justify-center
                    bg-black/60 backdrop-blur-sm
                  ">
                                    <div className="
                      bg-white rounded-2xl
                      px-10 py-10 w-[420px]
                      text-center space-y-7
                      shadow-[0_24px_48px_rgba(0,0,0,0.18)]
                    ">
                        <div className="mx-auto w-12 h-12 rounded-full bg-green-100
                      flex items-center justify-center">
                            ✓
                        </div>

                        <h2 className="text-xl font-bold text-[#19344e]">
                            임시 비밀번호 발송 완료
                        </h2>

                        <p className="text-sm text-gray-500 leading-relaxed">
                            입력하신 이메일로<br />
                            임시 비밀번호를 보내드렸습니다.
                        </p>

                        <Button
                            className="w-full"
                            onClick={() => window.location.href = "/b2b/login"}
                        >
                            로그인하러 가기
                        </Button>
                    </div>
                </div>
            )}

        </section>
    );
}
