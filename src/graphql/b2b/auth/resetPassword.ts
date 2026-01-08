import {gql} from "@apollo/client";

export const RESET_PASSWORD = gql`
  mutation resetPassword($input: ResetPasswordRequestDTO!) {
    resetPassword(input: $input) {
      result
    }
  }
`;


