import { gql } from "@apollo/client";
import { apolloClient } from "@/lib/apolloClient";
import type {Member} from "@/types/admin/member";

const GET_CURRENT_MEMBER = gql`
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
      isTempPassword
      passwordUpdatedAt
    }
  }
`;

export async function getCurrentMember(): Promise<Member> {
    const { data } = await apolloClient.query({
        query: GET_CURRENT_MEMBER,
        fetchPolicy: "no-cache",
    });

    return data.me;
}
