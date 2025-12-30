type RegisterStatus = "PENDING" | "APPROVED" | "REJECTED";


// Badge 색 지정
const STATUS_META: Record <
    RegisterStatus,
        {
            label: string;
            dotColor: string;
            className: string;
        }
    > = {
    PENDING: {
        label: "승인 대기",
        dotColor: "text-gray-400",
        className: "bg-gray-50 text-gray-600 border-gray-300",
    },
    APPROVED: {
        label: "승인 완료",
        dotColor: "text-green-600",
        className: "bg-green-50 text-green-600 border-green-200",
    },
    REJECTED: {
        label: "반려",
        dotColor: "text-red-500",
        className: "bg-red-50 text-red-600 border-red-200",
    },
};

export default function StatusBadge({
                                        status,
                                    }: {
    status: RegisterStatus;
}) {
    const meta = STATUS_META[status];

    return (
        <span
            className={`
                inline-flex items-center gap-1.5
                px-2.5 py-0.5
                text-xs font-medium
                border rounded-full
                ${meta.className}
            `}
        >
            <span className={`text-[10px] ${meta.dotColor}`}>●</span>
            {meta.label}
        </span>
    );
}
