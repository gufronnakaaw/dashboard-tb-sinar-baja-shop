import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { Clock, FloppyDisk } from "@phosphor-icons/react";

export default function OperationalPage() {
  const generateTimeOptions = (name: string) => {
    const options = [];
    for (let i = 0; i <= 23; i++) {
      const hour = i < 10 ? `0${i}` : `${i}`;
      const time = `${hour}:00`;

      options.push({ label: time, value: time });
    }

    return options;
  };

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
                >
                  {(item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  )}
                </Select>
              </div>

              <div className="grid grid-cols-[100px_1fr_1fr] items-center gap-6 text-sm text-foreground">
                <h4>Jum'at</h4>

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
            >
              Simpan Perubahan
            </Button>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
