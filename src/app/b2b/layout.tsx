// app/b2b/layout.tsx
import Header from "@/components/common/B2BHeader";
import B2BFooter from "@/components/common/B2BFooter";
import B2BHeader from "@/components/common/B2BHeader";

export default function B2BLayout({
                                      children,
                                  }: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-[#F4F6FF] text-[#19344e]">
            <B2BHeader />
            <main>{children}</main>
            <B2BFooter/>
        </div>
    );
}
