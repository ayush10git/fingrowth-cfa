import Image from "next/image";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Navbar = () => {
  return (
    <div className="relative z-40">
      <div className="hidden md:block lg:block">
        {/* Navbar content for larger screens, always visible */}
        <div className="flex items-center h-[70px] w-[calc(100vw-60px)] bg-white shadow-sm overflow-x-hidden fixed top-[0px] left-[60px]">
          <div className="flex w-full items-center justify-between gap-2 px-5">
            <div className="flex flex-col -gap-4">
              <span className="text-lg font-medium">Hello, Julia!</span>
              <span className="font-light text-sm">Welcome to Fingrowth</span>
            </div>
            <Image
              width={20}
              height={20}
              src="/avatar.png"
              className="w-10 h-10 object-contain rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
