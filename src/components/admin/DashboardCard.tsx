

export default function DashboardCard({
                           title,
                           value,
                           highlight = false,
                       }: {
    title: string;
    value: string;
    highlight?: boolean;
}) {
    return (
        <div className="bg-white border border-gray-200 px-5 py-4">
            <p className="text-xs text-gray-500 tracking-tight">
                {title}
            </p>
            <p
                className={`mt-1 text-2xl font-semibold ${
                    highlight ? "text-[#fb991c]" : "text-[#19344e]"
                }`}
            >
                {value}
            </p>
        </div>
    );
}