import { gql } from "@apollo/client";

// 이메일 인증번호 발송
export const SEND_EMAIL_CODE_MUTATION = gql`
  mutation SendVerificationEmail(
    $input: MemberVerifyEmailRequestDTO!
) {
    sendVerificationEmail(input: $input) {
       result
    }
  }
`;

