import Button from "@/components/b2b/Button";

export default function SettingsPage() {
    return (
        <section className="max-w-[640px] ml-8 space-y-8">
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
            <div className="rounded-2xl p-8 bg-red-50 border border-red-700 space-y-4">
                <h2 className="text-lg font-semibold text-red-700">
                    회원 탈퇴
                </h2>

                <p className="text-sm text-red-700 leading-relaxed">
                    회원 탈퇴 시 모든 데이터가 즉시 삭제되며<br />
                    삭제된 데이터는 복구할 수 없습니다.
                </p>

                <Button variant="secondary" className="px-5 py-2 rounded-lg border border-red-700 text-red-700 font-medium hover:bg-red-100 transition">
                    회원 탈퇴
                </Button>
            </div>
        </section>
    );
}
