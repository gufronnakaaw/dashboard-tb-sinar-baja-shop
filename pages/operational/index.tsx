import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";

export default function OperationalPage() {
  return (
    <Layout title="Operational Page">
      <Container>
        <section className="grid max-w-[650px] gap-8">
          <div className="grid gap-0.5">
            <h1 className="text-[22px] font-semibold text-foreground">
              Jadwal Operasional Toko ⏲️
            </h1>
            <p className="text-foreground-600">
              Atur jadwal operasional tokomu agar lebih efisien.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-[100px_1fr_1fr] gap-2 text-sm font-medium text-foreground">
              <h4>Hari</h4>
              <h4>Jam Buka</h4>
              <h4>Jam Tutup</h4>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
