import ButtonSidebar from "@/components/button/ButtonSidebar";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  ArchiveBox,
  CaretRight,
  Circle,
  Gear,
  House,
  Image,
  ListBullets,
  MoneyWavy,
} from "@phosphor-icons/react";
import LinkNext from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface SidebarProps {
  sidebarOpen?: boolean;
}

export default function Sidebar({ sidebarOpen }: SidebarProps) {
  const router = useRouter();

  const [settingsActive, setSettingsActive] = useState<{
    trigger: string;
    title: string;
  }>({
    trigger: "",
    title: "",
  });

  const itemClasses = {
    base: "p-0 w-full",
    trigger:
      "py-2 px-3 h-10 rounded-xl flex gap-2 items-center hover:bg-foreground-200",
    title: "text-sm font-semibold text-foreground-600",
    content: "text-small",
  };

  useEffect(() => {
    setColor();

    function setColor() {
      const trigger = "bg-emerald-600 text-white hover:bg-emerald-600/90";
      const title = "text-white";

      if (
        router.pathname.startsWith("/settings") &&
        (router.pathname.includes("/settings/operational") ||
          router.pathname.includes("/settings/banks") ||
          router.pathname.includes("/settings/operators") ||
          router.pathname.includes("/settings/api"))
      ) {
        setSettingsActive({
          trigger,
          title,
        });
      }
    }
  }, [router]);

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
            label="Transaksi"
            path="/transactions?status=waitrep"
            icon={<MoneyWavy weight="bold" size={20} />}
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
            path="/banners"
            icon={<Image weight="bold" size={20} alt="icon banner" />}
          />

          <Accordion
            isCompact
            itemClasses={{
              ...itemClasses,
              trigger: `${itemClasses.trigger} ${settingsActive.trigger}`,
              title: `${itemClasses.title} ${settingsActive.title}`,
            }}
            className="p-0"
          >
            <AccordionItem
              aria-label="button"
              title="Pengaturan"
              indicator={
                <CaretRight
                  weight="bold"
                  size={16}
                  className={`${settingsActive.title ? settingsActive.title : "text-gray-600"}`}
                />
              }
              startContent={
                <Gear
                  weight="bold"
                  size={20}
                  className={`${settingsActive.title ? settingsActive.title : "text-gray-600"}`}
                />
              }
              className="grid gap-1"
            >
              <ButtonSidebar
                label="Operasional"
                path="/settings/operational"
                icon={<Circle weight="fill" size={6} />}
                className="mx-4"
              />

              <ButtonSidebar
                label="Nomor Rekening"
                path="/settings/banks"
                icon={<Circle weight="fill" size={6} />}
                className="mx-4"
              />

              <ButtonSidebar
                label="Operator"
                path="/settings/operators"
                icon={<Circle weight="fill" size={6} />}
                className="mx-4"
              />

              <ButtonSidebar
                label="API"
                path="/settings/api"
                icon={<Circle weight="fill" size={6} />}
                className="mx-4"
              />
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
