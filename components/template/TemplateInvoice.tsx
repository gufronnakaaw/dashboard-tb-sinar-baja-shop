import { TransactionDetail } from "@/types/transactions.type";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { forwardRef } from "react";
import CardProductOrder from "../card/CardProductOrder";

const Invoice = (props: TransactionDetail, ref: any) => {
  return (
    <>
      <div
        className="grid divide-y-2 divide-dashed divide-foreground-200 px-4 pt-2"
        ref={ref}
      >
        <div className="flex items-start gap-8 pb-6">
          <div>
            <p className="mb-1 text-[12px] text-foreground-600">ID Pesanan</p>
            <h5 className="font-semibold text-foreground">
              {props.transaksi_id}
            </h5>
          </div>

          <div>
            <p className="mb-1 text-[12px] text-foreground-600">Pesanan Dari</p>
            <h5 className="font-semibold text-foreground">
              {props.nama_penerima}
            </h5>
          </div>

          {props.type == "pickup" ? (
            <div>
              <p className="mb-1 text-[12px] text-foreground-600">No Telepon</p>
              <h5 className="font-semibold text-foreground">
                {props.no_telpon}
              </h5>
            </div>
          ) : null}

          <div>
            <p className="mb-1 text-[12px] text-foreground-600">
              Waktu Pemesanan
            </p>
            <h5 className="font-semibold leading-tight text-foreground">
              {formatDate(props.created_at)}
            </h5>
          </div>
        </div>

        {props.type == "delivery" ? (
          <div className="py-6">
            <h4 className="mb-4 font-semibold text-foreground">
              Informasi Pengiriman
            </h4>
            <p className="mb-1 text-sm font-semibold text-foreground">
              {props.nama_penerima}
            </p>
            <p className="mb-1 text-sm text-foreground">{props.no_telpon}</p>
            <p className="mb-4 text-sm text-foreground">
              {props.alamat_lengkap},{" "}
              <span className="uppercase">
                {props.kecamatan}, {props.kota}, {props.provinsi},{" "}
                {props.kode_pos}
              </span>
            </p>
          </div>
        ) : null}

        <div className="grid gap-4 py-6">
          <h4 className="font-semibold text-foreground">Daftar Produk</h4>

          <div className="grid gap-2">
            {props.products.map((product) => {
              return <CardProductOrder key={product.kode_item} {...product} />;
            })}
          </div>
        </div>

        <div className="grid gap-1 py-6">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-foreground-600">
              Metode Pembayaran
            </p>
            <h6 className="text-sm font-semibold text-foreground">Transfer</h6>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-foreground-600">
              Jumlah Item
            </p>
            <h6 className="text-sm font-semibold text-foreground">
              {props.products.length} item
            </h6>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-foreground-600">
              Subtotal Produk
            </p>
            <h6 className="text-sm font-semibold text-foreground">
              {formatRupiah(props.subtotal_produk)}
            </h6>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-foreground-600">
              Subtotal Ongkir
            </p>
            <h6 className="text-sm font-semibold text-foreground">
              {formatRupiah(props.subtotal_ongkir)}
            </h6>
          </div>
        </div>

        <div className="grid gap-16 pt-6">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-foreground-600">Total</p>
            <h6 className="text-[22px] font-bold text-foreground">
              {formatRupiah(props.total)}
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export const TemplateInvoice = forwardRef(Invoice);
