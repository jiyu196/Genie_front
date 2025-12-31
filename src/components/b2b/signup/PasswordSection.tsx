import { useEffect, useState } from "react";

type PasswordSectionProps = {
    password: string;
    setPassword: (v: string) => void;
    onValidChange: (valid: boolean) => void;
    disabled: boolean;
};

export default function PasswordSection({
                                            password,
                                            setPassword,
                                            onValidChange,
                                            disabled,
                                        }: PasswordSectionProps) {
    const [confirm, setConfirm] = useState("");

    const hasLength = password.length >= 8 && password.length <= 16;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);

    const isPasswordValid = hasLength && hasLetter && hasNumber;
    const isMatch = password === confirm && confirm.length > 0;

    useEffect(() => {
        onValidChange(isPasswordValid && isMatch);
    }, [isPasswordValid, isMatch, onValidChange]);

    return (
        <section className="space-y-3 mb-6">
            {/* 비밀번호 */}
            <div>
                {disabled && (
                    <p className="text-xs text-gray-400 mt-1">
                        이메일 인증 완료 후 비밀번호를 설정할 수 있습니다.
                    </p>
                )}
                <input
                    className={`auth-input ${
                        disabled ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                    type="password"
                    placeholder="비밀번호 (8~16자)"
                    value={password}
                    disabled={disabled}
                    onChange={(e) =>  {
                        if (!disabled) setPassword(e.target.value)}}
                />

                {/* 유효성 조건 */}
                {!disabled && (
                <ul className="mt-2 text-xs space-y-1">
                    <li className={hasLetter ? "text-green-600" : "text-gray-400"}>
                        ✔ 영문 포함
                    </li>
                    <li className={hasNumber ? "text-green-600" : "text-gray-400"}>
                        ✔ 숫자 포함
                    </li>
                    <li className={hasLength ? "text-green-600" : "text-gray-400"}>
                        ✔ 8~16자
                    </li>
                </ul>
                )}
            </div>

            {/* 비밀번호 확인 */}
            <div>
                <input
                    className={`auth-input ${
                        disabled ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    type="password"
                    placeholder="비밀번호 재입력"
                    value={confirm}
                    onChange={(e) =>  {
                        if (!disabled) setConfirm(e.target.value)}}
                />

                {confirm.length > 0 && (
                    <p
                        className={`text-xs mt-1 ${
                            isMatch ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {isMatch ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다."}
                    </p>
                )}
            </div>
        </section>
    );
}
