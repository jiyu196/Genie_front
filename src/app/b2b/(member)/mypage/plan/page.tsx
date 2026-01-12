"use client";

import { useQuery } from "@apollo/client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/b2b/Button";

import { GET_MY_SUBSCRIPTION } from "@/graphql/b2b/plan/getMySubscription";
import { GET_PAYMENT_HISTORY } from "@/graphql/b2b/plan/getPaymentHistory";
import {Copy} from "lucide-react";

// 현재 구독 (단건)
type Subscription = {
    productName: string;
    productGrade: string;
    subscriptionCycle: "MONTHLY" | "YEARLY";
    startedAt: string;
    endedAt: string;
    issuedAccessCount: number;
    status: "ACTIVE" | "EXPIRED" | "CANCELLED";
};

// 날짜 변환
function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}

// 결제 내역 (페이지네이션)
type PaymentHistory = {
    orderUuid: string;
    amount: number;
    paidAt: string;
    payStatus: "PAID" | "CANCELLED" | "FAILED" | "PAY_PENDING";
    cardCompany: string;
    cardNumberMask: string;
    receiptUrl: string;
};

export default function PlanPage() {
    // 페이지네이션
    const [page, setPage] = useState(1);
    const size = 10;

   // 쿼리
    const { data: subscriptionData } = useQuery(GET_MY_SUBSCRIPTION);

    const { data: paymentData, loading: paymentLoading } = useQuery(
        GET_PAYMENT_HISTORY,
        {
            variables: {
                input: {
                    page,
                    size,
                },
            },
        }
    );


    const subscription: Subscription | undefined =
        subscriptionData?.getMySubscription;

    const payments: PaymentHistory[] =
        paymentData?.getPaymentHistory?.content ?? [];
    // 주문번호 축약
    function maskOrderId(orderUuid: string) {
        return orderUuid.slice(-6);
    }

    const pageInfo = paymentData?.getPaymentHistory;

    return (
        <section className="max-w-[1200px] ml-8 mt-7 space-y-12">
            <h1 className="text-xl font-semibold text-[#19344e]">
                구독 및 결제 내역
            </h1>

            {/* 현재 구독 플랜 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
                <h2 className="font-medium text-[#19344e]">
                    현재 구독 플랜
                </h2>

                {subscription ? (
                    <div className="flex flex-col gap-6">
                        <div className="space-y-1">
                            <p className="text-lg font-semibold">
                                {subscription.productName}
                            </p>

                            <p className="text-sm text-gray-500">
                                {formatDate(subscription.startedAt)} ~{" "}
                                {formatDate(subscription.endedAt)}
                            </p>

                            <p className="text-sm text-gray-500">
                                결제 주기 ·{" "}
                                {subscription.subscriptionCycle === "YEARLY"
                                    ? "연간"
                                    : "월간"}
                            </p>

                            <p className="text-sm text-gray-500">
                                발급된 서비스 계정 수 ·{" "}
                                <span className="font-medium text-[#19344e]">
                            {subscription.issuedAccessCount}개
                        </span>
                            </p>
                        </div>

                        <div className="
                            flex flex-col gap-3
                            sm:flex-row sm:items-center sm:justify-between
                        ">
                    <span
                        className={`inline-block px-3 py-1 rounded-full text-sm ${
                            subscription.status === "ACTIVE"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-500"
                        }`}
                    >
                        {subscription.status === "ACTIVE"
                            ? "이용 중"
                            : "만료됨"}
                    </span>

                            {/* 👉 핵심 CTA 위치 */}
                            <Link href="/b2b/mypage/serviceId">
                                <Button>
                                    발급된 서비스 계정 확인하러가기
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">
                        현재 이용 중인 구독이 없습니다.
                    </p>
                )}
            </div>

            {/* 결제 내역 확인 */}
            <div className="space-y-4">
                <h2 className="font-medium text-[#19344e]">
                    결제 내역
                </h2>

                {paymentLoading ? (
                    <p className="text-sm text-gray-500">불러오는 중...</p>
                ) : payments.length > 0 ? (
                    <ul className="space-y-4">
                        {payments.map(payment => (
                            <li
                                key={payment.orderUuid}
                                className="bg-white rounded-2xl p-6 shadow-sm"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                                    {/* 왼쪽 정보 */}
                                    <div className="space-y-1">
                                        <p className="text-sm text-gray-500">
                                            {formatDate(payment.paidAt)}
                                        </p>

                                        <p className="text-base font-bold text-[#19344e]">
                                            ₩{payment.amount.toLocaleString()}
                                        </p>

                                        <p className="text-xs text-gray-500 flex items-center gap-2">
                                            주문번호 · {maskOrderId(payment.orderUuid)}
                                            <button
                                                type="button"
                                                className="
                                                    flex items-center gap-1.5
                                                    px-2 py-0.5
                                                    text-[11px]
                                                    rounded-md
                                                    border border-gray-200
                                                    text-gray-500
                                                    hover:bg-gray-50
                                                    cursor-pointer
                                                "
                                                onClick={() => {
                                                    navigator.clipboard.writeText(payment.orderUuid);
                                                    alert("주문번호가 복사되었습니다.");
                                                }}
                                            >
                                                <Copy size={14} />
                                                복사
                                            </button>
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            결제수단 · {payment.cardCompany} (
                                            {payment.cardNumberMask})
                                        </p>

                                        {payment.receiptUrl && (
                                            <a
                                                href={payment.receiptUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block text-xs text-blue-600 underline pt-1"
                                            >
                                                영수증 보기
                                            </a>
                                        )}
                                    </div>

                                    {/* 오른쪽 상태표시 */}
                                    <div className="flex items-start sm:items-end">
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-sm ${
                                                payment.payStatus === "PAID"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            {payment.payStatus === "PAID"
                                                ? "결제 완료"
                                                : "결제 취소"}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">
                        결제 내역이 없습니다.
                    </p>
                )}

                {/* 페이지네이션 */}
                {pageInfo && (
                    <div className="flex justify-center items-center gap-3 pt-4">
                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={pageInfo.isFirst}
                            onClick={() => setPage(p => p - 1)}
                        >
                            이전
                        </Button>

                        <span className="text-sm">
                {pageInfo.currentPage} / {pageInfo.totalPages}
            </span>

                        <Button
                            variant="secondary"
                            size="sm"
                            disabled={pageInfo.isLast}
                            onClick={() => setPage(p => p + 1)}
                        >
                            다음
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
