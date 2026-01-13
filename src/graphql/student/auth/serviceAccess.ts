// src/graphql/student/auth/serviceAccess.ts
import { gql } from "@apollo/client";

export const SERVICE_ACCESS_LOGIN = gql`
  mutation ServiceAccessLogin($input: ServiceAccessLoginRequestDTO!) {
    serviceAccessLogin(input: $input) {
      result
    }
  }
`;

export const SERVICE_ACCESS_LOGOUT = gql`
  mutation ServiceAccessLogout {
    serviceAccessLogout
  }
`;

// 인증 초기화 (로그인 여부 판단)
export const GET_MY_ACCESS_ID_PAGE = gql`
  query GetMyAccessIdPage($input: MyAccessIdPageRequestDTO!) {
    getMyAccessIdPage(input: $input) {
      totalElements
    }
  }
`;
