// app/b2b/(member)/layout.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/b2b/SideBar";

export default function MemberLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-[#F4F6FF]">
            {/* 모바일 오버레이 */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* 사이드바 */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* 메인 영역 */}
            <div className="flex-1 flex flex-col">

                <main className="flex-1 p-4 lg:p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
