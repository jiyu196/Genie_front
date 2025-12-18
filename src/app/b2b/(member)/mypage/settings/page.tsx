import Button from "@/components/b2b/Button";

export default function SettingsPage() {
    return (
        <section className="max-w-[640px] ml-8 mt-7 space-y-8">
            {/* 페이지 타이틀 */}
            <div>
                <h1 className="text-2xl font-bold text-[#19344e]">
                    계정 관리
                </h1>
                <p className="text-sm text-[#19344e]/60 mt-1">
                    비밀번호 변경 및 계정 관련 설정을 관리할 수 있습니다.
                </p>
            </div>

            {/* 비밀번호 변경 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
                <h2 className="text-lg font-semibold text-[#19344e]">
                    비밀번호 변경
                </h2>

                <div className="space-y-3">
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
                </div>

                <Button className="w-full py-3 hover:brightness-80">
                    변경하기
                </Button>
            </div>

            {/* 회원 탈퇴 */}
            <div className="flex items-center justify-between gap-4
                px-6 py-4 rounded-xl
                bg-red-50 border border-red-200">
                <div>
                    <p className="text-sm font-medium text-red-700">
                        회원 탈퇴
                    </p>
                    <p className="text-xs text-red-700">
                        탈퇴 시 모든 데이터가 즉시 삭제되며 복구할 수 없습니다.
                    </p>
                </div>

                <Button
                    variant="secondary"
                    className="border border-red-700 text-red-700 hover:bg-red-100"
                >
                    회원 탈퇴
                </Button>
            </div>

        </section>
    );
}
