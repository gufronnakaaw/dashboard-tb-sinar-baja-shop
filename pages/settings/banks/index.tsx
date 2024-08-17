import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { Bank } from "@/types/bank.type";
import { SuccessResponse } from "@/types/global.type";
import { Polling } from "@/types/polling.type";
import { customStyleTable } from "@/utils/customStyleTable";
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
import { Plus } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useState } from "react";
import Toast from "react-hot-toast";
import useSWR from "swr";

export default function BanksPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loadingSync, setLoadingSync] = useState(false);

  const { data, isLoading, mutate } = useSWR<SuccessResponse<Polling[]>>({
    url: "/dashboard/polling",
    method: "GET",
    token,
  });

  const columnsKategori = [
    { name: "#", uid: "index" },
    { name: "Nomor Rekening", uid: "no_rekening" },
    { name: "Atas Nama", uid: "atas_nama" },
    { name: "Bank", uid: "bank" },
    { name: "Dibuat Pada", uid: "created_at" },
  ];

  function renderCellBank(
    polling: { index: number } & Bank,
    columnKey: React.Key,
  ) {
    const cellValue = polling[columnKey as keyof Bank];

    switch (columnKey) {
      case "index":
        return <div className="w-max text-foreground">{polling.index}</div>;
      case "no_rekening":
        return (
          <div className="w-max text-foreground">{polling.no_rekening}</div>
        );
      case "atas_nama":
        return <div className="w-max text-foreground">{polling.atas_nama}</div>;
      case "bank":
        return <div className="w-max text-foreground">{polling.bank}</div>;
      case "created_at":
        return (
          <div className="w-max text-foreground">
            {formatDate(polling.created_at)}
          </div>
        );

      default:
        return cellValue;
    }
  }

  async function handleCreateBank() {
    setLoadingSync(true);

    try {
      // await fetcher({
      //   url: "/dashboard/sync/categories",
      //   method: "POST",
      //   token,
      // });

      Toast.success("Sinkron kategori berhasil");
      mutate();
      setLoadingSync(false);
    } catch (error) {
      setLoadingSync(false);
      Toast.error("Sinkron kategori gagal");
      console.log(error);
    }
  }

  // const pollings = data?.data.length
  //   ? data.data.map((item, index) => {
  //       return {
  //         index: index + 1,
  //         ...item,
  //       };
  //     })
  //   : [];

  const banks = [
    {
      id: "testing",
      no_rekening: "00110011",
      atas_nama: "Johnson Doe",
      bank: "BCA",
      created_at: "2024-08-17T22:31:50.418Z",
    },
  ].map((item, index) => {
    return { index: index + 1, ...item };
  });

  return (
    <Layout title="Banks Page">
      <Container>
        <section className="grid gap-8">
          <div className="flex items-end justify-between gap-2">
            <div className="grid gap-0.5">
              <h1 className="text-[22px] font-semibold text-foreground">
                Nomor Rekening 💳
              </h1>
              <p className="text-foreground-600">
                Simpan nomor rekening di sini marketplace.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="solid"
                size="sm"
                startContent={<Plus weight="bold" size={16} />}
                className="bg-emerald-600 font-medium text-white"
                onClick={handleCreateBank}
              >
                Tambah Nomor Rekening
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <Table
              isHeaderSticky
              aria-label="banks table"
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
                items={banks}
                isLoading={isLoading}
                loadingContent={<Spinner color="default" size="md" />}
              >
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>{renderCellBank(item, columnKey)}</TableCell>
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
