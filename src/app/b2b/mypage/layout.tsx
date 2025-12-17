// app/b2b/mypage/layout.tsx
import Link from "next/link";

export default function MyPageLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-[calc(100vh-120px)] bg-[#f6f8fb]">
            <div className="max-w-[1200px] mx-auto px-6 py-10 flex gap-8">

                {/* Sidebar */}
                <aside className="w-[220px] bg-white rounded-xl border px-4 py-6 text-sm">
                    <h2 className="font-bold text-lg mb-6">마이페이지</h2>

                    <nav className="space-y-6">
                        <div>
                            <p className="font-semibold mb-2">기본정보</p>
                            <Link href="/b2b/mypage" className="block text-gray-600 hover:text-[#19344e]">
                                기본정보
                            </Link>
                        </div>

                        <div>
                            <p className="font-semibold mb-2">학생관리</p>
                            <Link href="/b2b/mypage/students" className="block text-gray-600 hover:text-[#19344e]">
                                Genie툰 학생계정 관리
                            </Link>
                        </div>

                        <div>
                            <p className="font-semibold mb-2">구독 & 결제</p>
                            <Link href="/b2b/mypage/subscription" className="block text-gray-600 hover:text-[#19344e]">
                                구독 정보
                            </Link>
                            <Link href="/b2b/mypage/billing" className="block text-gray-600 hover:text-[#19344e]">
                                결제 내역
                            </Link>
                        </div>

                        <div>
                            <p className="font-semibold mb-2">계정관리</p>
                            <Link href="/b2b/mypage/account" className="block text-gray-600 hover:text-[#19344e]">
                                비밀번호 변경
                            </Link>
                            <button className="text-red-600 text-left">
                                회원 탈퇴
                            </button>
                        </div>
                    </nav>
                </aside>

                {/* Content */}
                <main className="flex-1 bg-white rounded-xl border p-8">
                    {children}
                </main>

            </div>
        </div>
    );
}
