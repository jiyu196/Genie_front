import { useEffect, useState } from "react";

type AgreementSectionProps = {
    onAgreeChange: (agreed: boolean) => void;
};

export default function AgreementSection({ onAgreeChange }: AgreementSectionProps) {
    const [terms, setTerms] = useState(false);
    const [privacy, setPrivacy] = useState(false);
    const [marketing, setMarketing] = useState(false);

    const isAgreed = terms && privacy;


    useEffect(() => {
        onAgreeChange(isAgreed);
    }, [isAgreed, onAgreeChange]);

    return (
        <div className="text-sm space-y-2 mb-6 mt-4">
            <label className="flex gap-2 cursor-pointer font-medium">
                <input
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                />
                Genie 이용약관 동의 (필수)
            </label>

            <label className="flex gap-2 cursor-pointer font-medium">
                <input
                    type="checkbox"
                    checked={privacy}
                    onChange={(e) => setPrivacy(e.target.checked)}
                />
                개인정보 수집 및 이용 동의 (필수)
            </label>

            <label className="flex gap-2 cursor-pointer text-gray-400">
                <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                />
                마케팅 정보 수신 동의 (선택)
            </label>
        </div>
    );
}
