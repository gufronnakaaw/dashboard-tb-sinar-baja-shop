import { TransactionsType } from "@/types/transactions.type";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { Chip } from "@nextui-org/react";
import { Bag, MapPin, SealCheck, Truck } from "@phosphor-icons/react";
import Link from "next/link";

export default function CardTransaction({ data }: { data: TransactionsType }) {
  return (
    <div
      className={`relative grid grid-cols-[2rem_1fr_repeat(2,160px)_230px] items-center justify-items-center gap-4 overflow-hidden rounded-xl border p-6 transition-all ${
        data.status == "selesai"
          ? "border-emerald-600"
          : "border-foreground-200 hover:border-emerald-600"
      }`}
    >
      {data.status == "selesai" ? (
        <div className="absolute left-0 top-0 h-full w-[6px] bg-emerald-600" />
      ) : null}

      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold ${
          data.status == "selesai"
            ? "bg-emerald-200 text-emerald-600"
            : "bg-foreground-200 text-foreground-600"
        }`}
      >
        {data.status == "selesai" ? (
          <SealCheck weight="fill" size={18} />
        ) : (
          <Bag weight="bold" size={18} />
        )}
      </div>

      <div className="justify-self-start">
        <Link
          href={`/transactions/${encodeURIComponent(data.transaksi_id)}`}
          className="text-sm font-semibold text-foreground hover:text-emerald-600"
        >
          Transaksi {data.transaksi_id}
        </Link>
        <p className="text-[12px] text-foreground-600">{data.nama_penerima}</p>
      </div>

      <div className="text-sm text-foreground">{formatRupiah(data.total)}</div>

      <Chip
        variant="flat"
        color="default"
        size="sm"
        startContent={
          data.type == "pickup" ? (
            <MapPin weight="bold" size={14} />
          ) : (
            <Truck weight="bold" size={14} />
          )
        }
        className="gap-1"
        classNames={{
          base: "px-2",
          content: "font-medium capitalize",
        }}
      >
        {data.type}
      </Chip>

      <div className="text-sm text-foreground">
        {formatDate(data.created_at)}
      </div>
    </div>
  );
}
