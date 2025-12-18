// components/b2b/sidebar/Sidebar.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenu} from "@/components/b2b/SideBarMenu";
import { useState } from "react";

export default function Sidebar() {
    const pathname = usePathname();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <aside className="w-64 bg-white border-r px-4 py-6">
            <h2 className="text-lg font-semibold mb-6">마이페이지</h2>

            <nav className="space-y-4">
                {sidebarMenu.map((section, idx) => {
                    const isOpen = openIndex === idx;

                    return (
                        <div key={section.title}>
                            {/* 큰 메뉴 */}
                            <button
                                onClick={() =>
                                    setOpenIndex(isOpen ? null : idx)
                                }
                                className="w-full flex justify-between items-center text-left font-medium py-2"
                            >
                                {section.title}
                                <span>{isOpen ? "−" : "+"}</span>
                            </button>

                            {/* 하위 메뉴 */}
                            {isOpen && (
                                <ul className="mt-2 space-y-2 pl-3">
                                    {section.items.map(item => {
                                        const active = pathname.startsWith(item.href);

                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    className={`block text-sm px-2 py-1 rounded
                                                        ${active
                                                        ? "bg-[#19344e] text-white"
                                                        : "text-gray-600 hover:bg-gray-100"
                                                    }`}
                                                >
                                                    {item.label}
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
