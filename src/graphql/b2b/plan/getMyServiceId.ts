import { gql } from "@apollo/client";

export const GET_MY_SERVICE_ID = gql`
  query getMyAccessIdPage($input: MyAccessIdPageRequestDTO!) {
    getMyAccessIdPage(input: $input) {
      content {
                decryptedKey
                accessStatus
                createdAt
                expiredAt
            }
            totalPages
            totalElements
            currentPage
            isFirst
            isLast
    }
  }
`;