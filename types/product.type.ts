export type ProductType = {
  id: number;
  image: string;
  name: string;
  category: string;
  description: boolean;
};

export type ProductCategoryType = {
  id_kategori: string;
  nama: string;
  created_at: string;
  updated_at?: string;
};
