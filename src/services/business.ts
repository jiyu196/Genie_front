// src/services/business.ts
import { CHECK_BIZ_NUMBER } from "@/graphql/business/checkBizNumber";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export const checkBusiness = async (
    client: ApolloClient<NormalizedCacheObject>,
    input: {
        bizNumber: string;
        representativeName: string;
        openingDate: string;
    }
) => {
    return client.mutate({
        mutation: CHECK_BIZ_NUMBER,
        variables: { input },
        fetchPolicy: "no-cache",
    });
};
