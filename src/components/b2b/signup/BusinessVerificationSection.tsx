// components/b2b/signup/BusinessVerificationSection.tsx
import Button from "@/components/b2b/Button";

type Props = {
    bizNumber: string;
    setBizNumber: (v: string) => void;
    representativeName: string;
    setRepresentativeName: (v: string) => void;
    openingDate: string;
    setOpeningDate: (v: string) => void;

    isChecked: boolean;
    isBizVerified: boolean;
    bizMessage: string | null;

    onCheckBusiness: () => void;
};

export default function BusinessVerificationSection({
            bizNumber,
            setBizNumber,
            representativeName,
            setRepresentativeName,
            openingDate,
            setOpeningDate,
            isChecked,
            isBizVerified,
            bizMessage,
            onCheckBusiness,
        }: Props) {

    const isBizInputValid =
        bizNumber.length === 10 &&
        openingDate.length === 8 &&
        representativeName.trim().length > 0;


    return (
        <section className="space-y-4 mb-6">
            <h2 className="font-semibold text-lg text-gray-700">
                사업자 인증
            </h2>

            <input
                className="auth-input"
                placeholder="사업자등록번호 입력 ( - 생략)"
                value={bizNumber}
                inputMode="numeric"
                maxLength={10}
                onChange={(e) => {
                    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
                    setBizNumber(onlyNumber);
                }}
            />

            <input
                className="auth-input"
                placeholder="대표명 입력"
                value={representativeName}
                onChange={(e) => setRepresentativeName(e.target.value)}
            />

            <input
                className="auth-input"
                inputMode="numeric"
                maxLength={8}
                placeholder="설립일 예) 20210105"
                value={openingDate}
                onChange={(e) => {
                    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
                    setOpeningDate(onlyNumber);
                }}
            />

            <Button
                variant="secondary"
                type="button"
                onClick={onCheckBusiness}
                disabled={isChecked || !isBizInputValid}
                className={`w-full h-[40px] text-xs ${
                    isChecked || !isBizInputValid ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                }`}
            >
                {isChecked ? "조회 완료" : "조회"}
            </Button>

            {isChecked && (
                <p className="text-[11px] text-gray-500 text-center">
                    사업자 조회가 완료되어 재조회가 불가합니다.
                </p>
            )}

            {bizMessage && (
                <p
                    className={`text-sm text-center ${
                        isBizVerified ? "text-green-700" : "text-red-700"
                    }`}
                >
                    {bizMessage}
                </p>
            )}
        </section>
    );
}
