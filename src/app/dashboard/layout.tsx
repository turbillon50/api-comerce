import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { DashboardBoot } from "@/components/dashboard/Boot";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <DashboardBoot />
      <Topbar />
      <Sidebar />
      <div className="lg:pl-[280px] pt-16 pb-24 lg:pb-0 min-h-screen technical-grid">{children}</div>
    </div>
  );
}
