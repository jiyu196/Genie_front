// src/app/student/layout.tsx
import StudentHeader from "@/components/student/StudentHeader";
import StudentBackground from "@/components/student/StudentBackground";

export default function StudentLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-[#f6eeee]">
            <StudentBackground/>
            <StudentHeader />
            <main className="flex-1 relative overflow-hidden">
                {children}
            </main>
        </div>
    );
}
