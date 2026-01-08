import {gql} from "@apollo/client";

export const GET_TERM_QUERY = gql`
    query GetTerm($input: GetTermsRequestDTO!) {
        getTerm(input: $input) {
            version
            title
            content
            isRequired
            registeredAt
            termsStatus
        }
    }
`;