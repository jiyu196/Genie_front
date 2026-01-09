import StudentBackground from "@/components/student/StudentBackground";
import StudentHeader from "@/components/student/StudentHeader";
import {StudentAuthProvider} from "@/contexts/student/StudentAuthContext";

export default function StudentLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
            // 학생 로그인 상태 / 로그인, 로그아웃/ 서비스 키 인증결과를 context로 감싸서 하위 컴포넌트에 제공
            <StudentAuthProvider>
                    <div className="relative min-h-screen flex flex-col overflow-hidden">
                        <StudentBackground />

                        {/*레이아웃에서 상태관리. 로그인되면 상태변경되게*/}
                        <StudentHeader/>
                            <main className="flex-1 relative z-10">
                                {children}
                            </main>
                    </div>
            </StudentAuthProvider>
    );
}
