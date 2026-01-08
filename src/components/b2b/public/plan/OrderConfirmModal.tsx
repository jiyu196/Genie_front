import Button from "@/components/b2b/Button";
import {useMutation} from "@apollo/client";
import {PREPARE_ORDER} from "@/graphql/b2b/plan/orders";
import PortOne, {PaymentPayMethod} from "@portone/browser-sdk/v2";
import {CHECK_PAYMENT} from "@/graphql/b2b/plan/checkPayment";
import {useRouter} from "next/navigation";

export type Product = {
    id: string;
    price: number;
    duration: number;
    maxPromptDailyCount: number;
    maxWebtoonStorage: number;
    maxServiceAccessIdCount: number;
    productStatus: ProductStatus;       // 상품 상태
    productGrade: ProductGrade;         // BASIC / PRO / PREMIUM
    subscriptionCycle: SubscriptionCycle; // 월간 / 연간
    displayName: string;
    description?: string;               // !가 없으므로 선택적 필드(Optional)
}

// 상품 관련 ENUM
export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';
export type ProductGrade = 'BASIC' | 'PRO' | 'PREMIUM';
export type SubscriptionCycle = 'MONTHLY' | 'YEARLY';

type Props = {
    product: Product;
    onClose: () => void;
};

export default function OrderConfirmModal ({product, onClose} : Props) {
    const router = useRouter();

    // 주문 생성 뮤테이션
    const [prepareOrder, {loading}] = useMutation(PREPARE_ORDER);
    // 결제 완료 후 서버 검증 뮤테이션
    const[checkPayment] = useMutation(CHECK_PAYMENT);
    // 결제 버튼 클릭 핸들러
    const handlePay = async () => {

        try{
            // 선택한 상품 주문 생성 요청
            const response = await prepareOrder({
                variables: {
                    input: {productId: product.id},
                }
            });

            // 주문 생성 결과 추출
            const orderData = response?.data?.prepareOrder;
            if(orderData) {
                const {orderUuid, totalAmount, organizationName, storeId, displayName, productId, channelKey} = orderData;

                // 포트원 결제창 호출 (서버에서 내려준 설정으로)
                const paymentResponse = await PortOne.requestPayment({
                    storeId: storeId, // 포트원 관리자 콘솔 -> 결제설정 -> 가맹점 식별코드
                    paymentId: orderUuid, // 백엔드에서 받은 그 UUID (포트원 사전등록된 값과 동일해야 함)
                    orderName: organizationName || "상품 결제",
                    totalAmount: totalAmount, // 백엔드가 계산해준 1/1000 금액 (예: 129원)
                    products: [
                        {id: productId, name: displayName, quantity: 1, amount: totalAmount}
                    ],
                    currency: "KRW",
                    payMethod: "CARD",
                    channelKey: channelKey, // 결제 채널 고유 키
                    taxFreeAmount: 0,
                    customer: {
                        fullName: organizationName
                    },
                });
                // 결제 취소, 실패시 처리 중단
                console.log(paymentResponse);

                if (paymentResponse?.code !== undefined) {
                    return alert(`결제 실패/취소: ${paymentResponse.message}`);
                }
                // 결제 결과 서버에 전달 후 최종 검증 요청
                const checkPayResponse = await checkPayment({
                    variables: {
                        input: {
                            paymentId: paymentResponse?.paymentId,
                            transactionType: paymentResponse?.transactionType,
                            txId: paymentResponse?.txId,
                        }
                    }
                });

                const checkResult = checkPayResponse?.data?.checkPayment;

                // 서버 검증 성공 -> 후처리
                if (checkResult) {
                    console.log(checkResult);

                    alert(`${checkResult.displayName} 구독이 성공적으로 완료되었습니다!\n총 ${checkResult.issuedAccessCount}개의 액세스 슬롯이 발급되었습니다.`);

                    router.replace("/b2b/mypage/plan");

                } else {
                    // 서버 검증 실패한 경우
                    alert("결제는 완료되었으나 서버 검증에 실패했습니다. 고객센터로 문의해주세요.");
                }


            }
        } catch (e) {
            // 주문 생성 / 결제 / 검증 중 예외 발생
            console.error("주문 준비 단계에서 시스템 에러 발생:", e);
            alert("서버 통신 중 오류가 발생했습니다.");
        }
    };



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-[450px] bg-white rounded-3xl p-8 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">주문 상세 확인</h3>
                    <button onClick={onClose} className="text-gray-400 text-xl cursor-pointer">
                        ×
                    </button>
                </div>

                {/* Product Info */}
                <div className="bg-[#f6f8ff] rounded-2xl p-6 mb-6">
          <span className="text-sm font-semibold text-blue-600">
            {product.productGrade} PLAN
          </span>
                    <h4 className="text-xl font-bold mt-2 mb-2">
                        {product.displayName}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {product.description}
                    </p>
                </div>

                {/* Features */}
                <ul className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-6">
                    <li>✓ 프롬프트 {product.maxPromptDailyCount}회/일</li>
                    <li>✓ 저장 용량 {product.maxWebtoonStorage}GB</li>
                    <li>✓ 서비스 키 {product.maxServiceAccessIdCount}개</li>
                    <li>✓ 구독 기간 {product.duration}일</li>
                </ul>

                {/* Price */}
                <div className="border-t pt-4 flex justify-between items-center mb-6">
                    <span className="font-semibold">최종 결제 금액</span>
                    <span className="text-2xl font-bold">
            ₩{product.price.toLocaleString()}
                        <span className="text-sm text-gray-500 ml-1">(VAT 포함)</span>
          </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <Button
                        className="flex-1"
                        onClick={onClose}
                        variant="secondary"
                    >
                        취소
                    </Button>
                    <Button
                        className="flex-1"
                        variant="primary"
                        onClick={handlePay}
                        disabled={loading}
                    >
                        결제하기
                    </Button>
                </div>
            </div>
        </div>
    );
}