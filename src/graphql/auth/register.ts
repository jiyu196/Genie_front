import { gql } from "@apollo/client";

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
