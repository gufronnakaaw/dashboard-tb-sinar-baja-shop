import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { formatRupiah } from "@/utils/formatRupiah";
import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <Layout title="Dashboard Page">
      <Container>
        <section className="grid gap-8">
          <div className="grid gap-0.5">
            <h1 className="text-[22px] font-semibold text-foreground">
              Selamat Datang 👋, Admin
            </h1>
            <p className="text-foreground-600">
              Berikut rangkuman tokomu hari ini.
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
                  52
                </h6>
                <p className="text-sm font-medium text-foreground-600">
                  Potensi Pendapatan{" "}
                  <span className="font-semibold text-emerald-600">
                    {formatRupiah(302123000)}
                  </span>
                </p>
                <Link
                  href="/transactions?sort=newest"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600"
                >
                  Lihat Detail
                  <ArrowRight weight="bold" size={14} />
                </Link>
              </div>

              <div className="grid gap-1 pl-24">
                <p className="text-sm font-medium text-foreground-600">
                  Pengiriman "Diantar"
                </p>
                <h6 className="text-[32px] font-semibold text-foreground">
                  28
                </h6>
                <p className="text-sm font-medium text-foreground-600">
                  Potensi Pendapatan{" "}
                  <span className="font-semibold text-emerald-600">
                    {formatRupiah(29728000)}
                  </span>
                </p>
                <Link
                  href="/transactions?shipment=delivered"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600"
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
