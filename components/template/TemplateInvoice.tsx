import { formatRupiah } from "@/utils/formatRupiah";
import { forwardRef } from "react";
import CardProductOrder from "../card/CardProductOrder";

const Invoice = (props: any, ref: any) => {
  return (
    <>
      <div
        className="grid divide-y-2 divide-dashed divide-foreground-200 px-4 pt-2"
        ref={ref}
      >
        <div className="flex items-start gap-8 pb-6">
          <div>
            <p className="mb-1 text-[12px] text-foreground-600">ID Pesanan</p>
            <h5 className="font-semibold text-foreground">#190720240901</h5>
          </div>

          <div>
            <p className="mb-1 text-[12px] text-foreground-600">Pesanan Dari</p>
            <h5 className="font-semibold text-foreground">
              Fajar Fadillah Agustian
            </h5>
          </div>

          <div>
            <p className="mb-1 text-[12px] text-foreground-600">
              Waktu Pemesanan
            </p>
            <h5 className="font-semibold leading-tight text-foreground">
              3 Agustus 2024, <span className="text-[12px]">10:42 WIB</span>
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
            Jl. Bukit Raya Persari, Blok. 12B, No.144C RT. 05/RW. 09, Kel. Limo
            Kec. Limo, Kota Depok, Jawa Barat
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
            <h6 className="text-sm font-semibold text-foreground">Transfer</h6>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-foreground-600">
              Jumlah Item
            </p>
            <h6 className="text-sm font-semibold text-foreground">6 item</h6>
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
            <p className="text-sm font-medium text-foreground-600">Subtotal</p>
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
        </div>
      </div>
    </>
  );
};

export const TemplateInvoice = forwardRef(Invoice);
