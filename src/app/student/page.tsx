import Link from "next/link";
import "./student.css";

export default function StudentMainPage() {
    return (
        <div className="app-bg">

            <div className="main-card">
                <h1 className="main-title">
                    나만의 <br /> 그림 이야기 만들기
                </h1>

                <div className="main-buttons">
                    <Link href="/student/learn">
                        <button className="main-btn">단어만 입력할래요!</button>
                    </Link>

                    <button className="main-btn outline">
                        제가 문장 쓸래요!
                    </button>
                </div>
            </div>
        </div>
    );
}
