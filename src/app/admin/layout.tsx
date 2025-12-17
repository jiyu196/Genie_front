import AdminSidebar from "@/components/admin/AdminSideBar";

export default function B2BLayout({
                                      children,
                                  }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex bg-[#F4F6FF]">
                <AdminSidebar/>

            <div className="bg-[#F4F6FF] text-[#19344e]">
                <main className="flex-1 p-20">
                    {children}
                </main>
            </div>
        </div>
    );
}
