import { gql } from "@apollo/client";

//  아이디(이메일) 찾기
export const FIND_EMAIL_MUTATION = gql`
     mutation FindEmail($input: FindEmailRequestDTO!) {
    findEmail(input: $input) {
      email
    }
  }
`;