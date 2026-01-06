
import { gql } from "@apollo/client";

export const UPDATE_MEMBER_INFO = gql`
  mutation UpdateMemberInfo($input: UpdateInfoRequestDTO!) {
    update(input: $input) {
      representativeName
      contactName
    }
  }
`;
