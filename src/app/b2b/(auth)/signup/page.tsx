// app/b2b/(auth)/signup/register/page.tsx
"use client";

import Button from "@/components/b2b/Button";
import {checkBusiness} from "@/services/business";
import {useState, useEffect} from "react";
import {REGISTER_MUTATION} from "@/graphql/auth/register";
import {useRouter} from "next/navigation";
import {useMutation} from "@apollo/client";
import {CHECK_BIZ_NUMBER} from "@/graphql/business/checkBizNumber";
import {SEND_EMAIL_CODE_MUTATION} from "@/graphql/auth/sendEmailCode";
import {VERIFY_EMAIL_CODE_MUTATION} from "@/graphql/auth/verifyEmailCode";
import EmailVerificationSection from "@/components/b2b/signup/EmailVerificationSection";
import BusinessVerificationSection from "@/components/b2b/signup/BusinessVerificationSection";
import OrganizationInfoSection from "@/components/b2b/signup/OrganizationInfoSection";
import AgreementSection from "@/components/b2b/signup/AgreementSection";
import PasswordSection from "@/components/b2b/signup/PasswordSection";


export default function SignupRegisterPage() {
// 이메일 인증번호 발송 mutation
    const [sendEmailCode] = useMutation(SEND_EMAIL_CODE_MUTATION, {
        fetchPolicy: "no-cache",
    });

// 이메일 인증번호 검증 mutation
    const [verifyEmailCode] = useMutation(VERIFY_EMAIL_CODE_MUTATION, {
        fetchPolicy: "no-cache",
    })

// 사업자 번호 조회 mutation
// - 사업자 인증 단계에서 "조회" 버튼 눌렀을 때 실행 / - 국세청 기반 사업자 상태 확인
    const [checkBizNumber] = useMutation(CHECK_BIZ_NUMBER, {
        fetchPolicy: "no-cache",
    });

// 회원가입 요청 mutation
// - 최종 "가입 요청" 버튼 눌렀을 때 실행 / - 성공 시 PENDING / REJECTED 상태 반환
    const [register] = useMutation(REGISTER_MUTATION, {
        fetchPolicy: "no-cache", // 캐시 무시, 항상 최신 상태로 처리
    });

// 사업자 조회 결과 메시지
// - 정상 / 휴업 / 폐업 / 에러 메시지 출력용
    const [bizMessage, setBizMessage] = useState<string | null>(null);
// 사업자 조회 버튼이 이미 눌렸는지 여부
// - true면 재조회 방지 (버튼 비활성화)
    const [isChecked, setIsChecked] = useState(false);
// 사업자 인증 최종 성공 여부
// - true여야만 다음 단계(기관명 입력, 가입 요청) 진행 가능
    const [isBizVerified, setIsBizVerified] = useState(false);
// 사업자등록번호 입력값
    const [bizNumber, setBizNumber] = useState("");
// 대표자명 입력값
    const [representativeName, setRepresentativeName] = useState("");
// 개업일(설립일) 입력값
    const [openingDate, setOpeningDate] = useState("");

// 이메일 인증
// 인증번호
    const [emailCode, setEmailCode] = useState("");
// 발송 여부
    const [isEmailSent, setIsEmailSent] = useState(false);
// 인증 완료여부
    const [isEmailVerified, setIsEmailVerified] = useState(false);
// 이메일 안내메시지
    const [emailMessage, setEmailMessage] = useState<string | null>(null);
// 인증 제한시간
    const [remainSeconds, setRemainSeconds] = useState(0);

// 메일 인증 타이머 표시
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    // 로그인 ID로 사용할 이메일
// - 이메일 인증 단계에서도 사용
    const [email, setEmail] = useState("");
// 비밀번호
    const [password, setPassword] = useState("");
// 기관명
// - 사업자 인증 후 자동 세팅 or readOnly 처리 예정
    const [organizationName, setOrganizationName] = useState("");
// 담당자 이름
    const [contactName, setContactName] = useState("");

// 회원가입 요청 중인지 여부
// - 가입 요청 버튼 중복 클릭 방지 / - 로딩 처리용
    const [isSubmitting, setIsSubmitting] = useState(false);
// 회원가입 결과에 따라 페이지 이동용
// - PENDING → /b2b/pending
    const router = useRouter();

// 비밀번호
    const [isPasswordValid, setIsPasswordValid] = useState(false);


// 이용약관

    // 가입요청 상태
    const [isTermsAgreed, setIsTermsAgreed] = useState(false);

    const canSubmit =
        isBizVerified &&
        isEmailVerified &&
        isPasswordValid &&
        isTermsAgreed &&
        organizationName.trim().length > 0 &&
        contactName.trim().length > 0;


    // // 입력값 바뀌면 사업자 조회 다시 가능
    useEffect(() => {
        setIsChecked(false);
        setIsBizVerified(false);
        setBizMessage(null);
    }, [bizNumber, representativeName, openingDate]);

    // 이메일 인증시간 제한
    useEffect(() => {
        if(!isEmailSent || isEmailVerified) return;
        if(remainSeconds <= 0) return;

        const timer = setInterval(() => {
            setRemainSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isEmailSent, isEmailVerified, remainSeconds]);

    // 시간 만료 처리
    useEffect(() => {
        if(remainSeconds === 0 && isEmailSent && !isEmailVerified) {
            setEmailMessage("인증 시간이 만료되었습니다. 다시 발송해주세요");
            setIsEmailSent(false);
            setEmailCode("");  // 입력값 초기화
        }
    }, [remainSeconds, isEmailSent, isEmailVerified]);

    // 인증메일 발송버튼
    const onSendEmailCode = async () => {
        if(!email) {
            setEmailMessage("이메일을 입력해주세요.");
            return;
        }
        try {
            const res = await sendEmailCode({
                variables: {
                    input: {
                        email,
                        type: "SIGNUP",
                    },
                },
            });
            if(res.data.sendVerificationEmail.result) {
                setIsEmailSent(true);
                setRemainSeconds(300);
                setEmailMessage("인증번호가 이메일로 발송되었습니다. 아래에 인증번호를 입력해주세요");
            }
        } catch (e) {
            setEmailMessage("인증메일 발송에 실패했습니다.");
        }
    };

    // 인증번호 확인 버튼
    const onVerifyEmailCode = async () => {
        if(!emailCode) {
            setEmailMessage("인증번호를 입력해주세요.");
            return;
        }
        try {
            const res = await verifyEmailCode({
                variables: {
                    input: {
                        email,
                        code: emailCode,
                        type: "SIGNUP",
                    },
                },
            });
            if (res.data.verifyCode.result) {
                setIsEmailVerified(true);
                setEmailMessage("이메일 인증이 완료되었습니다.");
            } else {
                setEmailMessage("인증번호가 올바르지 않습니다.");
            }
        } catch (e) {
            setEmailMessage("이메일 인증 중 오류가 발생했습니다.");
        }
    };

    // 사업자 조회 버튼
    const onCheckBusiness = async () => {
        if (isChecked) return;

        // 조회 시작 시 초기화
        setIsBizVerified(false);
        setBizMessage(null);

        try {
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

            const result = res?.data?.checkBizNumber;

            // 응답 방어
            if (!result) {
                setBizMessage("사업자 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
                setIsChecked(true);
                return;
            }

            if (!result.businessStatusCode) {
                setBizMessage("사업자 상태를 확인할 수 없습니다.");
                setIsChecked(true);
                return;
            }

            // 휴업 / 폐업
            if (result.businessStatusCode !== "01") {
                setBizMessage(
                    result.businessStatusCode === "02"
                        ? "휴업 중인 사업자는 가입이 불가합니다."
                        : "폐업된 사업자는 가입이 불가합니다."
                );
                setIsChecked(true);
                return;
            }

            // 여기부터가 "정상 사업자 처리"
            setBizMessage("정상 사업자입니다. 회원가입을 진행해주세요.");
            setIsBizVerified(true);
            setIsChecked(true);

            // 기관명 자동 세팅 (있을 경우)
            if (result.organizationName) {
                setOrganizationName(result.organizationName);
            }

        } catch (e: any) {
            console.error("biz 에러:", e);
            console.error("graphQL 에러:", e?.graphQLErrors);

            setBizMessage("사업자 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
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

            {/*이메일 인증 및 비밀번호 입력*/}
            <EmailVerificationSection
                email={email}
                setEmail={setEmail}
                emailCode={emailCode}
                setEmailCode={setEmailCode}
                isEmailSent={isEmailSent}
                isEmailVerified={isEmailVerified}
                remainSeconds={remainSeconds}
                emailMessage={emailMessage}
                onSendEmailCode={onSendEmailCode}
                onVerifyEmailCode={onVerifyEmailCode}
            />

            {/*비밀번호 입력*/}
                <PasswordSection
                    password={password}
                    setPassword={setPassword}
                    onValidChange={setIsPasswordValid}
                />


            {/*사업자 조회*/}
            {isPasswordValid && (
                <BusinessVerificationSection
                    bizNumber={bizNumber}
                    setBizNumber={setBizNumber}
                    representativeName={representativeName}
                    setRepresentativeName={setRepresentativeName}
                    openingDate={openingDate}
                    setOpeningDate={setOpeningDate}
                    isChecked={isChecked}
                    isBizVerified={isBizVerified}
                    bizMessage={bizMessage}
                    onCheckBusiness={onCheckBusiness}
                />
            )}


            {/*추가정보 입력(기관명, 담당자)*/}
            {isBizVerified && (
                <OrganizationInfoSection
                    organizationName={organizationName}
                    setOrganizationName={setOrganizationName}
                    contactName={contactName}
                    setContactName={setContactName}
                    isBizVerified={isBizVerified}
                />

            )}

            {/*이용약관*/}
            {isBizVerified && (
                <AgreementSection
                    onAgreeChange={setIsTermsAgreed}
                />
            )}

            {/*가입요청*/}
            {/*사업자인증전 -> 버튼 없음/ 약관 미동의 -> 비활성/ 동의 -> 활성*/}
            {isBizVerified && (
                <Button
                    onClick={onSubmit}
                    disabled={!canSubmit || isSubmitting}
                    className={`w-full ${
                        !canSubmit ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    가입 요청
                </Button>
            )}


        </div>

        )
    }

