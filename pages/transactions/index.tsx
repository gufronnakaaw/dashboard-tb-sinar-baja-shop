import { transactions } from "@/_dummy/transactions";
import CardTransaction from "@/components/card/CardTransaction";
import TabsTransaction from "@/components/TabsTransaction";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { Input, Pagination, ScrollShadow } from "@nextui-org/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/router";

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

          <div className="grid gap-4">
            <ScrollShadow orientation="horizontal">
              <TabsTransaction />
            </ScrollShadow>

            <Input
              type="text"
              variant="flat"
              color="default"
              labelPlacement="outside"
              placeholder="Cari ID Transaksi atau Nama Pembeli"
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
                <CardTransaction key={transaction.id} data={transaction} />
              ))}
            </div>

            <Pagination
              isCompact
              showControls
              page={1}
              total={5}
              className="justify-self-center"
              classNames={{
                cursor: "bg-emerald-600 text-white",
              }}
            />
          </div>
        </section>
      </Container>
    </Layout>
  );
}
