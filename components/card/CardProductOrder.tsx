import { formatRupiah } from "@/utils/formatRupiah";
import Image from "next/image";

export default function CardProductOrder() {
  return (
    <div className="grid grid-cols-[64px_1fr] items-center gap-2">
      <Image
        priority
        src="/img/product-img-1.webp"
        alt="image"
        width={500}
        height={500}
        className="h-[64px] w-[64px] rounded-lg"
      />

      <div className="grid grid-cols-[1fr_repeat(2,160px)] items-center gap-2">
        <div>
          <h4 className="mb-1 line-clamp-1 text-sm font-semibold text-foreground">
            Besi Beton KS (Krakatau Steel) 12mm Polos TP280
          </h4>
          <p className="text-[12px] text-foreground-600">Besi Baja</p>
        </div>

        <div className="justify-self-center text-sm text-foreground">
          2 x {formatRupiah(260000)}
        </div>

        <div className="justify-self-end text-sm font-semibold text-foreground">
          {formatRupiah(520000)}
        </div>
      </div>
    </div>
  );
}
