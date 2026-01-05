import { gql, type DocumentNode } from "@apollo/client";

export const SAVE_NEW_PASSWORD: DocumentNode = gql`
  mutation saveNewPassword($input: NewPasswordRequestDTO!) {
    saveNewPassword(input: $input) {
      result
    }
  }
`;
