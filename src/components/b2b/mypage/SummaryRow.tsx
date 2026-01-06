/* 마이페이지 홈 => 상태 한 줄 */
export default function SummaryRow({
                        label,
                        value,
                        accent,
                    }: {
    label: string;
    value: string;
    accent?: boolean;
}) {
    return (
        <div className="flex justify-between py-4 text-sm">
            <span className="text-gray-500">{label}</span>
            <span
                className={`font-medium ${
                    accent ? "text-green-600" : "text-[#19344e]"
                }`}
            >
                {value}
            </span>
        </div>
    );
}