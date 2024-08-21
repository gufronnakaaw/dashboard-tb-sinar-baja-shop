import PopupCreatePull from "@/components/popup/PopupCreatePull";
import CustomTooltip from "@/components/Tooltip";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { Polling } from "@/types/polling.type";
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
import Toast from "react-hot-toast";
import useSWR from "swr";

export default function APIPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, isLoading, mutate } = useSWR<SuccessResponse<Polling[]>>({
    url: "/dashboard/polling",
    method: "GET",
    token,
  });

  const columnsKategori = [
    { name: "#", uid: "index" },
    { name: "URL", uid: "url" },
    { name: "Label", uid: "label" },
    { name: "Dibuat Pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellPull(
    polling: { index: number } & Polling,
    columnKey: React.Key,
  ) {
    const cellValue = polling[columnKey as keyof Polling];

    switch (columnKey) {
      case "index":
        return <div className="w-max text-foreground">{polling.index}</div>;
      case "url":
        return <div className="w-max text-foreground">{polling.url}</div>;
      case "label":
        return <div className="w-max text-foreground">{polling.label}</div>;
      case "created_at":
        return (
          <div className="w-max text-foreground">
            {formatDate(polling.created_at)}
          </div>
        );
      case "action":
        return (
          <CustomTooltip content="Hapus">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => handleDeletePull(polling.id)}
            >
              <Trash weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>
        );

      default:
        return cellValue;
    }
  }

  async function handleDeletePull(id: number) {
    if (!confirm("apakah anda yakin?")) return;

    try {
      await fetcher({
        url: `/dashboard/polling/${id}`,
        method: "DELETE",
        token,
      });

      Toast.success("Hapus url berhasil");
      mutate();
    } catch (error) {
      Toast.error("Hapus url gagal");
      console.log(error);
    }
  }

  const pollings = data?.data.length
    ? data.data.map((item, index) => {
        return {
          index: index + 1,
          ...item,
        };
      })
    : [];

  return (
    <Layout title="API Page">
      <Container>
        <section className="grid gap-8">
          <div className="flex items-end justify-between gap-2">
            <div className="grid gap-0.5">
              <h1 className="text-[22px] font-semibold text-foreground">
                API Endpoint 🔗
              </h1>
              <p className="w-[825px] text-foreground-600">
                Halaman ini digunakan untuk membuat sinkron URL untuk melakukan
                sinkronisasi dari aplikasi SCM. Hubungi developer untuk info
                lebih lanjut.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <PopupCreatePull {...{ token, mutate }} />
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
                items={pollings}
                isLoading={isLoading}
                loadingContent={<Spinner color="default" size="md" />}
              >
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>{renderCellPull(item, columnKey)}</TableCell>
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
