import { gql, type DocumentNode } from "@apollo/client";

export const WITHDRAW = gql`
  mutation Withdraw($input: DeleteRequestDTO!) {
    withdraw(input: $input) {
      result
    }
  }
`;