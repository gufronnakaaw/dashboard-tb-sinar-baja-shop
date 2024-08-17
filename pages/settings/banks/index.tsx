import PopupCreateBank from "@/components/popup/PopupCreateBank";
import CustomTooltip from "@/components/Tooltip";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { Bank } from "@/types/bank.type";
import { SuccessResponse } from "@/types/global.type";
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
import { Trash } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import Toast from "react-hot-toast";
import useSWR from "swr";

export default function BanksPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, isLoading, mutate } = useSWR<SuccessResponse<Bank[]>>({
    url: "/dashboard/banks",
    method: "GET",
    token,
  });

  async function handleDeleteBank(bank_id: string) {
    if (!confirm("Apakah anda yakin")) return;

    try {
      await fetcher({
        url: `/dashboard/banks/${bank_id}`,
        method: "DELETE",
        token,
      });

      Toast.success("Hapus rekening berhasil");
      mutate();
    } catch (error) {
      Toast.error("Hapus rekening gagal");
      console.log(error);
    }
  }

  const columnsKategori = [
    { name: "#", uid: "index" },
    { name: "Nomor Rekening", uid: "no_rekening" },
    { name: "Atas Nama", uid: "atas_nama" },
    { name: "Bank", uid: "bank" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellBank(
    bank: { index: number } & Bank,
    columnKey: React.Key,
  ) {
    const cellValue = bank[columnKey as keyof Bank];

    switch (columnKey) {
      case "index":
        return <div className="w-max text-foreground">{bank.index}</div>;
      case "no_rekening":
        return <div className="w-max text-foreground">{bank.no_rekening}</div>;
      case "atas_nama":
        return <div className="w-max text-foreground">{bank.atas_nama}</div>;
      case "bank":
        return <div className="w-max text-foreground">{bank.bank}</div>;
      case "created_at":
        return (
          <div className="w-max text-foreground">
            {formatDate(bank.created_at)}
          </div>
        );
      case "action":
        return (
          <>
            <CustomTooltip content="Hapus">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() => handleDeleteBank(bank.bank_id)}
              >
                <Trash weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
          </>
        );

      default:
        return cellValue;
    }
  }

  const banks = data?.data.length
    ? data.data.map((item, index) => {
        return {
          index: index + 1,
          ...item,
        };
      })
    : [];

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
                Simpan nomor rekening marketplace di sini.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <PopupCreateBank {...{ token, mutate }} />
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
                  <TableRow key={item.bank_id}>
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
