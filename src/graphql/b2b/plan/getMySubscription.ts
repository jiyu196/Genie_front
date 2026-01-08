// 마이페이지 구독 정보 가져오기
import { gql } from "@apollo/client";

export const GET_MY_SUBSCRIPTION = gql`
  query GetMySubscription {
    getMySubscription {
      productName
      productGrade
      subscriptionCycle
      startedAt
      endedAt
      issuedAccessCount
      status
    }
  }
`;
