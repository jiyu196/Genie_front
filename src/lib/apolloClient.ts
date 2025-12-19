import {ApolloClient, InMemoryCache} from "@apollo/client";

export const apolloClient = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache(),
    credentials: "include",
});

// uri는 graphql 앤드포인드
// cache는 apollo가 결과 기억하는
// credentials는 jwt 쿠키 포함 credentials:"include"이건 HttpOnly Cookie로 내려주는 구조일경우 이 옵션이 없으면 로그인이 됐어도
// 인증 안된 것처럼 보인다고함. 백쪽 util쪽에 CookieUtil파일있고, 그 안에 httpOnly있는거 확인했음.

// ApolloClient는 클래스/ InMemoryCache는 캐쉬 구현체