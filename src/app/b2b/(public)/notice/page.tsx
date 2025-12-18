import Link from "next/link";

const notices = [
    {
        id: 1,
        type: "공지",
        title: "고객만족도 조사 안내",
        date: "2025-10-27",
    },
    {
        id: 2,
        type: "안내",
        title: "학습 적합 진단 이벤트 발표",
        date: "2025-09-23",
    },
    {
        id: 3,
        type: "공지",
        title: "시스템 점검 안내",
        date: "2025-09-10",
    },
    {
        id: 4,
        type: "안내",
        title: "GenieTune 학습 콘텐츠 업데이트 안내",
        date: "2025-08-28",
    },
    {
        id: 5,
        type: "공지",
        title: "기관 관리자 기능 개선 안내",
        date: "2025-08-12",
    },
    {
        id: 6,
        type: "공지",
        title: "개인정보 처리방침 개정 안내",
        date: "2025-07-01",
    },
    {
        id: 7,
        type: "안내",
        title: "여름방학 기간 학습 운영 가이드",
        date: "2025-07-22",
    },
    {
        id: 8,
        type: "안내",
        title: "학생 계정 관리 기능 이용 방법 안내",
        date: "2025-06-18",
    },
    {
        id: 9,
        type: "공지",
        title: "GenieTune 서비스 정식 오픈 안내",
        date: "2025-06-01",
    },
];


export default function NoticePage() {
    return (
        <div className="bg-[#F4F6FF]">
            {/* Header */}
            <section className="max-w-[1100px] mx-auto px-6 pt-24 pb-12">
                <h1 className="text-3xl font-bold text-[#19344e] mb-2">
                    공지사항
                </h1>
                <p className="text-gray-500">
                    GenieTune 서비스 운영과 관련된 안내사항입니다.
                </p>
            </section>

            {/* List */}
            <section className="max-w-[1100px] mx-auto px-6 pb-24">
                <ul className="space-y-4">
                    {notices.map(notice => (
                        <li key={notice.id}>
                            <Link
                                href={`/src/app/b2b/(public)/notice/${notice.id}`}
                                className="
                                    flex items-center justify-between
                                    bg-white
                                    rounded-xl
                                    px-6 py-5
                                    border border-[#19344e]/10
                                    hover:shadow-sm
                                    transition
                                "
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`
                                        text-sm font-semibold
                                        ${notice.type === "공지"
                                        ? "text-[#F59E0B]"
                                        : "text-[#19344e]"}
                                    `}>
                                        [{notice.type}]
                                    </span>
                                    <span className="text-gray-800">
                                        {notice.title}
                                    </span>
                                </div>

                                <span className="text-sm text-gray-400">
                                    {notice.date}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
