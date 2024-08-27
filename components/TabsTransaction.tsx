import { Chip, Tab, Tabs } from "@nextui-org/react";
import {
  ClockClockwise,
  ClockCountdown,
  ClockUser,
  Money,
  SealCheck,
  SealQuestion,
  XCircle,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";
import React from "react";

type TabTransactionType = {
  id: number;
  key: string;
  label: string;
  icon: React.ReactNode;
  notification: number;
};

const tabTransaction: TabTransactionType[] = [
  {
    id: 1,
    key: "waiting-reply",
    label: "Menunggu Balasan",
    icon: <ClockCountdown weight="bold" size={20} />,
    notification: 0,
  },
  {
    id: 2,
    key: "waiting-user-reply",
    label: "Menunggu Balasan User",
    icon: <ClockUser weight="bold" size={20} />,
    notification: 4,
  },
  {
    id: 3,
    key: "not_paid",
    label: "Belum Bayar",
    icon: <ClockClockwise weight="bold" size={20} />,
    notification: 3,
  },
  {
    id: 4,
    key: "verification",
    label: "Verifikasi",
    icon: <SealQuestion weight="bold" size={20} />,
    notification: 7,
  },
  {
    id: 5,
    key: "already_paid",
    label: "Sudah Bayar",
    icon: <Money weight="bold" size={20} />,
    notification: 12,
  },
  {
    id: 6,
    key: "finished",
    label: "Selesai",
    icon: <SealCheck weight="bold" size={20} />,
    notification: 10,
  },
  {
    id: 7,
    key: "canceled",
    label: "Dibatalkan",
    icon: <XCircle weight="bold" size={20} />,
    notification: 2,
  },
];

export default function TabsTransaction() {
  const router = useRouter();

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
      onSelectionChange={(e) => router.push(`/transactions?status=${e}`)}
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
