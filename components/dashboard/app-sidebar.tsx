import type * as React from "react";

import { SearchForm } from "./search-form";
import { BranchSwitcher } from "./branch-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

// This is sample data.
const data = {
  branches: ["501", "123", "101"],
  navMain: [
    {
      title: "Employee Handbook",
      url: "#",
      items: [
        {
          title: "Onboarding",
          url: "#",
        },
        {
          title: "Severance Procedure",
          url: "#",
        },
      ],
    },
    {
      title: "Departments",
      url: "#",
      items: [
        {
          title: "Macrodata Refinement",
          url: "#",
        },
        {
          title: "Management",
          url: "#",
          isActive: true,
        },
        {
          title: "Optics & Design",
          url: "#",
        },
        {
          title: "Mind & Security",
          url: "#",
        },
        {
          title: "Wellness Center",
          url: "#",
        },
        {
          title: "O&D Handbook",
          url: "#",
        },
        {
          title: "Break Room",
          url: "#",
        },
        {
          title: "Perpetuity Wing",
          url: "#",
        },
        {
          title: "Board Protocols",
          url: "#",
        },
        {
          title: "Overtime Contingency",
          url: "#",
        },
        {
          title: "Security Measures",
          url: "#",
        },
        {
          title: "Kier Eagan Quotes",
          url: "#",
        },
      ],
    },
    {
      title: "Employee Resources",
      url: "#",
      items: [
        {
          title: "Incentives & Perks",
          url: "#",
        },
        {
          title: "Waffle Party Protocol",
          url: "#",
        },
        {
          title: "Music Dance Experience",
          url: "#",
        },
        {
          title: "Finger Traps",
          url: "#",
        },
        {
          title: "Wellness Sessions",
          url: "#",
        },
        {
          title: "Compliance Guidelines",
          url: "#",
        },
      ],
    },
    {
      title: "Restricted Access",
      url: "#",
      items: [
        {
          title: "Code Detectors",
          url: "#",
        },
        {
          title: "Reintegration Protocol",
          url: "#",
        },
        {
          title: "Outie Communication",
          url: "#",
        },
        {
          title: "Chip Maintenance",
          url: "#",
        },
        {
          title: "Emergency Procedures",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Image
          height={32}
          width={239}
          src="https://9xunyj9nbtcqjdrd.public.blob.vercel-storage.com/lumon-bnmDHU0WvLZp4fEIo7pYFRxdNkWHNi.png"
          alt="Logo"
          className="px-2 py-4"
        />
        <BranchSwitcher
          branches={data.branches}
          defaultBranch={data.branches[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
