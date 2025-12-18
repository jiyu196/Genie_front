// components/b2b/B2BMenu
export const sidebarMenu = [
    {
        title: "기본정보",
        items: [
            {
                label: "기관 정보",
                href: "/b2b/dashboard/organization",
            },
        ],
    },
    {
        title: "학생관리",
        items: [
            {
                label: "Genie툰 학생계정 관리",
                href: "/b2b/dashboard/students",
            },
        ],
    },
    {
        title: "구독 & 결제",
        items: [
            {
                label: "구독 정보",
                href: "/b2b/dashboard/plan",
            },
            {
                label: "결제 내역",
                href: "/b2b/dashboard/plan#billing",
            },
        ],
    },
    {
        title: "계정관리 & 탈퇴",
        items: [
            {
                label: "비밀번호 변경",
                href: "/b2b/dashboard/settings/password",
            },
            {
                label: "회원 탈퇴",
                href: "/b2b/dashboard/settings/withdrawal",
            },
        ],
    },
];
