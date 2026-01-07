

"use client";

import { useQuery } from "@apollo/client";
import { GET_MY_SUBSCRIPTION} from "@/graphql/plan/getMySubscription";
import {GET_PAYMENT_HISTORY} from "@/graphql/plan/getPaymentHistory";
import Link from "next/link";
import Button from "@/components/b2b/Button";

// 현재 구독
type Subscription = {
    productName: string;
    subscriptionCycle: "MONTHLY" | "YEARLY";
    startedAt: string;
    endedAt: string;
    status: "ACTIVE" | "EXPIRED" | "CANCELLED";
};

// 결제 내역
type PaymentHistory = {
    orderUuid: string;
    paidAt: string;
    amount: number;
    payStatus: "PAID" | "REFUNDED";
};
export default function PlanPage() {
    const { data: subscriptionData } = useQuery(GET_MY_SUBSCRIPTION);
    const { data: paymentData } = useQuery(GET_PAYMENT_HISTORY);

    const subscription = subscriptionData?.getMySubscription;
    const payments: PaymentHistory[] = paymentData?.getPaymentHistories ?? [];

    return (
        <section className="max-w-[960px] ml-8 mt-7 space-y-10">
            <h1 className="text-xl font-semibold text-[#19344e]">
                구독 & 결제
            </h1>

            {/* 현재 구독 정보 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
                <h2 className="font-medium text-[#19344e]">
                    현재 구독 플랜
                </h2>

                {subscription ? (
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-lg font-semibold">
                                    {subscription.productName}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {subscription.startedAt} ~ {subscription.endedAt}
                                </p>

                                <p className="text-sm text-gray-500">
                                    결제 주기 ·{" "}
                                    {subscription.subscriptionCycle === "YEARLY"
                                        ? "연간"
                                        : "월간"}
                                </p>
                            </div>

                            <span
                                className={`px-3 py-1 rounded-full text-sm ${
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

            {/* 결제 내역 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
                <h2 className="font-medium text-[#19344e]">
                    결제 내역
                </h2>

                {payments.length > 0 ? (
                    <ul className="divide-y text-sm">
                        {payments.map((payment) => (
                            <li
                                key={payment.orderUuid}
                                className="py-3 flex justify-between items-center"
                            >
                <span className="text-gray-600">
                  {payment.paidAt}
                </span>

                                <div className="flex items-center gap-4">
                  <span
                      className={`text-sm ${
                          payment.payStatus === "REFUNDED"
                              ? "text-gray-400"
                              : "text-[#19344e]"
                      }`}
                  >
                    ₩{payment.amount.toLocaleString()}
                  </span>

                                    <span
                                        className={`text-xs px-2 py-0.5 rounded ${
                                            payment.payStatus === "PAID"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-500"
                                        }`}
                                    >
                    {payment.payStatus === "PAID"
                        ? "결제 완료"
                        : "환불"}
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
            </div>
            <div className="pt-4 border-t">
                <Link href="/b2b/mypage/students">
                    <Button className="px-4 py-2">
                        학생 계정 관리로 이동
                    </Button>
                </Link>
            </div>
        </section>
    );
}
