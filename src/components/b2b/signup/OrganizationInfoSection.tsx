type OrganizationInfoSectionProps = {
    organizationName: string;
    setOrganizationName: (v: string) => void;
    contactName: string;
    setContactName: (v: string) => void;
    isBizVerified: boolean;
};

export default function OrganizationInfoSection({
        organizationName,
        setOrganizationName,
        contactName,
        setContactName,
        isBizVerified,
        }: OrganizationInfoSectionProps) {
    return (
        <section className="space-y-4">
            <input
                className="auth-input"
                placeholder="기관명"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                disabled={!isBizVerified}
            />

            <input
                className="auth-input"
                placeholder="담당자 이름"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
            />

            <div className="space-y-1.5">
                <label className="text-sm text-red-700">
                    * 담당자 재직확인용 재직증명서 첨부 (필수)
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
    );
}
