import { gql, type DocumentNode } from "@apollo/client";
// type DocumentNode -> 타입스크립트에서 apollo 쿼리를 명확하게 타입 고정하기 위해.

export const CHECK_PASSWORD: DocumentNode = gql`
  mutation CheckPassword($input: PasswordCheckRequestDTO!) {
    checkPassword(input: $input) {
      result
    }
  }
`;
