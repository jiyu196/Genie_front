import '@/app/student/student.css';
import StudentHeader from '@/components/common/StudentHeader';

export default function StudentLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <div className="student-layout">
            <StudentHeader />
            {children}
        </div>
    );
}
