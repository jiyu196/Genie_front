// 마이페이지 결제 정보
import { gql } from "@apollo/client";

export const GET_PAYMENT_HISTORY = gql`
  query GetPaymentHistory {
    getPaymentHistory {
      orderUuid
      amount
      paidAt
      payStatus
    }
  }
`;
