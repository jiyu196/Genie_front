export default function OrganizationPage() {
    return (
        <section className="max-w-[960px] ml-8 mt-7 space-y-8">
            {/* 페이지 헤더 */}
            <div>
                <h1 className="text-2xl font-bold text-[#19344e]">
                    기본 정보
                </h1>
                <p className="text-sm text-[#19344e]/60 mt-1">
                    기관 계정의 기본 정보를 확인할 수 있습니다.
                </p>
            </div>

            {/* 승인 상태 요약 */}
            <div className="bg-white rounded-2xl shadow-sm max-w-[640px] overflow-hidden">
                {/* 카드 헤더 */}
                <div className="flex items-center gap-2 px-6 py-4 bg-[#F4F6FF]/50 text-green-700 text-sm font-medium">
                    <span className="text-green-700">●</span>
                    승인 완료
                </div>

                {/* 카드 바디 */}
                <div className="p-8 space-y-6">
                    <InfoRow label="기관명" value="서울초등학교" />
                    <InfoRow label="담당자 이메일" value="admin@school.ac.kr" />
                </div>
            </div>

        </section>
    );
}

/* 보조 컴포넌트 */
function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between border-b last:border-b-0 pb-4 last:pb-0">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-sm font-medium text-[#19344e]">
                {value}
            </span>
        </div>
    );
}
