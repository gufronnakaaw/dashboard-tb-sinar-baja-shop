import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import { DashboardProduct } from "@/types/product.type";
import { convertCodeItem } from "@/utils/convertCodeItem";
import getCroppedImg from "@/utils/cropImage";
import { fetcher } from "@/utils/fetcher";
import { Button } from "@nextui-org/react";
import { ArrowLeft, FloppyDisk } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import Toast from "react-hot-toast";
const EditorCK = dynamic(() => import("@/components/EditorCK"), { ssr: false });

export default function EditPage({
  product,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [editorContent, setEditorContent] = useState<string>(
    !product.deskripsi ? "" : product.deskripsi,
  );
  const [client, setClient] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [file, setFile] = useState<string | ArrayBuffer | null>(
    !product.image.length ? null : product.image[0].url,
  );
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  useEffect(() => {
    setClient(true);
  }, []);

  async function handleUpload() {
    try {
      const formData = new FormData();
      if (file == product.image[0]?.url) {
        formData.append("product", "");
      } else {
        const croppedImage = await getCroppedImg(file, croppedAreaPixels);

        const response = await fetch(croppedImage as string);
        const blob = await response.blob();

        const fileConvert = new File(
          [blob],
          `${convertCodeItem(product.kode_item)}.jpg`,
          {
            type: "image/jpg",
          },
        );

        formData.append("product", fileConvert);
      }

      formData.append("kode_item", product.kode_item);
      formData.append("deskripsi", editorContent);

      await fetcher({
        url: "/dashboard/products/image",
        method: "POST",
        file: true,
        data: formData,
        token,
      });

      Toast.success("Edit berhasil");

      setTimeout(() => {
        window.close();
      }, 1000);
    } catch (e) {
      Toast.error("Edit gagal");
      console.error(e);
    }
  }

  if (!client) {
    return;
  }

  return (
    <Layout title="Edit Product Page">
      <Container>
        <section className="grid max-w-[650px] gap-8">
          <Button
            variant="bordered"
            color="default"
            size="sm"
            startContent={<ArrowLeft weight="bold" size={14} />}
            onClick={() => window.close()}
            className="w-max font-medium"
          >
            Kembali
          </Button>

          <div className="grid gap-0.5">
            <p className="text-[14px] text-foreground-600">
              {product.kategori} - {product.kode_item}
            </p>
            <h1 className="max-w-[500px] text-[18px] font-semibold text-foreground">
              {product.nama_produk_asli}
            </h1>
          </div>

          <div className="grid gap-4">
            <div className="inline-flex gap-2">
              <div className="aspect-square h-[300px] w-[300px] rounded-[20px] border-[2px] border-dashed border-foreground-200 p-2">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-foreground-200">
                  <Cropper
                    image={file as string}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>
              </div>

              <p className="mt-6 text-[12px] font-medium italic text-foreground-400">
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
                onChange={(e) => {
                  if (!e.target.files) return;

                  const reader = new FileReader();
                  reader.readAsDataURL(e.target.files[0]);
                  reader.onload = function () {
                    setFile(reader.result);
                  };
                  reader.onerror = function (error) {
                    console.log("Error: ", error);
                  };
                }}
              />
            </div>
          </div>

          <div className="mb-14 grid gap-1.5">
            <span className="inline-flex text-sm after:ml-[2px] after:text-danger after:content-['*']">
              Deskripsi Produk
            </span>

            <EditorCK
              {...{ value: editorContent, onChange: setEditorContent }}
            />
          </div>

          <div className="flex items-center gap-2 justify-self-end">
            <Button
              variant="solid"
              startContent={<FloppyDisk weight="bold" size={20} />}
              className="w-max bg-emerald-600 font-semibold text-white"
              onClick={handleUpload}
            >
              Simpan
            </Button>
          </div>
        </section>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = (async ({ params, req }) => {
  const token = req.headers["access_token"] as string;
  const response: SuccessResponse<DashboardProduct> = await fetcher({
    url: `/dashboard/products/detail/${encodeURIComponent(params?.code as string)}`,
    method: "GET",
    token,
  });

  return {
    props: {
      product: response.data,
      token,
    },
  };
}) satisfies GetServerSideProps<{ product: DashboardProduct; token: string }>;
