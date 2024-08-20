import CardProductOrder from "@/components/card/CardProductOrder";
import PopupPaymentProot from "@/components/popup/PopupPaymentProot";
import PopupShippingCost from "@/components/popup/PopupShippingCost";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button, Checkbox } from "@nextui-org/react";
import {
  ArrowLeft,
  Check,
  Clock,
  Invoice,
  MapPin,
  Truck,
  XCircle,
} from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function TransactionDetailsPage() {
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const router = useRouter();

  return (
    <Layout title="Details Transaction #190720240901">
      <Container>
        <section className="mb-16 grid gap-8">
          <div className="flex max-w-[calc(100%-412px)] items-center justify-between gap-2">
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

            <Button
              variant="solid"
              size="sm"
              startContent={<Invoice weight="bold" size={18} />}
              onClick={() => router.push("/transactions/190720240901/invoice")}
              className="w-max bg-emerald-600 font-medium text-white"
            >
              Lihat Invoice
            </Button>
          </div>

          <div className="grid min-h-screen grid-cols-[1fr_380px] items-start gap-8">
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

              <div className="py-4">
                <div className="mb-4 flex items-end justify-between gap-2">
                  <h4 className="font-semibold text-foreground">
                    Informasi Pengiriman
                  </h4>
                </div>
                <p className="mb-1 text-sm text-foreground">+6289123456789</p>
                <p className="mb-4 text-sm text-foreground">
                  Jl. Bukit Raya Persari, Blok. 12B, No.144C RT. 05/RW. 09, Kel.
                  Limo Kec. Limo, Kota Depok, Jawa Barat
                </p>
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
                    Metode Pembayaran
                  </p>
                  <h6 className="text-sm font-semibold text-foreground">
                    Transfer
                  </h6>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground-600">
                    Jumlah Item
                  </p>
                  <h6 className="text-sm font-semibold text-foreground">
                    6 item
                  </h6>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground-600">
                    Biaya Pengiriman
                  </p>
                  <h6 className="text-sm font-semibold text-foreground">
                    {formatRupiah(50000)}
                  </h6>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground-600">
                    Subtotal
                  </p>
                  <h6 className="text-sm font-semibold text-foreground">
                    {formatRupiah(150000)}
                  </h6>
                </div>
              </div>

              <div className="grid gap-16 pt-6">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground-600">
                    Total Pembayaran
                  </p>
                  <h6 className="text-[22px] font-bold text-foreground">
                    {formatRupiah(200000)}
                  </h6>
                </div>

                <div className="grid gap-3">
                  <Checkbox
                    color="default"
                    isSelected={isOrderCompleted}
                    onValueChange={setIsOrderCompleted}
                    classNames={{
                      label: "text-[12px] font-medium text-foreground-600",
                    }}
                  >
                    Saya ingin menyelesaikan pesanan!
                  </Checkbox>

                  <Button
                    isDisabled={isOrderCompleted ? false : true}
                    variant="solid"
                    startContent={<Check weight="bold" size={18} />}
                    className={`font-medium ${isOrderCompleted ? "bg-emerald-600 text-white" : "bg-foreground-200 text-foreground-600"}`}
                  >
                    Ya, selesaikan pesanan
                  </Button>
                </div>
              </div>
            </div>

            <div className="sticky top-0 divide-y-2 divide-dashed divide-foreground-200 py-4">
              <div className="pb-6">
                <h4 className="mb-2 font-semibold text-foreground">
                  Metode Transaksi
                </h4>

                <div className="mb-4 flex items-center justify-center gap-2 rounded-xl border-gray-500 bg-gray-600/20 p-2 text-sm font-semibold text-gray-500">
                  {true ? (
                    <>
                      <Truck
                        weight="bold"
                        size={20}
                        className="text-gray-500"
                      />
                      Delivery
                    </>
                  ) : (
                    <>
                      <MapPin
                        weight="bold"
                        size={20}
                        className="text-gray-500"
                      />
                      Pickup
                    </>
                  )}
                </div>

                <h4 className="mb-2 font-semibold text-foreground">
                  Status Pembayaran
                </h4>

                <div className="mb-4 flex items-center justify-center gap-2 rounded-xl border-[2px] border-amber-500 bg-amber-600/20 p-2 text-sm font-semibold text-amber-500">
                  <Clock weight="bold" size={20} className="text-amber-500" />
                  Belum Dibayar
                </div>

                <p className="text-[13px] font-semibold italic text-foreground-600">
                  Catatan :
                </p>
                <ol className="text-[13px] font-semibold italic text-foreground-600">
                  <li>
                    Pembeli belum melakukan pembayaran sesuai nominal yang
                    tertera.
                  </li>
                  <li>
                    Pembeli memilih metode pengiriman <strong>Diantar</strong>.
                    Harap anda atur biaya pengiriman sesuai dengan jarak alamat
                    pembeli. Pastikan nominal yang anda masukan benar!
                  </li>
                </ol>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-6">
                <div className="flex flex-col gap-2">
                  <h4 className="flex items-center gap-1 text-xs font-semibold text-foreground">
                    Verifikasi Pembayaran{" "}
                    <XCircle
                      weight="fill"
                      size={22}
                      className="text-danger-600"
                    />
                  </h4>

                  <PopupPaymentProot />
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="flex items-center gap-1 text-xs font-semibold text-foreground">
                    Atur Biaya Pengiriman
                    <XCircle
                      weight="fill"
                      size={22}
                      className="text-danger-600"
                    />
                  </h4>

                  <PopupShippingCost />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
