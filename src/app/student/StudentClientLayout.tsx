"use client";

import StudentBackground from "@/components/student/StudentBackground";
import StudentHeader from "@/components/student/StudentHeader";

export default function StudentClientLayout({
                                                children,
                                            }: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen flex flex-col overflow-hidden">
            <StudentBackground />
            <StudentHeader />
            <main className="flex-1 relative z-10">{children}</main>
        </div>
    );
}
