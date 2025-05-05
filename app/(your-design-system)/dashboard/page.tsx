import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { ChartSection } from "@/components/dashboard/chart-section";
import { DepartmentTable } from "@/components/dashboard/department-table";
import { DashboardHeader } from "@/components/dashboard/header";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-6 p-4 md:gap-8">
          <StatsCards />
          {/* Chart and Recent Activity */}
          <div className="grid gap-6 md:grid-cols-7">
            <ChartSection />
            <RecentActivity />
          </div>
          <DepartmentTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
