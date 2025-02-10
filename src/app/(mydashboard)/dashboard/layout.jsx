import { DashboardSidebar } from "@/components/sidebar/DashboardSidebar";
import "../../globals.css";
import { Roboto } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "@/components/navbar/Navbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
});

export default async function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-gray-50`}>
        <SidebarProvider defaultOpen={false}>
          <DashboardSidebar />
          <div className="">
            <Navbar />
            {children}
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
