import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { OperationalType } from "@/types/operational.type";
import { fetcher } from "@/utils/fetcher";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { Clock, FloppyDisk } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import Toast from "react-hot-toast";

export default function OperationalPage({
  operational,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [operationals, setOperationals] = useState(operational);

  const generateTimeOptions = (name: string) => {
    const options = [{ label: "Tidak Beroperasi", value: "-" }];
    for (let i = 0; i <= 23; i++) {
      const hour = i < 10 ? `0${i}` : `${i}`;
      const time = `${hour}:00`;

      options.push({ label: time, value: time });
    }

    return options;
  };

  function getOperationalByDay(day: string) {
    return operational.find((element) => element.hari == day);
  }

  async function updateOperational() {
    try {
      await fetcher({
        url: "/dashboard/operational",
        method: "POST",
        token,
        data: operationals,
      });

      Toast.success("Update operasional berhasil");
      window.location.reload();
    } catch (error) {
      Toast.error("Update operasional gagal");
      console.log(error);
    }
  }

  return (
    <Layout title="Operational Page">
      <Container>
        <section className="grid max-w-[700px] gap-8">
          <div className="grid gap-0.5">
            <h1 className="text-[22px] font-semibold text-foreground">
              Jadwal Operasional Toko ⏲️
            </h1>
            <p className="text-foreground-600">
              Atur jadwal operasional tokomu agar lebih efisien.
            </p>
          </div>

          <div className="grid gap-4 rounded-xl border-[2px] border-foreground-200 p-8">
            <div className="grid grid-cols-[100px_1fr_1fr] gap-6 text-sm font-semibold text-foreground">
              <h4>Hari</h4>
              <h4>Jam Buka</h4>
              <h4>Jam Tutup</h4>
            </div>

            <div className="grid gap-2">
              <div className="grid grid-cols-[100px_1fr_1fr] items-center gap-6 text-sm text-foreground">
                <h4>Senin</h4>

                <Select
                  aria-label="select time operational"
                  items={generateTimeOptions("senin")}
                  labelPlacement="outside"
                  placeholder="Pilih jam buka"
                  startContent={
                    <Clock
                      weight="bold"
                      size={20}
                      className="text-foreground-400"
                    />
                  }
                  defaultSelectedKeys={[
                    getOperationalByDay("Senin")?.open as string,
                  ]}
                  onChange={(e) => {
                    setOperationals((prev) => {
                      if (prev.length) {
                        const index = prev.findIndex(
                          (element) => element.hari == "Senin",
                        );

                        prev[index] = {
                          ...prev[index],
                          open: e.target.value,
                        };

                        return [...prev];
                      }
                      return [...prev];
                    });
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>

                <Select
                  aria-label="select time operational"
                  items={generateTimeOptions("senin")}
                  labelPlacement="outside"
                  placeholder="Pilih jam tutup"
                  startContent={
                    <Clock
                      weight="bold"
                      size={20}
                      className="text-foreground-400"
                    />
                  }
                  defaultSelectedKeys={[
                    getOperationalByDay("Senin")?.close as string,
                  ]}
                  onChange={(e) => {
                    setOperationals((prev) => {
                      if (prev.length) {
                        const index = prev.findIndex(
                          (element) => element.hari == "Senin",
                        );

                        prev[index] = {
                          ...prev[index],
                          close: e.target.value,
                        };

                        return [...prev];
                      }
                      return [...prev];
                    });
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>
              </div>

              <div className="grid grid-cols-[100px_1fr_1fr] items-center gap-6 text-sm text-foreground">
                <h4>Selasa</h4>

                <Select
                  aria-label="select time operational"
                  items={generateTimeOptions("selesa")}
                  labelPlacement="outside"
                  placeholder="Pilih jam buka"
                  startContent={
                    <Clock
                      weight="bold"
                      size={20}
                      className="text-foreground-400"
                    />
                  }
                  defaultSelectedKeys={[
                    getOperationalByDay("Selasa")?.open as string,
                  ]}
                  onChange={(e) => {
                    setOperationals((prev) => {
                      if (prev.length) {
                        const index = prev.findIndex(
                          (element) => element.hari == "Selasa",
                        );

                        prev[index] = {
                          ...prev[index],
                          open: e.target.value,
                        };

                        return [...prev];
                      }
                      return [...prev];
                    });
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>

                <Select
                  aria-label="select time operational"
                  items={generateTimeOptions("selasa")}
                  labelPlacement="outside"
                  placeholder="Pilih jam tutup"
                  startContent={
                    <Clock
                      weight="bold"
                      size={20}
                      className="text-foreground-400"
                    />
                  }
                  defaultSelectedKeys={[
                    getOperationalByDay("Selasa")?.close as string,
                  ]}
                  onChange={(e) => {
                    setOperationals((prev) => {
                      if (prev.length) {
                        const index = prev.findIndex(
                          (element) => element.hari == "Selasa",
                        );

                        prev[index] = {
                          ...prev[index],
                          close: e.target.value,
                        };

                        return [...prev];
                      }
                      return [...prev];
                    });
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>
              </div>

              <div className="grid grid-cols-[100px_1fr_1fr] items-center gap-6 text-sm text-foreground">
                <h4>Rabu</h4>

                <Select
                  aria-label="select time operational"
                  items={generateTimeOptions("rabu")}
                  labelPlacement="outside"
                  placeholder="Pilih jam buka"
                  startContent={
                    <Clock
                      weight="bold"
                      size={20}
                      className="text-foreground-400"
                    />
                  }
                  defaultSelectedKeys={[
                    getOperationalByDay("Rabu")?.open as string,
                  ]}
                  onChange={(e) => {
                    setOperationals((prev) => {
                      if (prev.length) {
                        const index = prev.findIndex(
                          (element) => element.hari == "Rabu",
                        );

                        prev[index] = {
                          ...prev[index],
                          open: e.target.value,
                        };

                        return [...prev];
                      }
                      return [...prev];
                    });
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>

                <Select
                  aria-label="select time operational"
                  items={generateTimeOptions("rabu")}
                  labelPlacement="outside"
                  placeholder="Pilih jam tutup"
                  startContent={
                    <Clock
                      weight="bold"
                      size={20}
                      className="text-foreground-400"
                    />
                  }
                  defaultSelectedKeys={[
                    getOperationalByDay("Rabu")?.close as string,
                  ]}
                  onChange={(e) => {
                    setOperationals((prev) => {
                      if (prev.length) {
                        const index = prev.findIndex(
                          (element) => element.hari == "Rabu",
                        );

                        prev[index] = {
                          ...prev[index],
                          close: e.target.value,
                        };

                        return [...prev];
                      }
                      return [...prev];
                    });
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>
              </div>

              <div className="grid grid-cols-[100px_1fr_1fr] items-center gap-6 text-sm text-foreground">
                <h4>Kamis</h4>

                <Select
                  aria-label="select time operational"
                  items={generateTimeOptions("kamis")}
                  labelPlacement="outside"
                  placeholder="Pilih jam buka"
                  startContent={
                    <Clock
                      weight="bold"
                      size={20}
                      className="text-foreground-400"
                    />
                  }
                  defaultSelectedKeys={[
                    getOperationalByDay("Kamis")?.open as string,
                  ]}
                  onChange={(e) => {
                    setOperationals((prev) => {
                      if (prev.length) {
                        const index = prev.findIndex(
                          (element) => element.hari == "Kamis",
                        );

                        prev[index] = {
                          ...prev[index],
                          open: e.target.value,
                        };

                        return [...prev];
                      }
                      return [...prev];
                    });
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>

                <Select
                  aria-label="select time operational"
                  items={generateTimeOptions("kamis")}
                  labelPlacement="outside"
                  placeholder="Pilih jam tutup"
                  startContent={
                    <Clock
                      weight="bold"
                      size={20}
                      className="text-foreground-400"
                    />
                  }
                  defaultSelectedKeys={[
                    getOperationalByDay("Kamis")?.close as string,
                  ]}
                  onChange={(e) => {
                    setOperationals((prev) => {
                      if (prev.length) {
                        const index = prev.findIndex(
                          (element) => element.hari == "Kamis",
                        );

                        prev[index] = {
                          ...prev[index],
                          close: e.target.value,
                        };

                        return [...prev];
                      }
                      return [...prev];
                    });
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>
              </div>

              <div className="grid grid-cols-[100px_1fr_1fr] items-center gap-6 text-sm text-foreground">
                <h4>Jumat</h4>

                <Select
                  aria-label="select time operational"
                  items={generateTimeOptions("jumat")}
                  labelPlacement="outside"
                  placeholder="Pilih jam buka"
                  startContent={
                    <Clock
                      weight="bold"
                      size={20}
                      className="text-foreground-400"
                    />
                  }
                  defaultSelectedKeys={[
                    getOperationalByDay("Jumat")?.open as string,
                  ]}
                  onChange={(e) => {
                    setOperationals((prev) => {
                      if (prev.length) {
                        const index = prev.findIndex(
                          (element) => element.hari == "Jumat",
                        );

                        prev[index] = {
                          ...prev[index],
                          open: e.target.value,
                        };

                        return [...prev];
                      }
                      return [...prev];
                    });
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>

                <Select
                  aria-label="select time operational"
                  items={generateTimeOptions("jumat")}
                  labelPlacement="outside"
                  placeholder="Pilih jam tutup"
                  startContent={
                    <Clock
                      weight="bold"
                      size={20}
                      className="text-foreground-400"
                    />
                  }
                  defaultSelectedKeys={[
                    getOperationalByDay("Jumat")?.close as string,
                  ]}
                  onChange={(e) => {
                    setOperationals((prev) => {
                      if (prev.length) {
                        const index = prev.findIndex(
                          (element) => element.hari == "Jumat",
                        );

                        prev[index] = {
                          ...prev[index],
                          close: e.target.value,
                        };

                        return [...prev];
                      }
                      return [...prev];
                    });
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>
              </div>

              <div className="grid grid-cols-[100px_1fr_1fr] items-center gap-6 text-sm text-foreground">
                <h4>Sabtu</h4>

                <Select
                  aria-label="select time operational"
                  items={generateTimeOptions("sabtu")}
                  labelPlacement="outside"
                  placeholder="Pilih jam buka"
                  startContent={
                    <Clock
                      weight="bold"
                      size={20}
                      className="text-foreground-400"
                    />
                  }
                  defaultSelectedKeys={[
                    getOperationalByDay("Sabtu")?.open as string,
                  ]}
                  onChange={(e) => {
                    setOperationals((prev) => {
                      if (prev.length) {
                        const index = prev.findIndex(
                          (element) => element.hari == "Sabtu",
                        );

                        prev[index] = {
                          ...prev[index],
                          open: e.target.value,
                        };

                        return [...prev];
                      }
                      return [...prev];
                    });
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>

                <Select
                  aria-label="select time operational"
                  items={generateTimeOptions("sabtu")}
                  labelPlacement="outside"
                  placeholder="Pilih jam tutup"
                  startContent={
                    <Clock
                      weight="bold"
                      size={20}
                      className="text-foreground-400"
                    />
                  }
                  defaultSelectedKeys={[
                    getOperationalByDay("Sabtu")?.close as string,
                  ]}
                  onChange={(e) => {
                    setOperationals((prev) => {
                      if (prev.length) {
                        const index = prev.findIndex(
                          (element) => element.hari == "Sabtu",
                        );

                        prev[index] = {
                          ...prev[index],
                          close: e.target.value,
                        };

                        return [...prev];
                      }
                      return [...prev];
                    });
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>
              </div>

              <div className="grid grid-cols-[100px_1fr_1fr] items-center gap-6 text-sm text-foreground">
                <h4>Minggu</h4>

                <Select
                  aria-label="select time operational"
                  items={generateTimeOptions("minggu")}
                  labelPlacement="outside"
                  placeholder="Pilih jam buka"
                  startContent={
                    <Clock
                      weight="bold"
                      size={20}
                      className="text-foreground-400"
                    />
                  }
                  defaultSelectedKeys={[
                    getOperationalByDay("Minggu")?.open as string,
                  ]}
                  onChange={(e) => {
                    setOperationals((prev) => {
                      if (prev.length) {
                        const index = prev.findIndex(
                          (element) => element.hari == "Minggu",
                        );

                        prev[index] = {
                          ...prev[index],
                          open: e.target.value,
                        };

                        return [...prev];
                      }
                      return [...prev];
                    });
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>

                <Select
                  aria-label="select time operational"
                  items={generateTimeOptions("minggu")}
                  labelPlacement="outside"
                  placeholder="Pilih jam tutup"
                  startContent={
                    <Clock
                      weight="bold"
                      size={20}
                      className="text-foreground-400"
                    />
                  }
                  defaultSelectedKeys={[
                    getOperationalByDay("Minggu")?.close as string,
                  ]}
                  onChange={(e) => {
                    setOperationals((prev) => {
                      if (prev.length) {
                        const index = prev.findIndex(
                          (element) => element.hari == "Minggu",
                        );

                        prev[index] = {
                          ...prev[index],
                          close: e.target.value,
                        };

                        return [...prev];
                      }
                      return [...prev];
                    });
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>
              </div>
            </div>

            <Button
              variant="solid"
              startContent={<FloppyDisk weight="bold" size={20} />}
              className="mt-4 w-max justify-self-end bg-emerald-600 font-semibold text-white"
              onClick={updateOperational}
            >
              Simpan Perubahan
            </Button>
          </div>
        </section>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ req, query }) => {
  const token = req.headers["access_token"] as string;

  const response: SuccessResponse<OperationalType[]> = await fetcher({
    url: "/dashboard/operational",
    method: "GET",
    token,
  });

  return {
    props: {
      token,
      operational: response.data,
    },
  };
}) satisfies GetServerSideProps<{
  token: string;
  operational: OperationalType[];
}>;
