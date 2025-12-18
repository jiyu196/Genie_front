'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenu } from "@/components/b2b/SideBarMenu";
import { useState } from "react";

export default function Sidebar() {
    const pathname = usePathname();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <aside className="w-[260px] bg-[#F4F6FF] border-r border-[#19344e]/10 px-5 py-8">
            {/* 타이틀 */}
            <h2 className="text-lg font-bold text-[#19344e] mb-8">
                마이페이지
            </h2>

            <nav className="space-y-6">
                {sidebarMenu.map((section, idx) => {
                    const isOpen = openIndex === idx;

                    return (
                        <div key={section.title}>
                            {/* 대메뉴 */}
                            <button
                                onClick={() =>
                                    setOpenIndex(isOpen ? null : idx)
                                }
                                className="w-full flex items-center justify-between text-left
                                           text-sm font-semibold text-[#19344e]
                                           py-2 hover:text-[#19344e]"
                            >
                                <span>{section.title}</span>
                                <span className="text-xs text-[#19344e]/60">
                                    {isOpen ? "▾" : "▸"}
                                </span>
                            </button>

                            {/* 소메뉴 */}
                            {isOpen && (
                                <ul className="mt-2 space-y-1 pl-2">
                                    {section.items.map(item => {
                                        const active = pathname.startsWith(item.href);

                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    className={`group flex items-center gap-2
                                                        text-sm px-3 py-2 rounded-md
                                                        transition
                                                        ${
                                                        active
                                                            ? "bg-white text-[#19344e] font-medium border-l-4 border-[#19344e]"
                                                            : "text-[#19344e]/70 hover:bg-white"
                                                    }`}
                                                >
                                                    <span>{item.label}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}
