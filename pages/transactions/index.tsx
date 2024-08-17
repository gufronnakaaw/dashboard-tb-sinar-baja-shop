import { transactions } from "@/_dummy/transactions";
import CardTransaction from "@/components/card/CardTransaction";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { Chip, Input, Tab, Tabs } from "@nextui-org/react";
import {
  CheckCircle,
  Clock,
  MagnifyingGlass,
  SealCheck,
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
    key: "waiting",
    label: "Menunggu",
    icon: <Clock weight="bold" size={20} />,
    notification: 0,
  },
  {
    id: 2,
    key: "not_paid",
    label: "Belum Bayar",
    icon: <Clock weight="bold" size={20} />,
    notification: 3,
  },
  {
    id: 3,
    key: "already_paid",
    label: "Sudah Bayar",
    icon: <CheckCircle weight="bold" size={20} />,
    notification: 7,
  },
  {
    id: 4,
    key: "finished",
    label: "Selesai",
    icon: <SealCheck weight="bold" size={20} />,
    notification: 10,
  },
  {
    id: 5,
    key: "canceled",
    label: "Dibatalkan",
    icon: <XCircle weight="bold" size={20} />,
    notification: 2,
  },
];

export default function TransactionsPage() {
  const router = useRouter();

  return (
    <Layout title="Transactions Page">
      <Container>
        <section className="mb-8 grid gap-8">
          <div className="grid gap-0.5">
            <h1 className="text-[22px] font-semibold text-foreground">
              Atur transaksi kamu 💸
            </h1>
            <p className="text-foreground-600">
              Pantau semua transakti yang masuk disini.
            </p>
          </div>

          <div className="grid gap-2">
            <Tabs
              aria-label="tab transactions"
              color="primary"
              size="sm"
              variant="underlined"
              classNames={{
                tabList: "gap-6 w-full relative rounded-none p-0",
                cursor: "w-full bg-[#059669]",
                tab: "max-w-fit px-0 h-12",
                tabContent:
                  "group-data-[selected=true]:text-[#059669] font-medium",
              }}
            >
              {tabTransaction.map((tab) => (
                <Tab
                  key={tab.id}
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
                  className="grid gap-4"
                >
                  <Input
                    type="text"
                    variant="flat"
                    color="default"
                    labelPlacement="outside"
                    placeholder="Cari transaksi..."
                    startContent={
                      <MagnifyingGlass
                        weight="bold"
                        size={20}
                        className="text-foreground-400"
                      />
                    }
                    classNames={{
                      base: "max-w-[450px]",
                      input: "text-sm placeholder:text-sm",
                    }}
                  />

                  <div className="grid gap-2">
                    {transactions.map((transaction) => (
                      <CardTransaction
                        key={transaction.id}
                        data={transaction}
                      />
                    ))}
                  </div>
                </Tab>
              ))}
            </Tabs>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
