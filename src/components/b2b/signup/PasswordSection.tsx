import { useEffect, useState } from "react";

type PasswordSectionProps = {
    password: string;
    setPassword: (v: string) => void;
    onValidChange: (valid: boolean) => void;
};

export default function PasswordSection({
                                            password,
                                            setPassword,
                                            onValidChange,
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
                <input
                    className="auth-input"
                    type="password"
                    placeholder="비밀번호 (8~16자)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* 유효성 조건 */}
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
            </div>

            {/* 비밀번호 확인 */}
            <div>
                <input
                    className="auth-input"
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
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
