// components/admin/AdminActionButton.tsx
type AdminButtonProps = {
    label: string;
    onClick: () => void;
    variant?: "approve" | "reject";
};

export default function AdminButton({
                                              label,
                                              onClick,
                                              variant = "approve",
                                          }: AdminButtonProps) {
    const base =
        "text-xs px-2 py-1 border transition-colors";

    const styles =
        variant === "approve"
            ? "border-[#19344e] text-[#19344e] hover:bg-[#F4F6FF]"
            : "border-red-400 text-red-500 hover:bg-red-50";

    return (
        <button
            onClick={onClick}
            className={`${base} ${styles}`}
        >
            {label}
        </button>
    );
}
