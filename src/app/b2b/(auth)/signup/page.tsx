// app/b2b/(auth)/signup/register/page.tsx
"use client";

import Button from "@/components/b2b/Button";
import {checkBusiness} from "@/services/business";
import {useState, useEffect} from "react";
import {REGISTER_MUTATION} from "@/graphql/auth/register";
import {useRouter} from "next/navigation";
import {useMutation} from "@apollo/client";
import {CHECK_BIZ_NUMBER} from "@/graphql/business/checkBizNumber";

export default function SignupRegisterPage() {
    const [register] = useMutation(REGISTER_MUTATION, {
        fetchPolicy: "no-cache",
    });
    const [bizMessage, setBizMessage] = useState<string | null>(null);
    const [checkBizNumber] = useMutation(CHECK_BIZ_NUMBER, {
        fetchPolicy: "no-cache",
    });

    const [isChecked, setIsChecked] = useState(false);

    const router = useRouter();
    const [bizNumber, setBizNumber] = useState("");
    const [representativeName, setRepresentativeName] = useState("");
    const [openingDate, setOpeningDate] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [organizationName, setOrganizationName] = useState("");
    const [contactName, setContactName] = useState("");

    const [isBizVerified, setIsBizVerified] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // // 입력값 바뀌면 사업자 조회 다시 가능
    // useEffect(() => {
    //     setIsChecked(false);
    //     setIsBizVerified(false);
    //     setBizMessage(null);
    // }, [bizNumber, representativeName, openingDate]);

    // 사업자 조회 버튼
    const onCheckBusiness = async () => {
        if(isChecked) return;

        // 초기화를 한번 해줘야함. 캐시초기화
        setIsBizVerified(false);
        setBizMessage(null);

        try {
            console.log(bizNumber);
            console.log(representativeName);
            console.log(openingDate);
            const res = await checkBizNumber({
                fetchPolicy: "no-cache",
                variables: {
                    input: {
                        bizNumber,
                        representativeName,
                        openingDate,
                    },
                },
            });
            console.log(res);

            // 같은 요청 여러번 날렸을 때 방어코드
            // graph1l 에러방어
            if(!res.data || !res.data.checkBizNumber) {
                setBizMessage("사업자 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
                setIsChecked(true); // 한번 조회하면 버튼 비활성화
                return;
            }

            const result = res.data.checkBizNumber;

            // 상태코드 방어
            if(!result.businessStatusCode) {
                setBizMessage("사업자 상태를 확인할 수 없습니다.");
                return;
            }

            // 폐업 / 휴업일때 가입 불가능
            if (result.businessStatusCode !== "01") {
                setBizMessage(
                    result.businessStatusCode === "02"
                        ? "휴업 중인 사업자는 가입이 불가합니다."
                        : "폐업된 사업자는 가입이 불가합니다."
                );
                setIsChecked(true);
                return;
            }

            // 정상일 때만 다음 단계 허용
            setBizMessage("정상 사업자입니다. 회원가입을 진행해주세요.");
            setIsBizVerified(true);
            setIsChecked(true);


        } catch(e: any) {
        console.error("biz 에러:", e);
        console.error("graphQL 에러:", e?.graphQLErrors);
        setBizMessage("사업자 조회 중 오류가 발생했습니다. 잠시후 다시 시도해주세요.");
        setIsBizVerified(false);
        setIsChecked(true);
        }
    };

    // 회원가입 버튼
    const onSubmit = async () => {
        setIsSubmitting(true);

        try {
            const res = await register({
                variables: {
                    input: {
                        email,
                        password,
                        bizNumber,
                        representativeName,
                        openingDate,
                        organizationName,
                        contactName,
                    },
                },
            });

            console.log("REGISTER RESPONSE FULL:", res.data);
        console.log("REGISTER STATUS:", res.data.register.registrationStatus);

            const status = res.data.register.registerStatus;

            switch (status) {
                case "PENDING":
                    router.push("/b2b/pending");
                    break;

                case "REJECTED":
                    alert("폐업 및 휴업 사업자는 가입이 불가합니다.")
                    break;

                default:
                    alert("가입 처리 중 오류가 발생했습니다.")
            }

        } catch(e) {
            console.error(e);
            alert("회원가입 요청에 실패했습니다")
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] px-10 py-9">
            <h1 className="text-2xl font-bold text-center text-[#19344e] mb-8">
                기관 / 단체 회원가입
            </h1>

            {/* 로그인 정보 */}
            <section className="space-y-4 mb-6">
                <h2 className="font-semibold text-lg text-gray-700">
                    로그인 정보
                </h2>
                <div className="relative">
                    <input
                        className="auth-input"
                        placeholder="이메일 (로그인 ID)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        variant="secondary"
                        type="button"
                        className="
                        absolute right-3 top-1/2 -translate-y-1/2 h-[30px]
                        px-4 py-0 text-xs leading-none flex items-center justify-center whitespace-nowrap
                        text-[#19344e]/70 hover:text-[#19344e] transition"
                    >
                        인증메일 발송
                    </Button>
                </div>

                <div className="relative">
                    <input
                        className="auth-input pr-24"
                        placeholder="이메일 인증번호 입력"
                    />
                    <Button
                        variant="secondary"
                        type="button"
                        className="
                        absolute right-3 top-1/2 -translate-y-1/2 h-[30px]
                        px-4 py-0 text-xs leading-none flex items-center justify-center whitespace-nowrap
                        text-[#19344e]/70 hover:text-[#19344e] transition"
                    >
                        확인
                    </Button>
                </div>

                <input
                    className="auth-input"
                    type="password"
                    placeholder="비밀번호 (8~16자)"
                />

                <input
                    className="auth-input"
                    type="password"
                    placeholder="비밀번호 확인"
                />
            </section>

            {/* 사업자 진위여부 검증 */}
            <section className="space-y-4 mb-6 ">
                <h2 className="font-semibold text-lg text-gray-700">
                    사업자 인증
                </h2>
                <div className="relative curs ">
                    <input
                        className="auth-input pr-24"
                        placeholder="사업자등록번호 입력 ( - 생략)"
                        value={bizNumber}
                        onChange={(e) => setBizNumber(e.target.value)}
                    />
                </div>
                <div className="relative curs ">
                    <input
                        className="auth-input pr-24"
                        placeholder="대표명 입력"
                        value={representativeName}
                        onChange={(e) => setRepresentativeName(e.target.value)}
                    />
                </div>
                <div className="relative curs ">
                    <input
                        className="auth-input pr-24"
                        placeholder="설립일 예) 20200105"
                        value={openingDate}
                        onChange={(e) => setOpeningDate(e.target.value)}
                    />
                </div>
                <Button
                    variant="secondary"
                    type="button"
                    onClick={onCheckBusiness}
                    disabled={isChecked}
                    className={`
    w-full h-[32px] text-xs py-0 leading-none transition
    ${isChecked ? "opacity-50 cursor-not-allowed" : ""}
  `}
                >
                    {isChecked ? "조회 완료" : "조회"}
                </Button>

                {isChecked && (
                    <p className="text-[11px] text-gray-500 text-center mt-1">
                        사업자 조회가 완료되어 재조회가 불가합니다.
                    </p>
                )}
                {bizMessage && (
                    <p
                        className={`text-sm mt-2 text-center ${
                            isBizVerified ? "text-green-700" : "text-red-700"
                        }`}
                    >
                        {bizMessage}
                    </p>
                )}


            </section>

                {isBizVerified && (
                    <>
                <section>
                    <input
                        className="auth-input"
                        placeholder="기관명"
                        value={organizationName}
                        readOnly
                    />
                    <input
                        className="auth-input"
                        placeholder="담당자 이름"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                    />


                    <div className="space-y-1">
                        <label className="text-sm text-red-700">
                            * 담장자 재직확인용 재직증명서 첨부 (필수)
                        </label>
                        <input
                            type="file"
                            className="auth-input cursor-pointer h-[44px] flex items-center file:h-full"
                            accept=".pdf,.jpg,.png"
                        />
                        <p className="text-xs text-gray-500">
                            * 사업자 진위여부 확인을 위한 서류입니다.
                        </p>
                        <p className="text-xs text-gray-500">
                            * 제출된 서류는 관리자 검토 후 승인됩니다.
                        </p>
                    </div>

                </section>


                {/* 약관 동의 */}
                <div className="text-sm space-y-2 mb-6">
                    <label className="flex gap-2 cursor-pointer">
                        <input type="checkbox" />
                        Genie 이용약관 동의 (필수)
                    </label>
                    <label className="flex gap-2 cursor-pointer">
                        <input type="checkbox" />
                        개인정보 수집 및 이용 동의 (필수)
                    </label>
                    <label className="flex gap-2 cursor-pointer">
                        <input type="checkbox" />
                        마케팅 정보 수신 동의 (선택)
                    </label>
                </div>

                <Button
                    className="w-full cursor-pointer transition hover:brightness-80"
                    onClick={onSubmit}
                    disabled={!isBizVerified || isSubmitting}
                >
                    가입 요청
                </Button>
            </>
            )}
            <p className="text-xs text-center text-red-700 mt-4">
                * 가입 요청 후 관리자 승인 완료 시 서비스 이용이 가능합니다.
            </p>
        </div>
    );
}