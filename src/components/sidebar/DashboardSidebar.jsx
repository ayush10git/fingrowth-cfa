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
  ChevronDown,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const items = [
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: ChartArea,
    subItems: [
      {
        title: "Overall Analytics",
        url: "/dashboard/analytics",
      },
      {
        title: "Mock Analytics",
        url: "/dashboard/analytics/mock-analysis",
      },
      {
        title: "Practice Analytics",
        url: "/dashboard/analytics/concept-analysis",
      },
    ],
  },
  {
    title: "Mock Test",
    url: "/dashboard/mocktest",
    icon: BookCheck,
  },
  {
    title: "Practice",
    url: "/dashboard/practice",
    icon: FileSpreadsheet,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname(); // Get the current path
  const { open } = useSidebar();
  const [expanded, setExpanded] = useState(false); // For toggling submenus

  return (
    <Sidebar
      collapsible="icon"
      className="w-64 bg-[#8E6FD8] flex flex-col z-50"
    >
      <SidebarContent className="flex-grow">
        {/* Logo Section */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <div className="">
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
                const isActive = pathname.startsWith(item.url); // Check if the path starts with the item's URL

                return (
                  <div key={item.title}>
                    <SidebarMenuItem
                      className={`flex items-center justify-start group-data-[collapsible=icon]:justify-center my-1 ${
                        open ? "rounded-xl px-2 py-2" : "rounded-full p-2"
                      } ${
                        isActive
                          ? "bg-white text-[#8E6FD8]" // Active styles
                          : "text-white" // Default styles
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
                            }`} // Icon color based on active state
                          />
                          <span
                            className={`transition-opacity group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:hidden ${
                              isActive ? "text-[#8E6FD8]" : "text-white"
                            }`} // Text color based on active state
                          >
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                      {item.subItems && open && (
                        <button
                          onClick={() => setExpanded((prev) => !prev)}
                          className="ml-auto text-white"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform text-[#8E6FD8] ${
                              expanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </SidebarMenuItem>
                    {item.subItems && expanded && open && (
                      <div className="ml-8">
                        {item.subItems.map((subItem) => {
                          const isSubActive = pathname === subItem.url; // Check if the current path matches the submenu item's URL
                          return (
                            <SidebarMenuItem
                              key={subItem.title}
                              className={`flex items-center my-1 ${
                                isSubActive
                                  ? "text-[#ffffff] underline" // Add underline if active
                                  : "text-white"
                              }`}
                            >
                              <SidebarMenuButton asChild>
                                <a href={subItem.url}>{subItem.title}</a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                        })}
                      </div>
                    )}
                  </div>
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
