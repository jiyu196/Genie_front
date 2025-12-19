import {gql} from "@apollo/client"

export const REGISTER_MUTATION = gql`
    mutation register($input: RegisterRequestInput!) {
        register(input: $input) {
        register RequestStatus
        bizNumber
        }
    }
`;
// export default REGISTER_MUTATION;

// register 뮤테이션은 graphql이다. 등록 뮤테이션 input값은 registerRequest에서 받는 값이다
// register input에는 input이 들어감.
// 이거 백틱 안에 있는 코드 뜻을 모르겠음