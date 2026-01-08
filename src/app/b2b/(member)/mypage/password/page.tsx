"use client"

import Button from "@/components/b2b/Button";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CHECK_PASSWORD } from "@/graphql/b2b/member/checkPassword";
import { SAVE_NEW_PASSWORD } from "@/graphql/b2b/member/saveNewPassword";
import { useRouter } from "next/navigation";
import { logout } from "@/store/slice/authSlice";
import { useDispatch } from "react-redux";

export default function PasswordPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [checkPassword] = useMutation(CHECK_PASSWORD);
    const [saveNewPassword] = useMutation(SAVE_NEW_PASSWORD);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // 현재 비번 검증 완료 여부
    const [isVerified, setIsVerified] = useState(false);
    const [isPasswordChecked, setIsPasswordChecked] = useState(false);

    // 변경완료시
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    // 에러상태 분리
    const [currentPasswordError, setCurrentPasswordError] = useState<string | null>(null);
    const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

    // 기존 유효성
    const isPasswordValid =
        newPassword.length >= 8 &&
        newPassword.length <= 16 &&
        /[A-Za-z]/.test(newPassword) &&
        /\d/.test(newPassword);

    // 새 비밀번호 입력시 유효성
    const isNewPasswordMatch =
        newPassword.length > 0 &&
        newPassword === confirmPassword;

    // 변경 버튼 활성화 조건
    const canSubmitNewPassword =
        isVerified &&
        isPasswordValid &&
        isNewPasswordMatch &&
        !newPasswordError &&
        !confirmPasswordError &&
        !submitting;

    // 현재 비밀번호 확인 핸들러
    const handleCheckPassword = async () => {
        setCurrentPasswordError(null);
        setIsPasswordChecked(false);
        setSubmitting(true);

        try {
            await checkPassword({
                variables: {
                    input: {
                        password: currentPassword,
                    },
                },
            });
            setIsVerified(true);
            setIsPasswordChecked(true);
        } catch {
            setCurrentPasswordError("현재 비밀번호가 일치하지 않습니다.");
        } finally {
            setSubmitting(false);
        }
    };

    // 새 비밀번호 입력 핸들러
    const handleNewPasswordChange = (value: string) => {
        setNewPassword(value);
        setNewPasswordError(null);

        if (!isVerified) return;
        if (value.length === 0) return;

        // 현재 비밀번호와 동일한 경우
        if (value === currentPassword) {
            setNewPasswordError("기존 비밀번호와 동일합니다.");
        }
    };

    // 확인 비밀번호 입력 핸들러
    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
        setConfirmPasswordError(null);

        if (newPassword && value && newPassword !== value) {
            setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
        }
    };

    // 새 비밀번호 저장 핸들러
    const handleSaveNewPassword = async () => {
        if (newPasswordError || confirmPasswordError) return;

        setSubmitting(true);

        try {
            await saveNewPassword({
                variables: {
                    input: {
                        newPassword,
                    },
                },
            });

            setIsPasswordChanged(true);

            // 변경완료 후
            setTimeout(() => {
                dispatch(logout());
                router.push("/b2b/login");
            }, 1500);
        } catch {
            setNewPasswordError("기존 비밀번호와 동일합니다.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="max-w-[960px] ml-8 mt-7 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
                <h2 className="text-lg font-semibold text-[#19344e]">
                    비밀번호 변경
                </h2>

                <div className="space-y-3">
                    <div className="flex gap-2">
                        <input
                            type="password"
                            placeholder="현재 비밀번호"
                            className="auth-input flex-1"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <Button
                            className="px-5 whitespace-nowrap"
                            variant="secondary"
                            disabled={!currentPassword || submitting}
                            onClick={handleCheckPassword}
                        >
                            {submitting ? "확인 중..." : "비밀번호 확인"}
                        </Button>
                    </div>

                    {/* 상태 메세지 */}
                    <div className="flex justify-center min-h-[20px]">
                        {currentPasswordError && (
                            <p className="text-sm text-red-600">
                                {currentPasswordError}
                            </p>
                        )}
                        {!currentPasswordError && isPasswordChecked && (
                            <p className="text-sm text-green-600">
                                비밀번호가 확인되었습니다.
                            </p>
                        )}
                    </div>

                    <input
                        type="password"
                        placeholder="새 비밀번호"
                        className="auth-input"
                        value={newPassword}
                        onChange={(e) => handleNewPasswordChange(e.target.value)}
                        disabled={!isVerified}
                    />
                    {isVerified && (
                        <ul className="text-xs text-gray-500 space-y-1">
                            <li className={newPassword.length >= 8 ? "text-green-600" : ""}>
                                • 8자 이상
                            </li>
                            <li className={/[A-Za-z]/.test(newPassword) ? "text-green-600" : ""}>
                                • 영문 포함
                            </li>
                            <li className={/\d/.test(newPassword) ? "text-green-600" : ""}>
                                • 숫자 포함
                            </li>
                        </ul>
                    )}
                    {newPasswordError && (
                        <p className="text-xs text-red-600">
                            {newPasswordError}
                        </p>
                    )}

                    <input
                        type="password"
                        placeholder="새 비밀번호 확인"
                        className="auth-input"
                        value={confirmPassword}
                        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                        disabled={!isVerified}
                    />
                    {confirmPasswordError && (
                        <p className="text-xs text-red-600">
                            {confirmPasswordError}
                        </p>
                    )}
                </div>

                <Button
                    className="w-full py-3"
                    disabled={!canSubmitNewPassword}
                    onClick={handleSaveNewPassword}
                >
                    {submitting ? "변경 중..." : "변경하기"}
                </Button>

                {isPasswordChanged && (
                    <div className="flex justify-center">
                        <p className="text-md text-green-600">
                            비밀번호가 성공적으로 변경되었습니다.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}