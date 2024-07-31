import ButtonSidebar from "@/components/button/ButtonSidebar";
import { House } from "@phosphor-icons/react";
import Link from "next/link";

interface SidebarProps {
  sidebarOpen?: boolean;
}

export default function Sidebar({ sidebarOpen }: SidebarProps) {
  return (
    <div
      className={`fixed top-0 z-40 grid h-screen min-w-[250px] grid-rows-[24px_1fr] gap-[30px] border-r border-gray-100 bg-gray-50 px-[20px] py-[30px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-all duration-500 xl:static xl:shadow-none ${
        sidebarOpen ? "left-0" : "-left-full"
      }`}
    >
      <Link
        href="/"
        className="inline-flex w-max items-center gap-2 justify-self-end xl:justify-self-center"
      >
        <div className="h-6 w-6 rounded-full bg-secondary" />

        <div className="font-bold text-foreground">TB. SINAR BAJA</div>
      </Link>

      <div className="flex flex-1 flex-col overflow-y-scroll scrollbar-hide">
        <div className="grid gap-5">
          <ButtonSidebar
            label="Dashboard"
            path="/owner/dashboard"
            icon={<House weight="bold" size={20} />}
          />
        </div>
      </div>
    </div>
  );
}
