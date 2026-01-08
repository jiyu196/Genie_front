import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($input: MemberLoginRequestDTO!) {
    login(input: $input) {
      login
    }
  }
`;

export const LOGOUT_MUTATION = gql`
    mutation Logout {
    logout
}`