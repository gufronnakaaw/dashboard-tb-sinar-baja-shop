import CardTransaction from "@/components/card/CardTransaction";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { delivery, sorting } from "@/utils/filterDataMap";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Funnel, MagnifyingGlass, SortAscending } from "@phosphor-icons/react";

export default function TransactionsPage() {
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

          <div className="grid">
            <div className="sticky top-0 z-10 flex items-end justify-between gap-2 bg-white pb-4">
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

              <div className="flex w-max items-center gap-2">
                <Select
                  aria-label="sorting"
                  variant="flat"
                  color="default"
                  labelPlacement="outside"
                  placeholder="Urutkan"
                  startContent={
                    <SortAscending
                      weight="bold"
                      size={20}
                      className="text-foreground"
                    />
                  }
                  items={sorting}
                  classNames={{
                    base: "w-[170px]",
                    value: "text-foreground",
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.key}>{item.label}</SelectItem>
                  )}
                </Select>

                <Select
                  aria-label="delivery"
                  variant="flat"
                  color="default"
                  labelPlacement="outside"
                  placeholder="Pengiriman"
                  startContent={
                    <Funnel
                      weight="bold"
                      size={20}
                      className="text-foreground"
                    />
                  }
                  items={delivery}
                  classNames={{
                    base: "w-[170px]",
                    value: "text-foreground",
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.key}>{item.label}</SelectItem>
                  )}
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <CardTransaction />
              <CardTransaction />
              <CardTransaction />
              <CardTransaction />
              <CardTransaction />
              <CardTransaction />
              <CardTransaction />
              <CardTransaction />
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
