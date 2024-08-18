import TemplateInvoice from "@/components/template/TemplateInvoice";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";

export default function InvoicePage() {
  return (
    <Layout title="Invoice">
      <Container>
        <TemplateInvoice />
      </Container>
    </Layout>
  );
}
