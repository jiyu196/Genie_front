import AdminSidebar from "@/components/admin/AdminSideBar";
import AdminGate from "@/components/admin/AdminGate";

export default function B2BLayout({
                                      children,
                                  }: {
    children: React.ReactNode;
}) {
    return (
        <AdminGate>
            <div className="min-h-screen flex bg-[#F4F6FF]">
                <AdminSidebar />

                <div className="flex-1 bg-[#F4F6FF] text-[#19344e]">
                    <main className="p-20">
                        {children}
                    </main>
                </div>
            </div>
        </AdminGate>
    );
}
