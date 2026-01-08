import Link from "next/link";
import { notices } from "@/components/b2b/data/notices";

export default function NoticePreview() {
    // 최신 공지 3개만 노출
    const previewNotices = notices.slice(0, 3);

    return (
        <section className="pt-20 pb-28 bg-[#f6f8fb]">
            <div className="mx-auto max-w-[900px] px-6">

                {/* 섹션 헤더 */}
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-semibold text-[#19344e]">
                            공지사항
                        </h2>
                        <div className="mt-3 w-10 h-[2px] bg-[#19344e]/20" />
                    </div>

                    <Link
                        href="/b2b/notice"
                        className="
                            text-sm
                            text-[#19344e]/60
                            hover:text-[#19344e]
                            transition
                            font-bold
                        "
                    >
                        전체보기 →
                    </Link>
                </div>

                {/* 공지 리스트 (최대 3개) */}
                <ul className="space-y-4">
                    {previewNotices.map(notice => (
                        <li key={notice.id}>
                            <Link
                                href={`/b2b/notice/${notice.id}`}
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
                                    <span
                                        className={`text-sm font-semibold ${
                                            notice.type === "공지"
                                                ? "text-[#F59E0B]"
                                                : "text-[#19344e]"
                                        }`}
                                    >
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
            </div>
        </section>
    );
}
