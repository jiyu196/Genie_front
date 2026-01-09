import {gql} from "@apollo/client";

export const SERVICE_ACCESS_LOGIN = gql`
    mutation ServiceAccessLogin($input: ServiceAccessLoginRequestDTO!) {
        serviceAccessLogin(input: $input) {
            result
        }
    }
`;