export default function SubscriptionsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-lg font-semibold text-[#19344e]">매출 관리</h1>

            <div className="bg-white border border-gray-200">
                <table className="w-full text-sm">
                    <thead className="bg-[#F4F6FF] text-[#19344e]">
                    <tr>
                        <th className="px-4 py-3 text-left">기관명</th>
                        <th className="px-4 py-3 text-left">플랜</th>
                        <th className="px-4 py-3 text-left">금액</th>
                        <th className="px-4 py-3 text-left">상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-t">
                        <td className="px-4 py-3">서울초등학교</td>
                        <td className="px-4 py-3">Genie 플랜</td>
                        <td className="px-4 py-3">₩4,200,000</td>
                        <td className="px-4 py-3 text-green-600">결제 완료</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
