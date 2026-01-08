"use client";

import { useQuery } from "@apollo/client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/b2b/Button";

import { GET_MY_SUBSCRIPTION } from "@/graphql/b2b/plan/getMySubscription";
import { GET_PAYMENT_HISTORY } from "@/graphql/b2b/plan/getPaymentHistory";

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

    const pageInfo = paymentData?.getPaymentHistory;

    return (
        <section className="max-w-[1200px] ml-8 mt-7">
            <h1 className="text-xl font-semibold text-[#19344e] mb-8">
                구독 & 결제
            </h1>

            {/* 2컬럼 레이아웃 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5 h-full">
                        <h2 className="font-medium text-[#19344e]">
                            현재 구독 플랜
                        </h2>

            {subscription ? (
            <div className="flex flex-col gap-4">
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
            <div>
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
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                현재 이용 중인 구독이 없습니다.
                            </p>
                        )}
                    </div>
                </div>

                {/* 결제내역 */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
                        <h2 className="font-medium text-[#19344e]">
                            결제 내역
                        </h2>

                        {paymentLoading ? (
                            <p className="text-sm text-gray-500">불러오는 중...</p>
                        ) : payments.length > 0 ? (
                            <ul className="divide-y text-sm">
                                {payments.map(payment => (
                                    <li
                                        key={payment.orderUuid}
                                        className="py-4 flex justify-between items-start"
                                    >
                                        {/* 왼쪽 정보 */}
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-700">
                                                {formatDate(payment.paidAt)}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                주문번호 · {payment.orderUuid}
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
                                                    className="text-xs text-blue-600 underline"
                                                >
                                                    영수증 보기
                                                </a>
                                            )}
                                        </div>

                                        {/* 오른쪽 금액 / 상태 */}
                                        <div className="flex flex-col items-end gap-2">
                                          <span className="font-semibold text-[#19344e] text-lg">
                                            ₩{payment.amount.toLocaleString()}
                                          </span>

                                            <span
                                                className={`text-xs px-2 py-1 rounded ${
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
                </div>
            </div>

            {/* 하단 CTA */}
            <div className="pt-6 border-t mt-10">
                <Link href="/b2b/mypage/students">
                    <Button className="px-4 py-2">
                        학생 계정 관리로 이동
                    </Button>
                </Link>
            </div>
        </section>

    );
}
