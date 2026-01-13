import StudentClientLayout from "@/app/student/StudentClientLayout";

export default function StudentLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return <StudentClientLayout>{children}</StudentClientLayout>;
}