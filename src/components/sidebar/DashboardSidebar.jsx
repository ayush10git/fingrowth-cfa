"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BookCheck,
  ChartArea,
  FileSpreadsheet,
  LayoutDashboard,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const items = [
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: ChartArea,
  },
  {
    title: "Mock Analytics",
    url: "/dashboard/analytics/mock-analysis",
    icon: BookCheck,
  },
  {
    title: "Practice Analytics",
    url: "/dashboard/analytics/concept-analysis",
    icon: FileSpreadsheet,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname(); // Get the current path
  const { open } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="w-64 bg-[#8E6FD8] flex flex-col z-50"
    >
      <SidebarContent className="flex-grow">
        {/* Logo Section */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <div>
            <Image
              src="/logo.png"
              width={200}
              height={20}
              alt="Full Logo"
              className="transition-all duration-300"
            />
          </div>
        </SidebarGroup>
        <SidebarGroup className="hidden group-data-[collapsible=icon]:block">
          <div className="flex justify-center p-2">
            <Image
              src="/logo-short.png"
              width={40}
              height={40}
              alt="Short Logo"
              className="transition-all duration-300"
            />
          </div>
        </SidebarGroup>

        {/* Menu Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={`flex items-center justify-start group-data-[collapsible=icon]:justify-center my-1 ${
                      open ? "rounded-xl px-2 py-2" : "rounded-full p-2"
                    } ${
                      isActive
                        ? "bg-white text-[#8E6FD8] font-bold"
                        : "text-white"
                    }`}
                  >
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center space-x-2 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:space-x-0"
                      >
                        <item.icon
                          className={`w-6 h-6 ${
                            isActive ? "text-[#8E6FD8]" : "text-white"
                          }`}
                        />
                        <span
                          className={`transition-opacity group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:hidden ${
                            isActive ? "text-[#8E6FD8]" : "text-white"
                          }`}
                        >
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Trigger at Bottom Center */}
      <div className="flex justify-center items-center px-1 py-4">
        <SidebarTrigger className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#8E6FD8] hover:bg-[#F5F5F5] transition-all duration-300" />
      </div>
    </Sidebar>
  );
}
