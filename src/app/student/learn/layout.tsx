import StudentAccessGate from "@/components/student/auth/StudentAccessGate";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
    return (
        <StudentAccessGate>
            {children}
        </StudentAccessGate>
    );
}
