import { gql } from "@apollo/client";

// 회원가입 요청 최종단계
export const REGISTER_MUTATION = gql`
  mutation Register($input: MemberRegisterRequestDTO!) {
    register(input: $input) {
      registerStatus
      accountStatus
      bizNumber
      organizationName
    }
  }
`;

