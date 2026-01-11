type OrganizationInfoSectionProps = {
    organizationName: string;
    setOrganizationName: (v: string) => void;
    contactName: string;
    setContactName: (v: string) => void;
    isBizVerified: boolean;

    // 사업자등록증 첨부파일
    businessFile?: File | null;
    setBusinessFile?: (f: File | null) => void;

    // 재직증명서 첨부파일
    employmentFile?: File | null;
    setEmploymentFile?: (f: File | null) => void;
};

export default function OrganizationInfoSection({
        organizationName,
        setOrganizationName,
        contactName,
        setContactName,
        isBizVerified,
        setBusinessFile,
        setEmploymentFile,
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

            {/* 사업자등록증 */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-red-700">
                    * 사업자등록증 첨부 (필수)
                </label>

                <input
                    type="file"
                    accept="image/*, .pdf"
                    className="auth-input cursor-pointer h-[44px] flex items-center file:h-full"
                    onChange={(e) =>
                        setBusinessFile?.(e.target.files?.[0] ?? null)
                    }
                />

                <p className="text-xs text-gray-500">
                    * 기관 사업자 확인을 위한 서류입니다.
                </p>
            </div>

            {/* 재직증명서 */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-red-700">
                    * 담당자 재직증명서 첨부 (필수)
                </label>

                <input
                    type="file"
                    accept="image/*, .pdf"
                    className="auth-input cursor-pointer h-[44px] flex items-center file:h-full"
                    onChange={(e) =>
                        setEmploymentFile?.(e.target.files?.[0] ?? null)
                    }
                />

                <p className="text-xs text-gray-500">
                    * 담당자 재직 여부 확인용 서류입니다.
                </p>
                <p className="text-xs text-gray-500">
                    * 제출된 서류는 관리자 검토 후 승인됩니다.
                </p>
            </div>
        </section>
    );
}