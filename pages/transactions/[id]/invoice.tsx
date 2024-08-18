import TemplateInvoice from "@/components/template/TemplateInvoice";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { Button } from "@nextui-org/react";
import { ArrowLeft, Printer } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function InvoicePage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout title="Invoice">
      <Container>
        <section className="grid gap-8">
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="bordered"
              color="default"
              size="sm"
              startContent={<ArrowLeft weight="bold" size={14} />}
              onClick={() => router.push(`/transactions/${id}`)}
              className="w-max font-medium"
            >
              Kembali
            </Button>

            <Button
              variant="solid"
              size="sm"
              startContent={<Printer weight="bold" size={18} />}
              className="w-max bg-emerald-600 font-medium text-white"
            >
              Cetak Invoice
            </Button>
          </div>

          <TemplateInvoice />
        </section>
      </Container>
    </Layout>
  );
}
