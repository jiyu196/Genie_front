"use client"

import Button from "@/components/b2b/Button";
import BackButton from "@/components/b2b/BackButton";
import {useState} from "react";
import {FIND_EMAIL_MUTATION} from "@/graphql/b2b/auth/findId";
import {useMutation} from "@apollo/client";
import {maskEmail} from "@/utils/maskEmail";

export default function FindIdPage() {
    // 입력값 상태
    const [bizNumber, setBizNumber] = useState("");
    const [contactName, setContactName] = useState("");

    // 결과 상태
    const [foundEmail, setFoundEmail] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);


    // 아이디 찾기 뮤테이션
    const [findEmail, { loading }] = useMutation(FIND_EMAIL_MUTATION, {
        errorPolicy: "all",
    });

    // 아이디 찾기 버튼 클릭 시
    const handleSubmit = async  () => {
        // 입력값 검증
        if (!bizNumber || !contactName) {
            setErrorMessage("모든 항목을 입력해주세요.");
            return;
        }

        setErrorMessage(null);
        setFoundEmail(null);

        try {
            const result = await findEmail({
                variables: {
                    input: {
                        bizNumber,
                        contactName,
                    },
                },
            });

            const { data, errors } = result;

            // 1. 정상 성공
            if (data?.findEmail?.email) {
                setFoundEmail(maskEmail(data.findEmail.email));
                setIsResultModalOpen(true);
                return;
            }

            // 2. 회원 없음 (비즈니스 에러)
            if (errors?.some(e => e.extensions?.errorCode === "MEMBER_NOT_FOUND")) {
                setErrorMessage("입력한 정보와 일치하는 회원이 없습니다.");
                return;
            }

            // 3. 그 외 GraphQL 에러
            setErrorMessage("요청 처리 중 오류가 발생했습니다.");

        } catch (e) {
            // 4. 네트워크 / 서버 장애
            setErrorMessage(
                "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            );
        }
    };

    return (
        <section className="max-w-[480px] ml-8 mt-10 space-y-8">
            {/* 타이틀 */}
            <div className="space-y-2">
                {/* 뒤로가기 */}
                <BackButton/>
                <h1 className="text-2xl font-bold text-[#19344e]">
                    아이디(이메일) 찾기
                </h1>
                <p className="text-sm text-[#19344e]/60 mt-1">
                    가입 시 등록한 정보를 입력해주세요.
                </p>
            </div>

            {/* 입력 영역 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
                <div className="space-y-3">
                    <input
                        value={bizNumber}
                        onChange={(e) => setBizNumber(e.target.value)}
                        type="text"
                        placeholder="사업자등록번호"
                        className="auth-input"
                    />
                    <input
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        type="text"
                        placeholder="담당자 이름"
                        className="auth-input"
                    />
                </div>

                <Button
                    className="w-full py-3 hover:brightness-80"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    아이디 찾기
                </Button>
            </div>
            {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <p className="text-sm text-red-700">
                        {errorMessage}
                    </p>
                </div>
            )}


            {/* 성공결과 영역  */}
            {isResultModalOpen && (
                <div className="
    fixed inset-0 z-50
    flex items-center justify-center
    bg-black/60
    backdrop-blur-sm
  ">
                    <div className="
      bg-white rounded-2xl
      px-10 py-10
      w-[420px]
      text-center space-y-7
      border border-gray-100
      shadow-[0_24px_48px_rgba(0,0,0,0.18)]
      animate-[fadeIn_0.2s_ease-out]
    ">

                        <div className="mx-auto w-12 h-12 rounded-full bg-green-100
                      flex items-center justify-center">
                            ✓
                        </div>

                        <h2 className="text-xl font-bold text-[#19344e]">
                            이메일 찾기 완료
                        </h2>

                        <p className="text-sm text-gray-500">
                            고객님의 이메일은 아래와 같습니다.
                        </p>

                        <p className="font-semibold text-green-600 text-lg">
                            {foundEmail}
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
