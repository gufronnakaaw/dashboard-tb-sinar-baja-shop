import LoadingSync from "@/components/LoadingSync";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { ProductCategoryType } from "@/types/product.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ArrowsCounterClockwise } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useState } from "react";
import Toast from "react-hot-toast";
import useSWR from "swr";

export default function CategoriesPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loadingSync, setLoadingSync] = useState(false);

  const { data, isLoading, mutate } = useSWR<
    SuccessResponse<{
      categories: ProductCategoryType[];
      last_synchronized: string;
    }>
  >({ url: "/dashboard/categories", method: "GET", token });

  const columnsKategori = [
    { name: "Nama", uid: "nama" },
    { name: "Disinkron Pada", uid: "updated_at" },
  ];

  function renderCellCategory(
    category: ProductCategoryType,
    columnKey: React.Key,
  ) {
    const cellValue = category[columnKey as keyof ProductCategoryType];

    switch (columnKey) {
      case "nama":
        return <div className="w-max text-foreground">{category.nama}</div>;
      case "updated_at":
        return (
          <div className="w-max text-foreground">
            {formatDate(category.updated_at)}
          </div>
        );

      default:
        return cellValue;
    }
  }

  async function handleSyncCategories() {
    setLoadingSync(true);

    try {
      await fetcher({
        url: "/dashboard/sync/categories",
        method: "POST",
        token,
      });

      Toast.success("Sinkron kategori berhasil");
      mutate();
      setLoadingSync(false);
    } catch (error) {
      setLoadingSync(false);
      Toast.error("Sinkron kategori gagal");
      console.log(error);
    }
  }

  if (isLoading) {
    return;
  }

  return (
    <Layout title="Categories Page">
      <Container>
        {loadingSync ? <LoadingSync /> : null}

        <section className="grid gap-8">
          <div className="flex items-end justify-between gap-2">
            <div className="grid gap-0.5">
              <h1 className="text-[22px] font-semibold text-foreground">
                Kategori Produk 📦
              </h1>
              <p className="text-foreground-600">
                Lihat semua kategori produk kamu
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-[12px] leading-snug">
                <p className="text-foreground-600">Sinkron terakhir :</p>
                <p className="font-medium text-foreground">
                  {formatDate(data?.data.last_synchronized as string)}
                </p>
              </div>

              <Button
                variant="solid"
                size="sm"
                startContent={
                  <ArrowsCounterClockwise weight="bold" size={16} />
                }
                className="bg-emerald-600 font-medium text-white"
                onClick={handleSyncCategories}
              >
                Sinkron Kategori
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <Table
              isHeaderSticky
              aria-label="products categories table"
              color="primary"
              selectionMode="none"
              classNames={customStyleTable}
              className="scrollbar-hide"
            >
              <TableHeader columns={columnsKategori}>
                {(column) => (
                  <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
              </TableHeader>

              <TableBody
                items={
                  !data?.data.categories.length ? [] : data?.data.categories
                }
              >
                {(item) => (
                  <TableRow key={item.nama}>
                    {(columnKey) => (
                      <TableCell>
                        {renderCellCategory(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </section>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ req }) => {
  return {
    props: {
      token: req.headers["access_token"] as string,
    },
  };
}) satisfies GetServerSideProps<{ token: string }>;
