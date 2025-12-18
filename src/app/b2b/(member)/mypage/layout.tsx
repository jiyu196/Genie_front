// app/b2b/(member)/layout.tsx
import Sidebar from "@/components/b2b/SideBar";
export default async function MemberLayout({ children }: { children: React.ReactNode}) {
    // const session = await getSession(); // 나중에 붙일 것

    return (
        <div className="min-h-screen flex">
            <aside>사이드바</aside>
            <Sidebar/>

            <main className="flex-1">
                {/*<header className="h-14 flex items-center justify-end px-6 border-b">*/}
                {/*    <span className="text-sm text-gray-600">*/}
                {/*        {session?.organizationName} 님*/}
                {/*    </span>*/}
                {/*</header>*/}

                {children}
            </main>
        </div>
    );
}



