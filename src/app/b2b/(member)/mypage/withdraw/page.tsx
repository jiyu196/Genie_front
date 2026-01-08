"use client"

import Button from "@/components/b2b/Button";
import {useState} from "react";
import {CHECK_PASSWORD} from "@/graphql/b2b/member/checkPassword";
import {WITHDRAW} from "@/graphql/b2b/member/withdraw";
import {useMutation} from "@apollo/client";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {logout} from "@/store/slice/authSlice";

const REQUIRED_TEXT = "삭제하겠습니다";

export default function WithdrawPage() {
    const [checkPassword] = useMutation(CHECK_PASSWORD);
    const [withdraw] = useMutation(WITHDRAW);

    const router = useRouter();
    const dispatch = useDispatch();
    // 입력값
    const [password, setPassword] = useState("");
    const [confirmText, setConfirmText] = useState("");

    // 진행상태
    const [passwordVerified, setPasswordVerified] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    // 에러메세지
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmError, setConfirmError] = useState<string | null>(null);



    // 현재 비밀번호 확인 핸들러
    const handleCheckPassword = async () => {
        setPasswordError(null);
        setSubmitting(true);

        try {
            await checkPassword({
                variables: {
                    input: { password },
                },
            });

            setPasswordVerified(true);
        } catch {
            setPasswordError("비밀번호가 일치하지 않습니다.");
        } finally {
            setSubmitting(false);
        }
    };

    // 회원 탈퇴 처리
    const handleWithdraw = async () => {
        // 비밀번호 검증 안됐으면 차단
        if (!passwordVerified) return;

        // 탈퇴문구 검증
        if (confirmText !== REQUIRED_TEXT) {
            setConfirmError(`"${REQUIRED_TEXT}"를 정확히 입력해주세요.`);
            return;
        }

        setSubmitting(true);

        try {
            const { data } = await withdraw({
                variables: {
                    input: {
                        message: confirmText,
                    },
                },
            });

            // 탈퇴 성공 시 로그아웃 및 로그인 페이지로 이동
            if (data?.withdraw.result) {
                dispatch(logout());
                router.push("/b2b/login");
            }
        } catch {
            setConfirmError("회원 탈퇴 처리 중 오류가 발생했습니다.");
        } finally {
            setSubmitting(false);
        }
    };

    // 탈퇴버튼 활성화 조건
    const canWithdraw =
        passwordVerified &&
        confirmText === REQUIRED_TEXT &&
        !submitting;


    return (
        <section className="max-w-[960px] ml-8 mt-7 space-y-8">
        {/* 페이지 제목 */}
            <h2 className="text-lg font-semibold text-[#19344e]">
                계정관리 & 탈퇴
            </h2>

            {/* 최종 경고 안내 */}
            <div className="rounded-xl border-2 border-red-700 bg-red-50 px-5 py-4 space-y-2">
                <p className="text-md font-semibold text-red-800 flex justify-center">
                    회원 탈퇴 안내
                </p>
                <p className="text-sm text-red-700 leading-relaxed">
                    회원 탈퇴 시 계정 정보, 이용 기록, 설정을 포함한 모든 데이터가
                    <span className="font-semibold"> 즉시 영구 삭제</span>되며,
                    이후에는 어떠한 경우에도 복구할 수 없습니다.
                </p>
            </div>

            {/* 비밀번호 확인 영역 */}
            <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                    현재 비밀번호 확인
                </p>

                <div className="flex gap-2">
                    <input
                            type="password"
                            placeholder="현재 비밀번호"
                            className="auth-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    {!passwordVerified && (
                        <Button
                            variant="secondary"
                            className="whitespace-nowrap px-5"
                            disabled={!password || submitting}
                            onClick={handleCheckPassword}
                        >
                            {submitting ? "확인 중..." : "비밀번호 확인"}
                        </Button>
                    )}
                </div>
                {/* 에러 메시지 */}
                {passwordError && (
                    <div className="flex justify-center">
                        <p className="text-xs text-red-600">
                            {passwordError}
                        </p>
                    </div>
                )}

                {/* 성공 메시지 */}
                {passwordVerified && (
                    <div className="flex justify-center">
                        <p className="text-sm text-green-600 font-medium">
                            비밀번호가 확인되었습니다.
                        </p>
                    </div>
                )}
            </div>

            {/* 탈퇴 확인 문구 입력 */}
            <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                    탈퇴 확인 문구 입력
                </p>

                <input
                    type="text"
                    placeholder={`"${REQUIRED_TEXT}"를 입력하세요`}
                    className="auth-input"
                    value={confirmText}
                    onChange={(e) => {
                        setConfirmText(e.target.value);
                        setConfirmError(null);
                    }}
                    disabled={!passwordVerified}
                />

                <div className="flex justify-center">
                    {confirmError && (
                        <p className="text-xs font-medium text-red-700">{confirmError}</p>
                    )}
                    </div>
            </div>

            {/* 최종 탈퇴 버튼 */}
            <div className="space-y-2">
                <p className="text-xs text-red-600 text-center">
                    * 이 작업은 되돌릴 수 없습니다. *
                </p>

                <Button
                    type="button"
                    className="w-full bg-red-700 text-white hover:bg-red-700 disabled:bg-gray-300"
                    disabled={!canWithdraw}
                    onClick={handleWithdraw}
                >
                    {submitting ? "처리 중..." : "회원 탈퇴"}
                </Button>
            </div>
        </section>
    );
}
