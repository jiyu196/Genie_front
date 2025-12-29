type RegisterStatus = "PENDING" | "APPROVED" | "REJECTED";

const statusStyle: Record<RegisterStatus, string> = {
    PENDING: "bg-gray-50 text-gray-600 border-gray-300",
    APPROVED: "bg-green-50 text-green-600 border-green-200",
    REJECTED: "bg-red-50 text-red-600 border-red-200",
};

const statusLabel: Record<RegisterStatus, string> = {
    PENDING: "승인 대기",
    APPROVED: "승인 완료",
    REJECTED: "반려",
};

export default function StatusBadge({ status }: { status: RegisterStatus }) {
    return (
        <span
            className={`
        inline-flex items-center
        px-2.5 py-0.5
        text-xs font-medium
        border rounded-full
        ${statusStyle[status]}
      `}
        >
      {statusLabel[status]}
    </span>
    );
}
