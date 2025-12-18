export default function SettingsPage() {
    return (
        <section className="space-y-6 max-w-[520px]">
            <h1 className="text-xl font-semibold text-[#19344e]">
                계정 관리
            </h1>

            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
                <h2 className="font-medium">비밀번호 변경</h2>

                <input
                    type="password"
                    placeholder="현재 비밀번호"
                    className="auth-input"
                />
                <input
                    type="password"
                    placeholder="새 비밀번호"
                    className="auth-input"
                />
                <input
                    type="password"
                    placeholder="새 비밀번호 확인"
                    className="auth-input"
                />

                <button className="w-full py-3 rounded-xl bg-[#19344e] text-white">
                    변경하기
                </button>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-red-200">
                <h2 className="font-medium text-red-600 mb-2">
                    회원 탈퇴
                </h2>

                <p className="text-sm text-gray-600 mb-4">
                    탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
                </p>

                <button className="px-4 py-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-50">
                    회원 탈퇴
                </button>
            </div>

        </section>
    );
}
