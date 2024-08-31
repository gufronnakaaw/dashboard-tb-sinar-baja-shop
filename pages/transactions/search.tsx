import TabsTransaction from "@/components/TabsTransaction";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { ScrollShadow } from "@nextui-org/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function SearchPage({
  token,
  status,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout title="Search Page">
      <Container>
        <section className="mb-8 grid gap-8">
          <div className="grid gap-0.5">
            <h1 className="text-[22px] font-semibold text-foreground">
              Atur transaksi kamu 💸
            </h1>
            <p className="text-foreground-600">
              Pantau semua transakti yang masuk disini.
            </p>
          </div>

          <div className="grid gap-4">
            <ScrollShadow
              orientation="horizontal"
              className="scrollbar-custom pr-12"
            >
              <TabsTransaction token={token} status={status} />
            </ScrollShadow>
          </div>
        </section>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ req, query }) => {
  const status = query?.status as string;

  return {
    props: {
      token: req.headers["access_token"] as string,
      status,
    },
  };
}) satisfies GetServerSideProps<{ token: string; status: string }>;
