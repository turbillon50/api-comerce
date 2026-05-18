import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardBoot } from "@/components/dashboard/Boot";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bg">
      <DashboardBoot />
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">{children}</div>
    </div>
  );
}
