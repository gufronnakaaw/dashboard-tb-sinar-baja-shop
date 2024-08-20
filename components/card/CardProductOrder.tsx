import { formatRupiah } from "@/utils/formatRupiah";

export default function CardProductOrder() {
  return (
    <div className="relative grid grid-cols-[1fr_repeat(2,160px)] items-center gap-2 pl-5 before:absolute before:left-0 before:top-[50%] before:h-1.5 before:w-1.5 before:rounded-full before:bg-emerald-600">
      <div>
        <h4 className="mb-[2px] text-sm font-medium text-foreground">
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
  );
}
