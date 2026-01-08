"use client";

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

export default function SignupApprovalChart() {
    const data = [
        { date: "12/22", pending: 3, approved: 1, rejected: 0 },
        { date: "12/23", pending: 5, approved: 2, rejected: 1 },
        { date: "12/24", pending: 4, approved: 3, rejected: 0 },
        { date: "12/25", pending: 2, approved: 4, rejected: 1 },
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="date" />
                <Tooltip />
                <Legend />

                <Bar dataKey="pending" stackId="a" fill="#94a3b8" name="승인 대기" />
                <Bar dataKey="approved" stackId="a" fill="#4ade80" name="승인 완료" />
                <Bar dataKey="rejected" stackId="a" fill="#f87171" name="반려" />
            </BarChart>
        </ResponsiveContainer>
    );
}
