import { ProductDetail } from "@/types/transactions.type";
import { formatRupiah } from "@/utils/formatRupiah";

export default function CardProductOrder(props: ProductDetail) {
  return (
    <div className="relative grid grid-cols-[1fr_repeat(2,160px)] items-center gap-2 pl-5 before:absolute before:left-0 before:top-[50%] before:h-1.5 before:w-1.5 before:rounded-full before:bg-emerald-600">
      <div>
        <h4 className="mb-[2px] text-sm font-medium text-foreground">
          {props.nama_produk}
        </h4>
      </div>

      <div className="justify-self-center text-sm text-foreground">
        {props.quantity} x {formatRupiah(props.harga)}
      </div>

      <div className="justify-self-end text-sm font-semibold text-foreground">
        {formatRupiah(props.subtotal_produk)}
      </div>
    </div>
  );
}
