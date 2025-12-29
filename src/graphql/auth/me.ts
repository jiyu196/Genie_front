import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query Me {
    me {
      email
      accountStatus
      bizNumber
      organizationName
      representativeName
      contactName
      registerStatus
      role
      approvedAt
    }
  }
`;
