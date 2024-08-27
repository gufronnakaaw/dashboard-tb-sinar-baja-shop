import CardTransaction from "@/components/card/CardTransaction";
import TabsTransaction from "@/components/TabsTransaction";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { TransactionsType } from "@/types/transactions.type";
import { Pagination, ScrollShadow } from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function TransactionsPage({
  token,
  status,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [page, setPage] = useState(1);

  const url = `/dashboard/transactions?status=${status}&page=${page}`;

  const { data, isLoading } = useSWR<
    SuccessResponse<{ transactions: TransactionsType[]; total: number }>
  >({
    url,
    method: "GET",
    token,
  });
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
            <ScrollShadow
              orientation="horizontal"
              className="scrollbar-custom pr-12"
            >
              <TabsTransaction token={token} />
            </ScrollShadow>

            {!isLoading ? (
              <>
                <div className="grid gap-2">
                  {data?.data.transactions.map((item) => (
                    <CardTransaction key={item.transaksi_id} data={item} />
                  ))}
                </div>

                {data?.data.total ? (
                  <Pagination
                    isCompact
                    showControls
                    page={page}
                    total={Math.ceil(
                      ((data?.data.total as number) / 5) as number,
                    )}
                    onChange={setPage}
                    className="justify-self-center"
                    classNames={{
                      cursor: "bg-emerald-600 text-white",
                    }}
                  />
                ) : null}
              </>
            ) : null}
          </div>
        </section>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ req, query }) => {
  const status = query?.status as string;

  return {
    props: {
      token: req.headers["access_token"] as string,
      status,
    },
  };
}) satisfies GetServerSideProps<{ token: string; status: string }>;
