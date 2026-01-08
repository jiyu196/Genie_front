// 마이페이지 결제 정보
import { gql } from "@apollo/client";

export const GET_PAYMENT_HISTORY = gql`
  query GetPaymentHistory($input: GetPaymentRequestDTO!) {
    getPaymentHistory(input: $input) {
      content {
                orderUuid
                amount
                paidAt
                payStatus
                cardCompany
                cardNumberMask
                receiptUrl
            }
            totalPages
            totalElements
            currentPage
            isFirst
            isLast
    }
  }
`;