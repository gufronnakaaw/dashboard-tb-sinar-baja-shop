import TemplateInvoice from "@/components/template/TemplateInvoice";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { Button } from "@nextui-org/react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function InvoicePage() {
  const router = useRouter();

  return (
    <Layout title="Invoice">
      <Container>
        <section className="grid gap-8">
          <Button
            variant="bordered"
            color="default"
            size="sm"
            startContent={<ArrowLeft weight="bold" size={14} />}
            onClick={() => router.push("/transactions/190720240901")}
            className="w-max font-medium"
          >
            Kembali
          </Button>

          <TemplateInvoice />
        </section>
      </Container>
    </Layout>
  );
}
