import CardTransaction from "@/components/card/CardTransaction";
import TabsTransaction from "@/components/TabsTransaction";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { TransactionsType } from "@/types/transactions.type";
import { fetcher } from "@/utils/fetcher";
import { Input, ScrollShadow } from "@nextui-org/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function SearchPage({
  token,
  status,
  transactions,
  q,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 800);
  const router = useRouter();

  useEffect(() => {
    if (searchValue) {
      router.push({
        query: {
          status: "search",
          q: searchValue,
        },
      });
    } else {
      router.push({
        query: {
          status: "search",
          q,
        },
      });
    }
  }, [searchValue]);

  return (
    <Layout title="Search Page">
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
            <ScrollShadow
              orientation="horizontal"
              className="scrollbar-custom pr-12"
            >
              <TabsTransaction token={token} status={status} />
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
              onChange={(e) => setSearch(e.target.value)}
              defaultValue={q}
            />

            {transactions.length ? (
              <div className="grid gap-2">
                {transactions.map((item) => (
                  <CardTransaction key={item.transaksi_id} data={item} />
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ req, query }) => {
  const token = req.headers["access_token"] as string;
  const status = query?.status as string;
  const q = query?.q ? (query.q as string) : "";

  const result: SuccessResponse<TransactionsType[]> = await fetcher({
    url: `/dashboard/transactions?q=${encodeURIComponent(q as string)}`,
    method: "GET",
    token,
  });

  return {
    props: {
      token,
      status,
      transactions: result.data,
      q,
    },
  };
}) satisfies GetServerSideProps<{
  token: string;
  status: string;
  transactions: TransactionsType[];
  q: string;
}>;
