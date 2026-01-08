import Link from "next/link";
import { notices } from "@/components/b2b/data/notices";

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
                                href={`/b2b/notice/${notice.id}`}
                                className="flex items-center justify-between bg-white rounded-xl px-6 py-5 border border-[#19344e]/10 hover:shadow-sm transition"
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
            </section>
        </div>
    );
}
