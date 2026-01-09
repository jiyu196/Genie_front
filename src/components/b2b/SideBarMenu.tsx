// components/b2b/B2BMenu
export const sidebarMenu = [
    {
        title: "기본정보",
        items: [
            {
                label: "기관 정보",
                href: "/b2b/mypage/organization",
            },
            {
                label: "비밀번호 변경",
                href: "/b2b/mypage/password",
            },
        ],
    },
    {
        title: "서비스 계정",
        items: [
            {
                label: "발급된 Genie튠 서비스계정",
                href: "/b2b/mypage/serviceId",
            },
        ],
    },
    {
        title: "구독 & 결제",
        items: [
            {
                label: "구독 및 결제정보",
                href: "/b2b/mypage/plan",
            },
        ],
    },
    {
        title: "계정관리 & 탈퇴",
        items: [
            {
                label: "회원탈퇴",
                href: "/b2b/mypage/withdraw",
            },

        ],
    },
];
