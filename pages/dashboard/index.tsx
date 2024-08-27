import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { formatDayWithoutTime } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { ArrowRight } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function DashboardPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [time, setTime] = useState(new Date());
  const [client, setClient] = useState(false);

  const { data, isLoading } = useSWR<
    SuccessResponse<{
      transactions: {
        amount: number;
        total: number;
      };
      delivery: {
        amount: number;
        total: number;
      };
    }>
  >(
    { url: "/dashboard", method: "GET", token },
    {
      refreshInterval: 60000,
    },
  );

  useEffect(() => {
    setClient(true);

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (num: any) => String(num).padStart(2, "0");

  if (!client) {
    return;
  }

  if (isLoading) {
    return;
  }

  return (
    <Layout title="Dashboard Page">
      <Container>
        <section className="grid gap-8">
          <div className="grid gap-0.5">
            <h1 className="text-[22px] font-semibold text-foreground">
              Selamat Datang, Admin 👋
            </h1>
            <p className="text-foreground-600">
              Berikut rangkuman tokomu{" "}
              <span className="font-semibold text-foreground">
                {formatDayWithoutTime(new Date())}{" "}
                {`${formatTime(time.getHours())}:${formatTime(time.getMinutes())}:${formatTime(time.getSeconds())}`}
              </span>
            </p>
          </div>

          <div className="grid gap-6 rounded-xl border-[2px] border-foreground-200 px-16 py-6">
            <h4 className="font-semibold text-foreground">Ringkasan Pesanan</h4>

            <div className="grid grid-cols-2 divide-x-2 divide-foreground-200">
              <div className="grid gap-1 pr-24">
                <p className="text-sm font-medium text-foreground-600">
                  Pesanan Baru
                </p>
                <h6 className="text-[32px] font-semibold text-foreground">
                  {data?.data.transactions.amount}
                </h6>
                <p className="text-sm font-medium text-foreground-600">
                  Potensi Pendapatan{" "}
                  <span className="font-semibold text-emerald-600">
                    {formatRupiah(data?.data.transactions.total as number)}
                  </span>
                </p>
                <Link
                  href="/transactions?sort=newest"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("dalam proses pengembangan");
                  }}
                >
                  Lihat Detail
                  <ArrowRight weight="bold" size={14} />
                </Link>
              </div>

              <div className="grid gap-1 pl-24">
                <p className="text-sm font-medium text-foreground-600">
                  Pengiriman Diantar
                </p>
                <h6 className="text-[32px] font-semibold text-foreground">
                  {data?.data.delivery.amount}
                </h6>
                <p className="text-sm font-medium text-foreground-600">
                  Potensi Pendapatan{" "}
                  <span className="font-semibold text-emerald-600">
                    {formatRupiah(data?.data.delivery.total as number)}
                  </span>
                </p>
                <Link
                  href="/transactions?shipment=delivered"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("dalam proses pengembangan");
                  }}
                >
                  Lihat Detail
                  <ArrowRight weight="bold" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ req }) => {
  return {
    props: {
      token: req.headers["access_token"] as string,
    },
  };
}) satisfies GetServerSideProps<{ token: string }>;
