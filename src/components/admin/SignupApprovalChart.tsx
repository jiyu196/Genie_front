"use client";

import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { GET_ADMIN_MEMBERS } from "@/graphql/admin/members";

type Member = {
    createdAt: string;
    registerStatus: "PENDING" | "APPROVED" | "REJECTED";
};

export default function SignupApprovalChart() {
    // 전체 회원 조회
    const { data, loading } = useQuery(GET_ADMIN_MEMBERS, {
        variables: {
            input: {
                page: 1,
                size: 1000,
                condition: null,
            },
        },
        fetchPolicy: "no-cache",
    });

    const members: Member[] = data?.getAllMembers?.content ?? [];

    // 날짜별 집계
    const chartData = useMemo(() => {
        if (members.length === 0) return [];

        const map: Record<
            string,
            { date: string; pending: number; approved: number; rejected: number }
        > = {};

        members.forEach((m) => {
            const date = new Date(m.createdAt).toLocaleDateString("ko-KR", {
                month: "2-digit",
                day: "2-digit",
            });

            if (!map[date]) {
                map[date] = { date, pending: 0, approved: 0, rejected: 0 };
            }

            if (m.registerStatus === "PENDING") map[date].pending++;
            if (m.registerStatus === "APPROVED") map[date].approved++;
            if (m.registerStatus === "REJECTED") map[date].rejected++;
        });

        return Object.values(map);
    }, [members]);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center text-sm text-gray-400">
                그래프 불러오는 중...
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="date" />
                <Tooltip />
                <Legend />

                <Bar dataKey="pending"  stackId="a" fill="#c7d2fe" name="승인 대기" />
                <Bar dataKey="approved" stackId="a" fill="#4f46e5" name="승인 완료" />
                <Bar dataKey="rejected" stackId="a" fill="#fca5a5" name="반려" radius={[0, 8, 8, 0]}/>
            </BarChart>
        </ResponsiveContainer>
    );
}
