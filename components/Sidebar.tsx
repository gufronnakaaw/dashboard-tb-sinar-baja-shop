import ButtonSidebar from "@/components/button/ButtonSidebar";
import {
  Alarm,
  ArchiveBox,
  House,
  Image,
  Link,
  ListBullets,
  MoneyWavy,
} from "@phosphor-icons/react";
import LinkNext from "next/link";

interface SidebarProps {
  sidebarOpen?: boolean;
}

export default function Sidebar({ sidebarOpen }: SidebarProps) {
  return (
    <div
      className={`fixed top-0 z-40 grid h-screen min-w-[250px] grid-rows-[24px_1fr] gap-[30px] border-r border-foreground-100 bg-foreground-50 px-[20px] py-[30px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-all duration-500 xl:static xl:shadow-none ${
        sidebarOpen ? "left-0" : "-left-full"
      }`}
    >
      <LinkNext
        href="/"
        className="inline-flex w-max items-center gap-2 justify-self-end xl:justify-self-center"
      >
        <div className="h-6 w-6 rounded-full bg-emerald-600" />

        <div className="font-bold text-foreground">TB. SINAR BAJA</div>
      </LinkNext>

      <div className="flex flex-1 flex-col overflow-y-scroll scrollbar-hide">
        <div className="grid gap-1">
          <ButtonSidebar
            label="Dashboard"
            path="/dashboard"
            icon={<House weight="bold" size={20} />}
          />

          <ButtonSidebar
            label="Produk"
            path="/products"
            icon={<ArchiveBox weight="bold" size={20} />}
          />

          <ButtonSidebar
            label="Kategori"
            path="/categories"
            icon={<ListBullets weight="bold" size={20} />}
          />

          <ButtonSidebar
            label="Banner"
            path="/banner"
            icon={<Image weight="bold" size={20} alt="icon banner" />}
          />

          <ButtonSidebar
            label="Transaksi"
            path="/transactions"
            icon={<MoneyWavy weight="bold" size={20} />}
          />

          <ButtonSidebar
            label="Operasional"
            path="/operational"
            icon={<Alarm weight="bold" size={20} />}
          />

          <ButtonSidebar
            label="Pull"
            path="/pulls"
            icon={<Link weight="bold" size={20} />}
          />
        </div>
      </div>
    </div>
  );
}
