import { products } from "@/_dummy/products";
import CustomTooltip from "@/components/Tooltip";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import usePagination from "@/hooks/usepagination";
import { ProductType } from "@/types/product.type";
import { customStyleTable } from "@/utils/customStyleTable";
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
import React from "react";

export default function TransactionsPage() {
  const columnsProduk = [
    { name: "Gambar Product", uid: "gambar_produk" },
    { name: "Nama Produk", uid: "nama_produk" },
    { name: "Kategori", uid: "kategori" },
    { name: "Deskripsi Produk", uid: "deskripsi_produk" },
    { name: "Aksi", uid: "action" },
  ];

  const { page, pages, data, setPage } = usePagination(products, 10);

  function renderCellProduct(product: ProductType, columnKey: React.Key) {
    const cellValue = product[columnKey as keyof ProductType];

    switch (columnKey) {
      case "gambar_produk":
        return product.image ? (
          <Image
            priority
            src={`${product.image}`}
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
            content={product.name}
            classNames={{
              content: "max-w-[300px] font-medium",
            }}
          >
            <div className="line-clamp-1 w-max max-w-[400px] text-foreground">
              {product.name}
            </div>
          </CustomTooltip>
        );
      case "kategori":
        return <div className="w-max text-foreground">{product.category}</div>;
      case "deskripsi_produk":
        return !product.description ? (
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
      case "action":
        return (
          <CustomTooltip content="Edit">
            <Button isIconOnly variant="light" color="default" size="sm">
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
                  04 Agustus 2024, 10:00 WIB
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

              <TableBody items={data}>
                {(item) => (
                  <TableRow key={item.id}>
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
              total={pages}
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
