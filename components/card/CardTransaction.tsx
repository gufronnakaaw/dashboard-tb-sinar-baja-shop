import { formatRupiah } from "@/utils/formatRupiah";
import { Chip } from "@nextui-org/react";
import { MapTrifold } from "@phosphor-icons/react";
import Link from "next/link";

export default function CardTransaction() {
  return (
    <div className="grid grid-cols-[2rem_1fr_max-content_repeat(3,160px)_max-content] items-center justify-items-center gap-4 rounded-xl border border-foreground-200 p-6 transition-all hover:border-emerald-600">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground-200 font-semibold text-foreground-600">
        1
      </div>

      <div className="justify-self-start">
        <Link
          href="#"
          className="text-sm font-semibold text-foreground hover:text-emerald-600"
        >
          Transaksi #190720240901
        </Link>
        <p className="text-[12px] text-foreground-600">
          Fajar Fadillah Agustian
        </p>
      </div>

      <div className="text-sm text-foreground">320 item</div>

      <div className="text-sm text-foreground">{formatRupiah(43509182)}</div>

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

      <div className="text-sm text-foreground">20 Juli 2024, 10:00 WIB</div>

      <Chip
        variant="flat"
        color="success"
        size="sm"
        classNames={{
          base: "px-2",
          content: "font-medium",
        }}
      >
        Selesai
      </Chip>
    </div>
  );
}
