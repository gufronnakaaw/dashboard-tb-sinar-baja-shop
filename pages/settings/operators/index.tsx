import CustomTooltip from "@/components/Tooltip";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { customStyleTable } from "@/utils/customStyleTable";
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

type OperatorType = {
  id: number | string;
  username: string;
  password: string;
};

const operators: OperatorType[] = [
  {
    id: 1,
    username: "gufronnakaaw",
    password: "gufron123",
  },
  {
    id: 2,
    username: "fajarfadillahh",
    password: "fadillah0987",
  },
];

export default function OperatorsPage() {
  const columnsOperator = [
    { name: "#", uid: "index" },
    { name: "Username", uid: "username" },
    { name: "Kata Sandi", uid: "password" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellOperator(
    operator: { index: number } & OperatorType,
    columnKey: React.Key,
  ) {
    const cellValue = operator[columnKey as keyof OperatorType];

    switch (columnKey) {
      case "index":
        return <div className="w-max text-foreground">{operator.id}</div>;
      case "username":
        return <div className="w-max text-foreground">{operator.username}</div>;
      case "password":
        return <div className="w-max text-foreground">{operator.password}</div>;
      case "action":
        return (
          <>
            <CustomTooltip content="Hapus">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() => {
                  if (confirm("Apakah anda yakin?")) {
                    window.location.reload();
                  }
                }}
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

  return (
    <Layout title="Operator Page">
      <Container>
        <section className="grid gap-8">
          <div className="flex items-end justify-between gap-2">
            <div className="grid gap-0.5">
              <h1 className="text-[22px] font-semibold text-foreground">
                Operator 🧑🏽‍💻
              </h1>
              <p className="text-foreground-600">
                Atur semua pengguna dengan mudah.
              </p>
            </div>

            <Button
              variant="solid"
              size="sm"
              className="w-max bg-emerald-600 font-medium text-white"
            >
              Tambah Pengguna
            </Button>
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
              loadingContent={<Spinner color="default" size="md" />}
            >
              {(item) => (
                <TableRow key={item.id}>
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
