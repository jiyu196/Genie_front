export default function OrganizationPage() {
    return (
        <section className="space-y-6">
            <h1 className="text-xl font-semibold text-[#19344e]">
                기본 정보
            </h1>

            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6 max-w-[640px]">
                <div>
                    <label className="block text-sm text-gray-500 mb-1">
                        기관명
                    </label>
                    <input
                        value="OO초등학교"
                        readOnly
                        className="auth-input cursor-not-allowed bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">
                        담당자 이메일
                    </label>
                    <input
                        value="admin@school.ac.kr"
                        readOnly
                        className="auth-input cursor-not-allowed bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">
                        승인 상태
                    </label>
                    <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                        승인 완료
                    </span>
                </div>
            </div>
        </section>
    );
}
