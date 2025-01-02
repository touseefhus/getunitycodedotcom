import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex flex justify-content-center">
                {/* Sidebar */}
                <AppSidebar />

                {/* Main Content */}
                <main className="flex-1 p-4">{children}</main>
            </div>
        </SidebarProvider>
    );
}
