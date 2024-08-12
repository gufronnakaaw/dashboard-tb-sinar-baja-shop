import LoadingSync from "@/components/LoadingSync";
import CustomTooltip from "@/components/Tooltip";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { ProductCategoryType } from "@/types/product.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {
  ArrowsCounterClockwise,
  Power,
  SealCheck,
  XCircle,
} from "@phosphor-icons/react";
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
    { name: "#", uid: "index" },
    { name: "Nama", uid: "nama" },
    { name: "Aktif", uid: "active" },
    { name: "Disinkron Pada", uid: "updated_at" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellCategory(
    category: { index: number } & ProductCategoryType,
    columnKey: React.Key,
  ) {
    const cellValue = category[columnKey as keyof ProductCategoryType];

    switch (columnKey) {
      case "index":
        return <div className="w-max text-foreground">{category.index}</div>;
      case "nama":
        return <div className="w-max text-foreground">{category.nama}</div>;
      case "active":
        return (
          <div className="w-max">
            {category.active ? (
              <SealCheck weight="fill" size={20} className="text-emerald-600" />
            ) : (
              <XCircle weight="fill" size={20} className="text-danger-600" />
            )}
          </div>
        );
      case "updated_at":
        return (
          <div className="w-max text-foreground">
            {formatDate(category.updated_at)}
          </div>
        );
      case "action":
        return (
          <div className="w-max">
            <CustomTooltip
              content={category.active ? "Non aktifkan" : "Aktifkan"}
            >
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() => {
                  handleActiveCategory(category.nama, !category.active);
                }}
              >
                <Power weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }

  async function handleActiveCategory(nama: string, value: boolean) {
    if (!confirm("Apakah anda yakin?")) return;

    try {
      await fetcher({
        url: "/dashboard/categories/active",
        method: "PATCH",
        token,
        data: {
          nama_kategori: nama,
          value,
        },
      });

      Toast.success("Update status berhasil");
      mutate();
    } catch (error) {
      setLoadingSync(false);
      Toast.error("Update status gagal");
      console.log(error);
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

  const categories = data?.data.categories.length
    ? data.data.categories.map((item, index) => {
        return {
          index: index + 1,
          ...item,
        };
      })
    : [];

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
                  {data?.data.last_synchronized
                    ? formatDate(data?.data.last_synchronized as string)
                    : null}
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
                items={categories}
                isLoading={isLoading}
                loadingContent={<Spinner color="default" size="md" />}
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
