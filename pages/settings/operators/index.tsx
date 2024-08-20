import LoadingSync from "@/components/LoadingSync";
import CustomTooltip from "@/components/Tooltip";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
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
import { ArrowsCounterClockwise, Trash } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import Toast from "react-hot-toast";
import useSWR from "swr";

type OperatorType = {
  id: number | string;
  username: string;
  updated_at: string;
};

export default function OperatorsPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loadingSync, setLoadingSync] = useState(false);

  const { data, isLoading, mutate } = useSWR<
    SuccessResponse<{
      operators: OperatorType[];
      last_synchronized: string;
    }>
  >({ url: "/dashboard/operators", method: "GET", token });

  const columnsOperator = [
    { name: "#", uid: "index" },
    { name: "Username", uid: "username" },
    { name: "Kata Sandi", uid: "password" },
    { name: "Diubah pada", uid: "updated_at" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellOperator(
    operator: { index: number } & OperatorType,
    columnKey: React.Key,
  ) {
    const cellValue = operator[columnKey as keyof OperatorType];

    switch (columnKey) {
      case "index":
        return <div className="w-max text-foreground">{operator.index}</div>;
      case "username":
        return <div className="w-max text-foreground">{operator.username}</div>;
      case "password":
        return (
          <div className="w-max text-foreground">Cek pada aplikasi SCM</div>
        );
      case "updated_at":
        return (
          <div className="w-max text-foreground">
            {formatDate(operator.updated_at)}
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
                onClick={() => handleDeleteOperator(operator.username)}
              >
                <Trash weight="bold" size={20} className="text-danger-500" />
              </Button>
            </CustomTooltip>
          </>
        );

      default:
        return cellValue;
    }
  }

  async function handleSyncOperators() {
    setLoadingSync(true);

    try {
      await fetcher({
        url: "/dashboard/sync/operators",
        method: "POST",
        token,
      });

      Toast.success("Sinkron operators berhasil");
      mutate();
      setLoadingSync(false);
    } catch (error) {
      setLoadingSync(false);
      Toast.error("Sinkron operators gagal");
      console.log(error);
    }
  }

  async function handleDeleteOperator(username: string) {
    if (!confirm("Apakah anda yakin?")) return;

    try {
      await fetcher({
        url: `/dashboard/operators/${username}`,
        method: "DELETE",
        token,
      });

      Toast.success("Hapus operator berhasil");
      mutate();
    } catch (error) {
      setLoadingSync(false);
      Toast.error("Hapus operator gagal");
      console.log(error);
    }
  }

  const operators = data?.data.operators.length
    ? data.data.operators.map((item, index) => {
        return {
          index: index + 1,
          ...item,
        };
      })
    : [];

  return (
    <Layout title="Operator Page">
      <Container>
        {loadingSync ? <LoadingSync /> : null}

        <section className="grid gap-8">
          <div className="flex items-end justify-between gap-2">
            <div className="grid gap-0.5">
              <h1 className="text-[22px] font-semibold text-foreground">
                Operator 🧑🏽‍💻
              </h1>
              <p className="text-foreground-600">
                Atur pengguna yang dapat mengakses aplikasi ini.
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
                onClick={handleSyncOperators}
              >
                Sinkron Operator
              </Button>
            </div>
          </div>

          <Table
            isHeaderSticky
            aria-label="operators table"
            color="primary"
            selectionMode="none"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsOperator}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody
              items={operators}
              isLoading={isLoading}
              loadingContent={<Spinner color="default" size="md" />}
            >
              {(item) => (
                <TableRow key={item.username}>
                  {(columnKey) => (
                    <TableCell>{renderCellOperator(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
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
