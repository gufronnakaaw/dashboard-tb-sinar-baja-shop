import { SuccessResponse } from "@/types/global.type";
import { Chip, Tab, Tabs } from "@nextui-org/react";
import {
  ClockClockwise,
  ClockCountdown,
  ClockUser,
  MagnifyingGlass,
  Money,
  SealCheck,
  SealQuestion,
  XCircle,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

type TabTransactionType = {
  id: number;
  key: string;
  label: string;
  icon: React.ReactNode;
  notification: number;
};

export type TransactionTab = {
  waitrep: number;
  waituser: number;
  paypend: number;
  payverif: number;
  process: number;
  done: number;
  canceled: number;
};

export default function TabsTransaction({ token }: { token: string }) {
  const router = useRouter();
  const { data, isLoading } = useSWR<SuccessResponse<TransactionTab>>({
    url: "/dashboard/transactions/tabs",
    method: "GET",
    token,
  });

  if (isLoading) {
    return;
  }

  const tabTransaction: TabTransactionType[] = [
    {
      id: 1,
      key: "waitrep",
      label: "Menunggu Balasan",
      icon: <ClockCountdown weight="bold" size={20} />,
      notification: data?.data.waitrep as number,
    },
    {
      id: 2,
      key: "waituser",
      label: "Menunggu Konfirmasi User",
      icon: <ClockUser weight="bold" size={20} />,
      notification: data?.data.waituser as number,
    },
    {
      id: 3,
      key: "paypend",
      label: "Belum Bayar",
      icon: <ClockClockwise weight="bold" size={20} />,
      notification: data?.data.paypend as number,
    },
    {
      id: 4,
      key: "payverif",
      label: "Verifikasi",
      icon: <SealQuestion weight="bold" size={20} />,
      notification: data?.data.payverif as number,
    },
    {
      id: 5,
      key: "process",
      label: "Diproses",
      icon: <Money weight="bold" size={20} />,
      notification: data?.data.process as number,
    },
    {
      id: 6,
      key: "done",
      label: "Selesai",
      icon: <SealCheck weight="bold" size={20} />,
      notification: data?.data.done as number,
    },
    {
      id: 7,
      key: "canceled",
      label: "Dibatalkan",
      icon: <XCircle weight="bold" size={20} />,
      notification: data?.data.canceled as number,
    },
    {
      id: 8,
      key: "search",
      label: "Cari",
      icon: <MagnifyingGlass weight="bold" size={20} />,
      notification: 0,
    },
  ];

  return (
    <Tabs
      aria-label="tab transactions"
      color="primary"
      size="sm"
      variant="underlined"
      classNames={{
        tabList: "gap-8 w-full relative rounded-none pb-3",
        cursor: "w-full bg-[#059669]",
        tab: "max-w-fit px-0 h-12",
        tabContent: "group-data-[selected=true]:text-[#059669] font-medium",
      }}
      onSelectionChange={(e) => {
        if (e == "search") {
          router.push(`/transactions/search`);
        } else {
          router.push(`/transactions?status=${e}`);
        }
      }}
    >
      {tabTransaction.map((tab) => (
        <Tab
          key={tab.key}
          title={
            <div className="flex items-center space-x-2">
              <>{tab.icon}</>
              <span>{tab.label}</span>
              {tab.notification < 1 ? null : (
                <Chip
                  size="sm"
                  variant="solid"
                  color="danger"
                  classNames={{
                    content: "font-medium",
                  }}
                >
                  {tab.notification > 9 ? "9+" : tab.notification}
                </Chip>
              )}
            </div>
          }
        ></Tab>
      ))}
    </Tabs>
  );
}
