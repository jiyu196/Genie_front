import Link from "next/link";
import { notFound } from "next/navigation";
import { notices } from "@/components/b2b/data/notices";

type Props = {
    params: {
        id: string;
    };
};

export default function NoticeDetailPage({ params }: Props) {
    const noticeId = Number(params.id);

    if (Number.isNaN(noticeId)) {
        notFound();
    }

    const notice = notices.find(n => n.id === noticeId);

    if (!notice) {
        notFound();
    }

    return (
        <div className="bg-white">
            {/* Header */}
            <section className="py-20 bg-[#f6f8fb] text-center">
                <h1 className="text-2xl font-bold text-[#19344e]">
                    {notice.title}
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                    {notice.date}
                </p>
            </section>

            {/* Content */}
            <section className="max-w-[800px] mx-auto px-6 py-20">
                <div className="text-gray-700 leading-relaxed space-y-4">
                    {notice.content.map((line, idx) => (
                        <p key={idx}>{line}</p>
                    ))}
                </div>

                <div className="mt-12">
                    <Link
                        href="/b2b/notice"
                        className="text-sm text-[#19344e] hover:underline font-bold"
                    >
                        ← 목록으로 돌아가기
                    </Link>
                </div>
            </section>
        </div>
    );
}
