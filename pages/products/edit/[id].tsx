import EditorQuill from "@/components/EditorQuill";
import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { Button } from "@nextui-org/react";
import { ArrowLeft, Image } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditPage() {
  const router = useRouter();
  const [editorContent, setEditorContent] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsMounted(true);
    }
  }, [isMounted]);

  return (
    <Layout title="Edit Product Page">
      <Container>
        <section className="grid max-w-[650px] gap-8">
          <Button
            variant="bordered"
            color="default"
            size="sm"
            startContent={<ArrowLeft weight="bold" size={14} />}
            onClick={() => router.push("/products")}
            className="w-max font-medium"
          >
            Kembali
          </Button>

          <div className="grid gap-0.5">
            <p className="text-[14px] text-foreground-600">
              Bahan Bangunan - TGG-DSA150-120SPR
            </p>
            <h1 className="max-w-[500px] text-[18px] font-semibold text-foreground">
              Tangga Double Step Alumunium 1.2m Super Natural Beban 150
            </h1>
          </div>

          <div className="grid gap-4">
            <div className="h-auto w-full">
              <div className="aspect-video rounded-[20px] border-[4px] border-dashed border-foreground-200">
                <div className="m-2 flex h-full items-center justify-center rounded-xl bg-foreground-200">
                  <Image
                    weight="bold"
                    size={56}
                    className="text-foreground-600"
                  />
                </div>
              </div>

              <p className="mt-1.5 text-[12px] font-medium italic text-foreground-600">
                * Preview Gambar Produk
              </p>
            </div>

            <div className="grid gap-1.5">
              <span className="inline-flex text-sm after:ml-[2px] after:text-danger after:content-['*']">
                Gambar Produk
              </span>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.svg,.pdf"
                className="rounded-xl bg-foreground-200 px-2 py-2 text-small text-foreground-600 file:mr-4 file:rounded-md file:border-0 file:bg-foreground-100 file:px-2 file:py-[2px] file:text-sm file:font-medium file:text-emerald-600 hover:file:bg-foreground-200"
              />
            </div>
          </div>

          <div className="mb-40 grid gap-1.5">
            <span className="inline-flex text-sm after:ml-[2px] after:text-danger after:content-['*']">
              Deskripsi Produk
            </span>

            <EditorQuill value={editorContent} onChange={setEditorContent} />
          </div>
        </section>
      </Container>
    </Layout>
  );
}
