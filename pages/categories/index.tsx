import { categories } from "@/_dummy/categories";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import usePagination from "@/hooks/usepagination";
import { ProductCategoryType } from "@/types/product.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatDate } from "@/utils/formatDate";
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
import { ArrowsCounterClockwise, MagnifyingGlass } from "@phosphor-icons/react";
import React from "react";

export default function CategoriesPage() {
  const columnsKategori = [
    { name: "Kode", uid: "kode" },
    { name: "Nama", uid: "nama" },
    { name: "Dibuat Pada", uid: "created_at" },
  ];

  const { page, pages, data, setPage } = usePagination(categories, 10);

  function renderCellCategory(
    category: ProductCategoryType,
    columnKey: React.Key,
  ) {
    const cellValue = category[columnKey as keyof ProductCategoryType];

    switch (columnKey) {
      case "kode":
        return <div className="text-foreground">{category.id_kategori}</div>;
      case "nama":
        return <div className="w-max text-foreground">{category.nama}</div>;
      case "created_at":
        return (
          <div className="w-max text-foreground">
            {formatDate(category.created_at)}
          </div>
        );

      default:
        return cellValue;
    }
  }

  return (
    <Layout title="Categories Page">
      <Container>
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
                Sinkron Kategori
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <Input
              type="text"
              variant="flat"
              color="default"
              labelPlacement="outside"
              placeholder="Cari kategori..."
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

              <TableBody items={data}>
                {(item) => (
                  <TableRow key={item.id_kategori}>
                    {(columnKey) => (
                      <TableCell>
                        {renderCellCategory(item, columnKey)}
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
