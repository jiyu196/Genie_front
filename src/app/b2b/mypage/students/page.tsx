// app/b2b/mypage/students/page.tsx
export default function StudentManagePage() {
    return (
        <div>
            <h1 className="text-xl font-bold mb-6">
                Genie툰 학생계정 관리
            </h1>

            <div className="border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-[#f9fafb] border-b">
                    <tr>
                        <th className="px-4 py-3 text-left">계정ID</th>
                        <th className="px-4 py-3 text-left">이름</th>
                        <th className="px-4 py-3 text-left">최근접속일</th>
                        <th className="px-4 py-3 text-left">생성문장 수</th>
                        <th className="px-4 py-3 text-left">상세</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[1, 2, 3, 4].map(i => (
                        <tr key={i} className="border-b last:border-0">
                            <td className="px-4 py-3">계정 {i}</td>
                            <td className="px-4 py-3">학생 {i}</td>
                            <td className="px-4 py-3">2025/01/01</td>
                            <td className="px-4 py-3">{6 - i}개</td>
                            <td className="px-4 py-3 text-[#19344e] cursor-pointer hover:underline">
                                학습기록 →
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <p className="text-xs text-gray-500 mt-4">
                * 학생 계정별 학습 기록 및 생성 결과를 확인할 수 있습니다.
            </p>
        </div>
    );
}
