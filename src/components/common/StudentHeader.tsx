// src/components/common/StudentHeader.tsx
import Link from "next/link";

export default function StudentHeader() {
    return (
        <header className="student-header">
            <Link href="/student/">
                <div className="logo">Genie튠</div>
            </Link>

            <nav className="nav">
                <Link href="/student/login">
                    <button>로그인</button>
                </Link>
                <Link href="/student/myPage">
                    <button>내 학습방</button>
                </Link>
            </nav>
        </header>
    );
}
