import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { List, SignOut } from "@phosphor-icons/react";
import { signOut, useSession } from "next-auth/react";
import React from "react";

interface NavbarProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
  const { data, status } = useSession();
  const toggleSidebar = () => {
    if (setSidebarOpen) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <nav className="bg-white px-6">
      <div className="flex h-20 items-center justify-between xl:justify-end">
        <Button
          isIconOnly
          aria-label="menu list mobile view button"
          variant="bordered"
          size="sm"
          radius="md"
          color="default"
          onClick={toggleSidebar}
          className="z-50 bg-white xl:hidden"
        >
          <List weight="bold" size={16} className="text-foreground" />
        </Button>

        <Dropdown>
          <DropdownTrigger>
            <div className="inline-flex items-center gap-2 hover:cursor-pointer">
              <Avatar
                isBordered
                showFallback
                size="sm"
                src="https://images.unsplash.com/broken"
                classNames={{
                  base: "bg-emerald-600 text-white ring-emerald-600",
                }}
              />

              <div className="-space-y-1">
                <h6 className="mb-1 text-sm font-bold capitalize text-foreground">
                  {status == "authenticated" ? data.user.nama : null}
                </h6>
                <p className="text-[12px] font-medium uppercase text-foreground-500">
                  TB. SINAR BAJA
                </p>
              </div>
            </div>
          </DropdownTrigger>

          <DropdownMenu aria-label="profile actions">
            <DropdownSection
              aria-label="danger zone section"
              title="Anda Yakin?"
            >
              <DropdownItem
                key="logout"
                color="danger"
                startContent={<SignOut weight="bold" size={18} />}
                onClick={() => {
                  if (confirm("Apakah anda yakin?")) {
                    return signOut({
                      callbackUrl: "/",
                    });
                  }
                }}
                className="font-bold text-danger-600"
              >
                Keluar
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
}
