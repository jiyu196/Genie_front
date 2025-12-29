import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// 쿠키 기반 인증 허용 설정
export const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:8080/graphql",
        credentials: "include",
    }),
    cache: new InMemoryCache(),
});
