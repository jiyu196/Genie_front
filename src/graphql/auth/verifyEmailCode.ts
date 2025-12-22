import { gql } from "@apollo/client";

// 이메일 인증번호 검증
export const VERIFY_EMAIL_CODE_MUTATION = gql`
  mutation VerifyCode( 
    $input: MemberVerifyCodeRequestDTO!
) {
    verifyCode(input: $input) {
        result
    }
}
`;

