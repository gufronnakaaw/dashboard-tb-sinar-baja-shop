import CardProductOrder from "@/components/card/CardProductOrder";
import PopupPaymentProot from "@/components/popup/PopupPaymentProot";
import PopupShippingCost from "@/components/popup/PopupShippingCost";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button, Chip } from "@nextui-org/react";
import { ArrowLeft, Clock, MapTrifold, XCircle } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function TransactionDetailsPage() {
  const router = useRouter();

  return (
    <Layout title="Details Transaction #190720240901">
      <Container>
        <section className="mb-[100px] grid gap-8">
          <Button
            variant="bordered"
            color="default"
            size="sm"
            startContent={<ArrowLeft weight="bold" size={14} />}
            onClick={() => router.push("/transactions")}
            className="w-max font-medium"
          >
            Kembali
          </Button>

          <div className="grid h-screen grid-cols-[1fr_380px] items-start gap-8">
            <div className="grid divide-y-2 divide-dashed divide-foreground-200">
              <div className="flex items-start gap-8 pb-6">
                <div>
                  <p className="mb-1 text-[12px] text-foreground-600">
                    ID Pesanan
                  </p>
                  <h5 className="font-semibold text-foreground">
                    #190720240901
                  </h5>
                </div>

                <div>
                  <p className="mb-1 text-[12px] text-foreground-600">
                    Pesanan Dari
                  </p>
                  <h5 className="font-semibold text-foreground">
                    Fajar Fadillah Agustian
                  </h5>
                </div>

                <div>
                  <p className="mb-1 text-[12px] text-foreground-600">
                    Waktu Pemesanan
                  </p>
                  <h5 className="font-semibold leading-tight text-foreground">
                    3 Agustus 2024,{" "}
                    <span className="text-[12px]">10:42 WIB</span>
                  </h5>
                </div>
              </div>

              <div className="py-6">
                <div className="mb-4 flex items-end justify-between gap-2">
                  <h4 className="font-semibold text-foreground">
                    Informasi Pengiriman
                  </h4>

                  <Chip
                    variant="flat"
                    color="default"
                    size="sm"
                    startContent={<MapTrifold weight="bold" size={14} />}
                    className="gap-1"
                    classNames={{
                      base: "px-2",
                      content: "font-medium",
                    }}
                  >
                    Ambil Sendiri
                  </Chip>
                </div>
                <p className="mb-1 text-sm text-foreground">+6289123456789</p>
                <p className="mb-4 text-sm text-foreground">
                  Jl. Bukit Raya Persari, Blok. 12B, No.144C RT. 05/RW. 09, Kel.
                  Limo Kec. Limo, Kota Depok, Jawa Barat
                </p>
                <PopupShippingCost />
                <div className="mt-8 max-w-[600px] border-l-[4px] border-emerald-600 p-[6px_0_6px_16px] text-[12px]">
                  <strong>Catatan:</strong> Pembeli memilih metode pengiriman{" "}
                  <strong>Diantar</strong>. Harap anda atur biaya pengiriman
                  sesuai dengan jarak alamat pembeli. Pastikan nominal yang anda
                  masukan benar!
                </div>
              </div>

              <div className="grid gap-4 py-6">
                <h4 className="font-semibold text-foreground">Daftar Produk</h4>

                <div className="grid gap-2">
                  <CardProductOrder />
                  <CardProductOrder />
                  <CardProductOrder />
                </div>
              </div>

              <div className="grid gap-1 py-6">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground-600">
                    Transfer
                  </p>
                  <h6 className="text-sm font-semibold text-foreground">-</h6>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground-600">
                    Jumlah Barang
                  </p>
                  <h6 className="text-sm font-semibold text-foreground">
                    6 barang
                  </h6>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground-600">
                    Total Harga
                  </p>
                  <h6 className="text-sm font-semibold text-foreground">
                    {formatRupiah(1560000)}
                  </h6>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground-600">
                    Biaya Pengiriman
                  </p>
                  <h6 className="text-sm font-semibold text-foreground">
                    {formatRupiah(0)}
                  </h6>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-6">
                <p className="font-medium text-foreground-600">
                  Total Pembayaran
                </p>
                <h6 className="text-[22px] font-bold text-foreground">
                  {formatRupiah(1560000)}
                </h6>
              </div>
            </div>

            <div className="sticky top-0 divide-y-2 divide-dashed divide-foreground-200 py-4">
              <div className="pb-6">
                <h4 className="mb-2 font-semibold text-foreground">
                  Status Pembayaran
                </h4>
                <div className="mb-4 flex items-center justify-center gap-2 rounded-xl border-[2px] border-amber-500 bg-amber-600/20 p-2 text-sm font-semibold text-amber-500">
                  <Clock weight="bold" size={20} className="text-amber-500" />
                  Belum Dibayar
                </div>
                <p className="text-[12px] italic text-foreground-600">
                  <span className="font-semibold text-foreground">
                    Catatan:
                  </span>{" "}
                  Pembeli belum melakukan pembayaran sesuai nominal yang
                  tertera.
                </p>
              </div>

              <div className="pt-6">
                <div className="mb-2 flex items-center gap-2">
                  <h4 className="font-semibold text-foreground">
                    Verifikasi Pembayaran
                  </h4>

                  <XCircle
                    weight="fill"
                    size={22}
                    className="text-danger-600"
                  />
                </div>

                <PopupPaymentProot />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
