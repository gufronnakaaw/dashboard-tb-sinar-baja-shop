import LoadingSync from "@/components/LoadingSync";
import CustomTooltip from "@/components/Tooltip";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { DashboardProduct } from "@/types/product.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";

import {
  Button,
  Input,
  Pagination,
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
  ImageBroken,
  MagnifyingGlass,
  PencilLine,
  Power,
  SealCheck,
  XCircle,
} from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Toast from "react-hot-toast";
import useSWR from "swr";
import { useDebounce } from "use-debounce";

export default function ProductsPage({
  token,
  q,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 1000);
  const [loadingSync, setLoadingSync] = useState(false);

  const url = q
    ? `/dashboard/products/search?q=${q}&page=${page}`
    : `/dashboard/products?page=${page}`;

  const { data, isLoading, mutate } = useSWR<
    SuccessResponse<{
      products: DashboardProduct[];
      total_items: number;
      last_synchronized: string;
    }>
  >({ url, method: "GET", token });

  const columnsProduk = [
    { name: "#", uid: "index" },
    { name: "Gambar Produk", uid: "gambar_produk" },
    { name: "Kode Produk", uid: "kode_item" },
    { name: "Nama Produk", uid: "nama_produk" },
    { name: "Kategori", uid: "kategori" },
    { name: "Harga", uid: "harga" },
    { name: "Total Stok", uid: "total_stok" },
    { name: "Status", uid: "status" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellProduct(
    product: ({ index: number } & DashboardProduct) | undefined,
    columnKey: React.Key,
  ) {
    const cellValue = product
      ? product[columnKey as keyof DashboardProduct]
      : null;

    switch (columnKey) {
      case "index":
        return <div className="w-max text-foreground">{product?.index}</div>;
      case "gambar_produk":
        return product?.image.length ? (
          <Image
            priority
            src={`${product.image[0].url}`}
            alt="product img"
            width={500}
            height={500}
            className="aspect-square h-16 w-16 rounded-lg object-cover object-center"
          />
        ) : (
          <div className="flex aspect-square h-16 w-16 items-center justify-center rounded-lg border-[2px] border-foreground-200">
            <ImageBroken
              weight="bold"
              size={24}
              className="text-foreground-600"
            />
          </div>
        );
      case "kode_item":
        return (
          <div className="w-max text-foreground">{product?.kode_item}</div>
        );
      case "nama_produk":
        return (
          <CustomTooltip
            content={product?.nama_produk_asli}
            classNames={{
              content: "w-[200px] font-medium",
            }}
          >
            <div className="line-clamp-2 w-[200px] text-foreground">
              {product?.nama_produk_asli}
            </div>
          </CustomTooltip>
        );
      case "kategori":
        return <div className="w-max text-foreground">{product?.kategori}</div>;
      case "harga":
        return (
          <div className="w-max text-foreground">
            {formatRupiah(product?.harga_6 as number)}
          </div>
        );
      case "total_stok":
        return (
          <div className="w-max text-foreground">{product?.total_stok}</div>
        );
      case "status":
        return (
          <div className="flex w-max justify-center gap-2">
            {!product?.deskripsi ? (
              <CustomTooltip
                placement="top"
                content="Deskripsi produk belum ada ❌"
              >
                <XCircle weight="fill" size={20} className="text-danger-600" />
              </CustomTooltip>
            ) : (
              <CustomTooltip
                placement="top"
                content="Deskripsi produk sudah ada ✅"
              >
                <SealCheck
                  weight="fill"
                  size={20}
                  className="text-emerald-600"
                />
              </CustomTooltip>
            )}

            {product?.active ? (
              <CustomTooltip placement="top" content="Produk Aktif ✅">
                <SealCheck
                  weight="fill"
                  size={20}
                  className="text-emerald-600"
                />
              </CustomTooltip>
            ) : (
              <CustomTooltip placement="top" content="Produk Nonaktif ❌">
                <XCircle weight="fill" size={20} className="text-danger-600" />
              </CustomTooltip>
            )}
          </div>
        );
      case "action":
        return (
          <div className="inline-flex items-center gap-1">
            <CustomTooltip content="Edit">
              <Button
                isIconOnly
                variant="light"
                color="default"
                size="sm"
                onClick={() =>
                  window.open(
                    `/products/edit/${encodeURIComponent(product?.kode_item as string)}`,
                    "_blank",
                  )
                }
              >
                <PencilLine
                  weight="bold"
                  size={20}
                  className="text-foreground-600"
                />
              </Button>
            </CustomTooltip>

            <CustomTooltip
              content={product?.active ? "Non aktifkan" : "Aktifkan"}
            >
              <Button
                isIconOnly
                size="sm"
                onClick={() => {
                  handleActiveProduct(
                    product?.kode_item as string,
                    !product?.active,
                  );
                }}
                className="bg-transparent hover:bg-danger-100"
              >
                <Power weight="bold" size={20} className="text-danger-500" />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }

  async function handleActiveProduct(kode_item: string, value: boolean) {
    if (!confirm("Apakah anda yakin")) return;

    try {
      await fetcher({
        url: "/dashboard/products/active",
        method: "PATCH",
        token,
        data: {
          kode_item,
          value,
        },
      });

      Toast.success("Update status berhasil");
      mutate();
    } catch (error) {
      Toast.error("Update status gagal");
      console.log(error);
    }
  }

  async function handleSyncProducts() {
    setLoadingSync(true);

    try {
      await fetcher({
        url: "/dashboard/sync/products",
        method: "POST",
        token,
      });

      Toast.success("Sinkron produk berhasil");
      mutate();
      setLoadingSync(false);
    } catch (error) {
      setLoadingSync(false);
      Toast.error("Sinkron produk gagal. Internet POS tidak memadai.", {
        duration: 10000,
      });
      console.log(error);
    }
  }

  useEffect(() => {
    if (searchValue) {
      setPage(1);
      router.push(`/products?q=${searchValue}`);
    } else {
      router.push(`/products`);
    }
  }, [searchValue]);

  const products = data?.data.products.length
    ? data?.data.products.map((item, index) => {
        return {
          index: (page - 1) * 10 + (index + 1),
          ...item,
        };
      })
    : [];

  return (
    <Layout title="Products Page">
      <Container>
        {loadingSync ? <LoadingSync /> : null}

        <section className="grid gap-8">
          <div className="flex items-end justify-between gap-2">
            <div className="grid gap-0.5">
              <h1 className="text-[22px] font-semibold text-foreground">
                Produk Saya 📦
              </h1>
              <p className="text-foreground-600">Atur produkmu di sini</p>
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
                onClick={handleSyncProducts}
              >
                Sinkron Produk
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <Input
              type="text"
              variant="flat"
              color="default"
              labelPlacement="outside"
              placeholder="Cari produk..."
              startContent={
                <MagnifyingGlass
                  weight="bold"
                  size={20}
                  className="text-foreground-400"
                />
              }
              classNames={{
                base: "max-w-[450px]",
                input: "text-sm placeholder:text-sm",
              }}
              defaultValue={q}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="overflow-x-scroll scrollbar-hide">
              <Table
                isHeaderSticky
                aria-label="products table"
                color="primary"
                selectionMode="none"
                classNames={customStyleTable}
                className="scrollbar-hide"
              >
                <TableHeader columns={columnsProduk}>
                  {(column) => (
                    <TableColumn key={column.uid}>{column.name}</TableColumn>
                  )}
                </TableHeader>

                <TableBody
                  items={products}
                  emptyContent={
                    <span className="text-sm font-medium italic text-foreground-600">
                      Produk tidak ditemukan!
                    </span>
                  }
                  isLoading={isLoading}
                  loadingContent={<Spinner color="default" size="md" />}
                >
                  {(item) => (
                    <TableRow key={item.kode_item}>
                      {(columnKey) => (
                        <TableCell>
                          {renderCellProduct(item, columnKey)}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {data?.data.total_items ? (
              <Pagination
                isCompact
                showControls
                page={page}
                total={Math.ceil(
                  ((data?.data.total_items as number) / 10) as number,
                )}
                onChange={setPage}
                className="justify-self-center"
                classNames={{
                  cursor: "bg-emerald-600 text-white",
                }}
                siblings={5}
              />
            ) : null}
          </div>
        </section>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ req, query }) => {
  const q = query?.q as string;

  return {
    props: {
      token: req.headers["access_token"] as string,
      q: q ? q : "",
    },
  };
}) satisfies GetServerSideProps<{ token: string; q: string }>;
