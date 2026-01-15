"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenu } from "@/components/b2b/SideBarMenu";
import { useState } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: Props) {
    const pathname = usePathname();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <aside
            className={`
                fixed lg:static
                top-0 left-0 z-50
                h-full
                w-[260px]
                bg-[#F4F6FF]
                border-r border-[#19344e]/10
                px-5 py-8
                transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0
            `}
        >
            {/* 모바일 닫기 버튼 */}
            <div className="lg:hidden flex justify-end mb-4">
                <button onClick={onClose}>✕</button>
            </div>

            {/* 타이틀 */}
            <Link href="/b2b/mypage" onClick={onClose}>
                <h2 className="text-3xl font-bold text-[#19344e] mb-8">
                    마이페이지
                </h2>
            </Link>

            <nav className="space-y-6">
                {sidebarMenu.map((section, idx) => {
                    const isOpenSection = openIndex === idx;

                    return (
                        <div key={section.title}>
                            <button
                                onClick={() =>
                                    setOpenIndex(isOpenSection ? null : idx)
                                }
                                className="w-full flex justify-between py-2 text-sm font-semibold cursor-pointer"
                            >
                                <span>{section.title}</span>
                                <span>{isOpenSection ? "▾" : "▸"}</span>
                            </button>

                            {isOpenSection && (
                                <ul className="mt-2 space-y-1 pl-2">
                                    {section.items.map(item => {
                                        const active = pathname.startsWith(item.href);

                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    onClick={onClose}
                                                    className={`block px-3 py-2 rounded-md text-sm
                                                        ${active
                                                        ? "bg-white font-medium border-l-4 border-[#19344e]"
                                                        : "text-[#19344e]/70 hover:bg-white"
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
