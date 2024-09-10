import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatDate } from "@/utils/formatDate";
import {
  Button,
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import useSWR from "swr";

type UserType = {
  nama: string;
  email: string;
  no_telpon: string;
  created_at: string;
};

export default function UsersPage({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useSWR<SuccessResponse<UserType[]>>({
    url: "/dashboard/users",
    method: "GET",
    token,
  });

  const columnsUser = [
    { name: "#", uid: "index" },
    { name: "Nama", uid: "name" },
    { name: "Email", uid: "email" },
    { name: "No Telpon", uid: "no_telpon" },
    { name: "Daftar pada", uid: "created_at" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellUsers(
    user: { index: number } & UserType,
    columnKey: React.Key,
  ) {
    const cellValue = user[columnKey as keyof UserType];

    switch (columnKey) {
      case "index":
        return <div className="w-max text-foreground">{user.index}</div>;
      case "name":
        return <div className="w-max text-foreground">{user.nama}</div>;
      case "email":
        return <div className="w-max text-foreground">{user.email}</div>;
      case "no_telpon":
        return <div className="w-max text-foreground">{user.no_telpon}</div>;
      case "created_at":
        return (
          <div className="w-max text-foreground">
            {formatDate(user.created_at)}
          </div>
        );

      default:
        return cellValue;
    }
  }

  const users = data?.data.length
    ? data.data.map((item, index) => {
        return {
          index: index + 1,
          ...item,
        };
      })
    : [];

  const filter = users.filter((user) => {
    return (
      user.nama.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Layout title="User Page">
      <Container>
        <section className="grid gap-8">
          <div className="flex items-end justify-between gap-2">
            <div className="grid gap-0.5">
              <h1 className="text-[22px] font-semibold text-foreground">
                User 🧑🏽‍💻
              </h1>
              <p className="text-foreground-600">
                Daftar pengguna yang sudah mendaftar pada Sinar Baja Shop.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="solid"
                size="sm"
                startContent={<Plus weight="bold" size={16} />}
                className="bg-emerald-600 font-medium text-white"
                onClick={() => {
                  window.open(
                    "https://shop.sinarbajakediri.my.id/auth/register",
                    "_blank",
                  );
                }}
              >
                Buat user
              </Button>
            </div>
          </div>

          <Input
            type="text"
            variant="flat"
            color="default"
            labelPlacement="outside"
            placeholder="Cari nama atau email..."
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Table
            isHeaderSticky
            aria-label="users table"
            color="primary"
            selectionMode="none"
            classNames={customStyleTable}
            className="scrollbar-hide"
          >
            <TableHeader columns={columnsUser}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody
              items={filter}
              isLoading={isLoading}
              loadingContent={<Spinner color="default" size="md" />}
            >
              {(item) => (
                <TableRow key={item.email}>
                  {(columnKey) => (
                    <TableCell>{renderCellUsers(item, columnKey)}</TableCell>
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
