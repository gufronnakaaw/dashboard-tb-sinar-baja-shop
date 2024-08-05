export type SortingType = {
  key: string;
  label: string;
};

export type DeliveryType = {
  key: string;
  label: string;
};

export const sorting: SortingType[] = [
  { key: "newest", label: "Terbaru" },
  { key: "not_yet_paid", label: "Belum Bayar" },
  { key: "already_paid", label: "Sudah Bayar" },
  { key: "done", label: "Selesai" },
];

export const delivery: DeliveryType[] = [
  { key: "pickup", label: "Ambil Sendiri" },
  { key: "delivered", label: "Diantar" },
];
