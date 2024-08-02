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
  { key: "latest", label: "Terlama" },
  { key: "high_price", label: "Harga Tertinggi" },
  { key: "low_price", label: "Harga Terendah" },
];

export const delivery: DeliveryType[] = [
  { key: "pickup", label: "Ambil Sendiri" },
  { key: "delivered", label: "Diantar" },
];
