import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { TimeInput } from "@nextui-org/react";
import { Clock } from "@phosphor-icons/react";

export default function OperationalPage() {
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

                <TimeInput
                  label={null}
                  labelPlacement="outside"
                  startContent={<Clock weight="bold" size={20} />}
                />

                <TimeInput
                  label={null}
                  labelPlacement="outside"
                  startContent={<Clock weight="bold" size={20} />}
                />
              </div>

              <div className="grid grid-cols-[100px_1fr_1fr] items-center gap-6 text-sm text-foreground">
                <h4>Selasa</h4>

                <TimeInput
                  label={null}
                  labelPlacement="outside"
                  startContent={<Clock weight="bold" size={20} />}
                />

                <TimeInput
                  label={null}
                  labelPlacement="outside"
                  startContent={<Clock weight="bold" size={20} />}
                />
              </div>

              <div className="grid grid-cols-[100px_1fr_1fr] items-center gap-6 text-sm text-foreground">
                <h4>Rabu</h4>

                <TimeInput
                  label={null}
                  labelPlacement="outside"
                  startContent={<Clock weight="bold" size={20} />}
                />

                <TimeInput
                  label={null}
                  labelPlacement="outside"
                  startContent={<Clock weight="bold" size={20} />}
                />
              </div>

              <div className="grid grid-cols-[100px_1fr_1fr] items-center gap-6 text-sm text-foreground">
                <h4>Kamis</h4>

                <TimeInput
                  label={null}
                  labelPlacement="outside"
                  startContent={<Clock weight="bold" size={20} />}
                />

                <TimeInput
                  label={null}
                  labelPlacement="outside"
                  startContent={<Clock weight="bold" size={20} />}
                />
              </div>

              <div className="grid grid-cols-[100px_1fr_1fr] items-center gap-6 text-sm text-foreground">
                <h4>Jum'at</h4>

                <TimeInput
                  label={null}
                  labelPlacement="outside"
                  startContent={<Clock weight="bold" size={20} />}
                />

                <TimeInput
                  label={null}
                  labelPlacement="outside"
                  startContent={<Clock weight="bold" size={20} />}
                />
              </div>

              <div className="grid grid-cols-[100px_1fr_1fr] items-center gap-6 text-sm text-foreground">
                <h4>Sabtu</h4>

                <TimeInput
                  label={null}
                  labelPlacement="outside"
                  startContent={<Clock weight="bold" size={20} />}
                />

                <TimeInput
                  label={null}
                  labelPlacement="outside"
                  startContent={<Clock weight="bold" size={20} />}
                />
              </div>

              <div className="grid grid-cols-[100px_1fr_1fr] items-center gap-6 text-sm text-foreground">
                <h4>Minggu</h4>

                <TimeInput
                  label={null}
                  labelPlacement="outside"
                  startContent={<Clock weight="bold" size={20} />}
                />

                <TimeInput
                  label={null}
                  labelPlacement="outside"
                  startContent={<Clock weight="bold" size={20} />}
                />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
