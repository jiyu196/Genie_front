import Button from "@/components/b2b/Button";

export default function StudentsPage() {
    return (
        <section className="max-w-[960px] ml-8 space-y-8">
            {/* 페이지 헤더 */}
            <div>
                <h1 className="text-2xl font-bold text-[#19344e]">
                    학생 관리
                </h1>
                <p className="text-sm text-[#19344e]/60 mt-1">
                    Genie툰 학생 계정을 생성하고 상태를 관리할 수 있습니다.
                </p>
            </div>

            {/* 학생 리스트 카드 */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* 카드 헤더 */}
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="font-semibold text-[#19344e]">
                        학생 계정 목록
                    </h2>

                    <Button className="px-4 py-2 hover:brightness-80">
                        학생 계정 추가
                    </Button>
                </div>

                {/* 테이블 */}
                <table className="w-full text-sm">
                    <thead className="bg-[#F4F6FF] text-[#19344e]/70">
                    <tr>
                        <th className="text-left px-6 py-3 font-medium">
                            이름
                        </th>
                        <th className="text-left px-6 py-3 font-medium">
                            아이디
                        </th>
                        <th className="text-left px-6 py-3 font-medium">
                            상태
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr className="border-b hover:bg-gray-50 transition">
                        <td className="px-6 py-4">김지니</td>
                        <td className="px-6 py-4 text-gray-600">genie01</td>
                        <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                                ● 활성
                            </span>
                        </td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">이툰</td>
                        <td className="px-6 py-4 text-gray-600">toon02</td>
                        <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-2 text-gray-400 font-medium">
                                ● 비활성
                            </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}
