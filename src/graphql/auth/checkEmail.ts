import {gql} from "@apollo/client";

// 이메일 중복체크
export const EMAIL_CHECK_MUTATION = gql`
    mutation CheckEmail(
        $input: EmailCheckRequestDTO!) {
            checkEmail(input: $input) {
                result
            }
        }
`;