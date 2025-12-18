export default function PlanPage() {
    return (
        <section className="max-w-[960px] ml-8 space-y-8">
            <h1 className="text-xl font-semibold text-[#19344e]">
                구독 & 결제
            </h1>

            {/* 구독 정보 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="font-medium mb-4">현재 구독 플랜</h2>

                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-lg">Genie 교육 플랜</p>
                        <p className="text-sm text-gray-500">
                            2025.01.01 ~ 2025.12.31
                        </p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                        이용 중
                    </span>
                </div>
            </div>

            {/* 결제 내역 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="font-medium mb-4">결제 내역</h2>

                <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                        <span>2025.02.01</span>
                        <span>₩1,200,000</span>
                    </li>
                    <li className="flex justify-between text-gray-400">
                        <span>2024.01.01</span>
                        <span>₩1,200,000</span>
                    </li>
                </ul>
            </div>
        </section>
    );
}
