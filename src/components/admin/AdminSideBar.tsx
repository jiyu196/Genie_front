"use client"

// components/admin/AdminSidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
    { label: "대시보드", href: "/admin" },
    { label: "회원 관리", href: "/admin/members" },
    { label: "회원가입 요청 상세", href: "/admin/members/signup-requests/1" },
    { label: "매출 관리", href: "/admin/subscriptions" },
    { label: "프롬프트 관리", href: "/admin/prompts" },
    { label: "금칙어 관리", href: "/admin/forbidden-words" },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-[220px] bg-white border-r border-gray-200">
            <div className="px-6 py-4 font-bold text-[#19344e]">
                관리자
            </div>

            <nav className="px-2">
                {menus.map(menu => {
                    const active =
                        pathname === menu.href ||
                        pathname.startsWith(menu.href + "/");

                    return (
                        <Link
                            key={menu.href}
                            href={menu.href}
                            className={`block px-4 py-2 text-sm rounded-none
                ${
                                active
                                    ? "bg-[#F4F6FF] text-[#19344e] font-medium"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            {menu.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
