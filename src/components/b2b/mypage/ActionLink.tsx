/* 마이페이지 홈 => 액션 링크 */
import Link from "next/link";

export default function ActionLink({
                        title,
                        href,
                    }: {
    title: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="group flex items-center justify-between rounded-xl border px-6 py-5
                       hover:border-[#19344e] hover:bg-[#f8fafc] transition"
        >
            <span className="text-[#19344e] font-medium">{title}</span>
            <span className="text-gray-400 group-hover:text-[#19344e]">→</span>
        </Link>
    );
}