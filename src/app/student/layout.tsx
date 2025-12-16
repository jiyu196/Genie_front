// src/app/student/layout.tsx
import StudentHeader from "@/components/common/StudentHeader";

export default function StudentLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#f6eeee]">
            <StudentHeader />
            {children}
        </div>
    );
}
