import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { Button } from "@nextui-org/react";
import { FloppyDisk, Image, Trash } from "@phosphor-icons/react";

export default function BannerPage() {
  return (
    <Layout title="Banner Page">
      <Container>
        <section className="grid gap-8">
          <div className="grid gap-0.5">
            <h1 className="text-[22px] font-semibold text-foreground">
              Atur banner kamu disini 🏹
            </h1>
            <p className="text-foreground-600">
              Tambahkan informasi produk/promo lewat gambar.
            </p>
          </div>

          <div className="grid max-w-[650px] gap-4">
            <div className="h-auto w-full">
              <div className="aspect-video rounded-[20px] border-[4px] border-dashed border-foreground-200">
                <div className="m-2 flex h-full items-center justify-center rounded-xl bg-foreground-200">
                  <Image
                    weight="bold"
                    size={56}
                    className="text-foreground-600"
                    alt="preview banner"
                  />
                </div>
              </div>

              <p className="mt-1.5 text-[12px] font-medium italic text-foreground-600">
                * Preview banner
              </p>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <span className="inline-flex text-sm after:ml-[2px] after:text-danger after:content-['*']">
                  Cari Foto
                </span>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.svg,.pdf"
                  className="rounded-xl bg-foreground-200 px-2 py-2 text-small text-foreground-600 file:mr-4 file:rounded-md file:border-0 file:bg-foreground-100 file:px-2 file:py-[2px] file:text-sm file:font-medium file:text-emerald-600 hover:file:bg-foreground-200"
                />
              </div>

              <div className="flex items-center gap-2 justify-self-end">
                <Button
                  isDisabled
                  variant="bordered"
                  color="danger"
                  startContent={<Trash weight="bold" size={20} />}
                  className="w-max font-semibold"
                >
                  Hapus
                </Button>

                <Button
                  variant="solid"
                  startContent={<FloppyDisk weight="bold" size={20} />}
                  className="w-max bg-emerald-600 font-semibold text-white"
                >
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Layout>
  );
}
