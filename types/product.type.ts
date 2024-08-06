export type ProductType = {
  id: number;
  image: string;
  name: string;
  category: string;
  description: boolean;
};

export type DashboardProduct = {
  kode_item: string;
  slug: string;
  nama_produk_asli: string;
  kategori: string;
  harga_6: number;
  total_stok: number;
  image: { url: string }[];
  deskripsi: string;
};