import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($input: MemberLoginRequestDTO!) {
    login(input: $input) {
      login
    }
  }
`;
