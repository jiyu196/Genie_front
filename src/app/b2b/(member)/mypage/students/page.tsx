export default function StudentsPage() {
    return (
        <section className="space-y-6">
            <h1 className="text-xl font-semibold text-[#19344e]">
                학생 관리
            </h1>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600 text-sm">
                        Genie툰 학생 계정을 관리할 수 있습니다.
                    </p>

                    <button className="px-4 py-2 rounded-lg bg-[#19344e] text-white text-sm">
                        학생 계정 추가
                    </button>
                </div>

                <table className="w-full text-sm">
                    <thead>
                    <tr className="text-left text-gray-500 border-b">
                        <th className="py-2">이름</th>
                        <th>아이디</th>
                        <th>상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-b">
                        <td className="py-3">김지니</td>
                        <td>genie01</td>
                        <td className="text-green-600">활성</td>
                    </tr>
                    <tr>
                        <td className="py-3">이툰</td>
                        <td>toon02</td>
                        <td className="text-gray-400">비활성</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}
