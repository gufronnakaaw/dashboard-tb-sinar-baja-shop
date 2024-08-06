import CustomTooltip from "@/components/Tooltip";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { DashboardProduct } from "@/types/product.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import {
  Button,
  Input,
  Pagination,
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
  SealCheck,
  XCircle,
} from "@phosphor-icons/react";
import Image from "next/image";
import React, { useState } from "react";
import useSWR from "swr";

export default function TransactionsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSWR<
    SuccessResponse<{
      products: DashboardProduct[];
      total_items: number;
      last_synchronized: string;
    }>
  >({ url: `/dashboard/products?page=${page}`, method: "GET" });

  const columnsProduk = [
    { name: "Gambar Product", uid: "gambar_produk" },
    { name: "Kode Item", uid: "kode_item" },
    { name: "Nama Produk", uid: "nama_produk" },
    { name: "Kategori", uid: "kategori" },
    { name: "Deskripsi", uid: "deskripsi_produk" },
    { name: "Harga", uid: "harga" },
    { name: "Total Stok", uid: "total_stok" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellProduct(
    product: DashboardProduct | undefined,
    columnKey: React.Key,
  ) {
    const cellValue = product
      ? product[columnKey as keyof DashboardProduct]
      : null;

    switch (columnKey) {
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
      case "nama_produk":
        return (
          <CustomTooltip
            content={product?.nama_produk_asli}
            classNames={{
              content: "max-w-[300px] font-medium",
            }}
          >
            <div className="line-clamp-1 w-max max-w-[400px] text-foreground">
              {product?.nama_produk_asli}
            </div>
          </CustomTooltip>
        );
      case "kode_item":
        return (
          <div className="line-clamp-1 w-max max-w-[400px] text-foreground">
            {product?.kode_item}
          </div>
        );
      case "kategori":
        return <div className="w-max text-foreground">{product?.kategori}</div>;
      case "deskripsi_produk":
        return !product?.deskripsi ? (
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
            <SealCheck weight="fill" size={20} className="text-emerald-600" />
          </CustomTooltip>
        );
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
      case "action":
        return (
          <CustomTooltip content="Edit">
            <Button
              isIconOnly
              variant="light"
              color="default"
              size="sm"
              onClick={() =>
                window.open(`/products/edit/${product?.slug}`, "_blank")
              }
            >
              <PencilLine
                weight="bold"
                size={20}
                className="text-foreground-600"
              />
            </Button>
          </CustomTooltip>
        );

      default:
        return cellValue;
    }
  }

  if (isLoading) {
    return;
  }

  return (
    <Layout title="Products Page">
      <Container>
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
            />

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

              <TableBody items={data?.data.products}>
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
            />
          </div>
        </section>
      </Container>
    </Layout>
  );
}
