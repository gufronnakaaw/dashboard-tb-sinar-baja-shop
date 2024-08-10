import { TransactionsType } from "@/types/transactions.type";

export const transactions: TransactionsType[] = [
  {
    id: 1,
    orders_name: "Fajar Fadillah Agustian",
    amount_order: 2,
    total_payment: 43509182,
    date_order: "31 September 2024, 10:11",
    delivery: "ambil sendiri",
    status: "selesai",
  },
  {
    id: 2,
    orders_name: "Gufronnaka Arif Wildan",
    amount_order: 4,
    total_payment: 987000,
    date_order: "29 September 2024, 13:28",
    delivery: "diantar",
    status: "sudah bayar",
  },
  {
    id: 3,
    orders_name: "Ahmad Zulfikar",
    amount_order: 6,
    total_payment: 19027500,
    date_order: "26 September 2024, 08:18",
    delivery: "ambil sendiri",
    status: "belum bayar",
  },
];
