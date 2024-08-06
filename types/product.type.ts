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
export type ProductCategoryType = {
  id_kategori: string;
  nama: string;
  created_at: string;
  updated_at?: string;
};
