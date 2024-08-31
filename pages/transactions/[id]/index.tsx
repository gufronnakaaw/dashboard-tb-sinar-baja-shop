import CardProductOrder from "@/components/card/CardProductOrder";
import PopupPaymentProot from "@/components/popup/PopupPaymentProot";
import PopupShippingCost from "@/components/popup/PopupShippingCost";
import { TemplateInvoice } from "@/components/template/TemplateInvoice";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { TransactionDetail } from "@/types/transactions.type";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button, Checkbox } from "@nextui-org/react";
import {
  ArrowLeft,
  Check,
  Clock,
  MapPin,
  Printer,
  Truck,
  XCircle,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Toast from "react-hot-toast";
import { useReactToPrint } from "react-to-print";

export default function TransactionDetailsPage({
  transaction,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const router = useRouter();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  async function handleDone() {
    try {
      await fetcher({
        url: "/dashboard/transactions/done",
        method: "PATCH",
        token,
        data: {
          transaksi_id: transaction.transaksi_id,
          is_done: true,
        },
      });

      Toast.success("Update status berhasil");
      window.location.reload();
    } catch (error) {
      Toast.error("Update status gagal");
      console.log(error);
    }
  }

  return (
    <Layout title={`Detail Transaksi ${transaction.transaksi_id}`}>
      <Container>
        <section className="mb-16 grid gap-8">
          <div className="flex max-w-[calc(100%-412px)] items-center justify-between gap-2">
            <Button
              variant="bordered"
              color="default"
              size="sm"
              startContent={<ArrowLeft weight="bold" size={14} />}
              onClick={() => router.back()}
              className="w-max font-medium"
            >
              Kembali
            </Button>

            <Button
              variant="solid"
              size="sm"
              startContent={<Printer weight="bold" size={18} />}
              onClick={handlePrint}
              className="w-max bg-emerald-600 font-medium text-white"
            >
              Cetak Invoice
            </Button>
          </div>

          <div className="hidden">
            <TemplateInvoice ref={componentRef} {...transaction} />
          </div>

          <div className="grid min-h-screen grid-cols-[1fr_380px] items-start gap-8">
            <div className="grid divide-y-2 divide-dashed divide-foreground-200">
              <div className="flex items-start gap-8 pb-6">
                <div>
                  <p className="mb-1 text-[12px] text-foreground-600">
                    ID Pesanan
                  </p>
                  <h5 className="font-semibold text-foreground">
                    {transaction.transaksi_id}
                  </h5>
                </div>

                <div>
                  <p className="mb-1 text-[12px] text-foreground-600">
                    Pesanan Dari
                  </p>
                  <h5 className="font-semibold text-foreground">
                    {transaction.nama_penerima}
                  </h5>
                </div>

                {transaction.type == "pickup" ? (
                  <div>
                    <p className="mb-1 text-[12px] text-foreground-600">
                      No Telepon
                    </p>
                    <h5 className="font-semibold text-foreground">
                      {transaction.no_telpon}
                    </h5>
                  </div>
                ) : null}

                <div>
                  <p className="mb-1 text-[12px] text-foreground-600">
                    Waktu Pemesanan
                  </p>
                  <h5 className="font-semibold leading-tight text-foreground">
                    {formatDate(transaction.created_at)}
                  </h5>
                </div>
              </div>

              {transaction.type == "delivery" ? (
                <div className="py-6">
                  <h4 className="mb-4 font-semibold text-foreground">
                    Informasi Pengiriman
                  </h4>
                  <p className="mb-1 text-sm font-semibold text-foreground">
                    {transaction.nama_penerima}
                  </p>
                  <p className="mb-1 text-sm text-foreground">
                    {transaction.no_telpon}
                  </p>
                  <p className="mb-4 text-sm text-foreground">
                    {transaction.alamat_lengkap},{" "}
                    <span className="uppercase">
                      {transaction.kecamatan}, {transaction.kota},{" "}
                      {transaction.provinsi}, {transaction.kode_pos}
                    </span>
                  </p>
                </div>
              ) : null}

              <div className="grid gap-4 py-6">
                <h4 className="font-semibold text-foreground">Daftar Produk</h4>

                <div className="grid gap-3">
                  {transaction.products.map((product) => {
                    return (
                      <CardProductOrder key={product.kode_item} {...product} />
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-1 py-6">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground-600">
                    Metode Pembayaran
                  </p>
                  <h6 className="text-sm font-semibold capitalize text-foreground">
                    {transaction.payment.metode}
                  </h6>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground-600">
                    Jumlah Item
                  </p>
                  <h6 className="text-sm font-semibold text-foreground">
                    {transaction.products.length} item
                  </h6>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground-600">
                    Subtotal Produk
                  </p>
                  <h6 className="text-sm font-semibold text-foreground">
                    {formatRupiah(transaction.subtotal_produk)}
                  </h6>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground-600">
                    Subtotal Ongkir
                  </p>
                  <h6 className="text-sm font-semibold text-foreground">
                    {formatRupiah(transaction.subtotal_ongkir)}
                  </h6>
                </div>
              </div>

              <div className="grid gap-16 pt-6">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground-600">
                    Total
                  </p>
                  <h6 className="text-[22px] font-bold text-foreground">
                    {transaction.status == "Menunggu balasan" ||
                    transaction.status == "Menunggu konfirmasi user"
                      ? formatRupiah(
                          transaction.total + transaction.subtotal_ongkir,
                        )
                      : formatRupiah(transaction.total)}
                  </h6>
                </div>

                {transaction.status == "Diproses" ? (
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
                      onClick={handleDone}
                    >
                      Ya, selesaikan pesanan
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="sticky top-0 divide-y-2 divide-dashed divide-foreground-200 py-4">
              <div className="grid gap-6 pb-6">
                <div className="grid gap-4">
                  <div>
                    <h4 className="mb-1 text-sm font-semibold text-foreground">
                      Tipe Transaksi
                    </h4>

                    <div className="flex items-center justify-center gap-2 rounded-lg border-[2px] border-foreground-400 bg-foreground-600/20 p-[6px_16px] text-[12px] font-semibold text-foreground-600">
                      {transaction.type == "delivery" ? (
                        <>
                          <Truck
                            weight="bold"
                            size={18}
                            className="text-gray-600"
                          />
                          Delivery
                        </>
                      ) : (
                        <>
                          <MapPin
                            weight="bold"
                            size={18}
                            className="text-gray-600"
                          />
                          Pickup
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-1 text-sm font-semibold text-foreground">
                      Status
                    </h4>

                    <div className="flex items-center justify-center gap-2 rounded-lg border-[2px] border-amber-400 bg-amber-600/20 p-[6px_16px] text-[12px] font-semibold text-amber-500">
                      <Clock
                        weight="bold"
                        size={18}
                        className="text-amber-500"
                      />
                      {transaction.status}
                    </div>
                  </div>
                </div>

                {transaction.status == "Menunggu pembayaran" ? (
                  <div className="text-[12px] italic">
                    <p className="mb-1 font-semibold text-foreground">
                      Catatan :
                    </p>
                    <ol className="list-outside pl-3 font-medium text-foreground-600">
                      <li>
                        Pembeli belum melakukan pembayaran sesuai nominal yang
                        tertera.
                      </li>
                      {transaction.type == "delivery" ? (
                        <li>
                          Pembeli memilih metode pengiriman{" "}
                          <strong>Diantar</strong>. Harap anda atur biaya
                          pengiriman sesuai dengan jarak alamat pembeli.
                          Pastikan nominal yang anda masukan benar!
                        </li>
                      ) : null}
                    </ol>
                  </div>
                ) : null}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-6">
                {transaction.payment.status == "paid" ? (
                  <div className="grid gap-2">
                    <h4 className="flex items-center gap-1 text-xs font-semibold text-foreground">
                      Verifikasi Pembayaran{" "}
                      {transaction.payment.url ? (
                        <Check
                          weight="fill"
                          size={18}
                          className="text-success"
                        />
                      ) : (
                        <XCircle
                          weight="fill"
                          size={18}
                          className="text-danger-600"
                        />
                      )}
                    </h4>

                    <PopupPaymentProot
                      transaksi_id={transaction.transaksi_id}
                      token={token}
                      payment={transaction.payment}
                    />
                  </div>
                ) : null}

                {transaction.type == "delivery" ? (
                  <div className="grid gap-2">
                    <h4 className="flex items-center gap-1 text-xs font-semibold text-foreground">
                      Atur Biaya Pengiriman
                      {transaction.replied ? (
                        <Check
                          weight="fill"
                          size={18}
                          className="text-success"
                        />
                      ) : (
                        <XCircle
                          weight="fill"
                          size={18}
                          className="text-danger-600"
                        />
                      )}
                    </h4>

                    <PopupShippingCost
                      transaksi_id={transaction.transaksi_id}
                      token={token}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ req, params }) => {
  const token = req.headers["access_token"] as string;

  const response: SuccessResponse<TransactionDetail> = await fetcher({
    url: `/dashboard/transactions/detail/${encodeURIComponent(params?.id as string)}`,
    method: "GET",
    token,
  });

  return {
    props: {
      transaction: response.data,
      token,
    },
  };
}) satisfies GetServerSideProps<{
  transaction: TransactionDetail;
  token: string;
}>;
