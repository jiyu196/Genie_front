import { gql } from "@apollo/client";

export const HANDLE_REGISTER = gql`
  mutation HandleRegister($input: JoinApplyRequestDTO!) {
    handleRegister(input: $input) {
      result
    }
  }
`;
