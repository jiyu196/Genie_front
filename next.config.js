/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/rest/:path*",
                destination: 'http://localhost:8080/:path*',
            },
        ];
    },
};

module.exports = nextConfig;

// 프론트는 3000, 백엔드는 8080 -> 브라우저에서 보안정책 CORS 에러 발생
// rewrites가 하는일은 프론트 서버가 대신 백엔드에 요청해줌
// 프론트에서 쓰는 주소는 /api/rest/business/validate인데
// 실제로 가는 곳은 http://localhost:8080/business/validate임.
// 그렇기때문에 브라우저는 간튼 서버 3000에 요청했다고 생각해서 CORS 안터지고 백 주소 숨기고, 환경 바껴도 프론트 코드 안바꿈

// 안쓰면 fetch 마다 백 주소 직접 써야하고, 배포 시 전부 수정해야함
// 썼을 때 Restapi 전용 통로하나 만들어진거다 라고 생각하면됨. graphql과 분리되고

// :path*  이건 /api/rest 뒤에오는 모든 경로 잡으려고