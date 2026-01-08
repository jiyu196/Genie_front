import {gql} from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
    query GetAllProducts {
      getAllProducts {
        list {
          id
          displayName
          description
          price
          duration
          productGrade
          subscriptionCycle
          maxPromptDailyCount
          maxWebtoonStorage
          maxServiceAccessIdCount
          productStatus
        }
      }
    }
`;
