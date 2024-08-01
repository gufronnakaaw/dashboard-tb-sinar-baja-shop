import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";

export default function DashboardPage() {
  return (
    <Layout title="Dashboard Page">
      <Container>
        <section className="grid gap-8">
          <div className="grid gap-0.5">
            <h1 className="text-[22px] font-semibold text-foreground">
              Selamat Datang 👋, Admin
            </h1>
            <p className="text-foreground-600">
              Berikut rangkuman tokomu hari ini.
            </p>
          </div>

          <div>data</div>
        </section>
      </Container>
    </Layout>
  );
}
