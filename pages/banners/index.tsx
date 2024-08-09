import Container from "@/components/wrapper/Container";
import Layout from "@/components/wrapper/Layout";
import { SuccessResponse } from "@/types/global.type";
import getCroppedImg from "@/utils/cropImage";
import { fetcher } from "@/utils/fetcher";
import { Button } from "@nextui-org/react";
import { FloppyDisk, Trash } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import Toast from "react-hot-toast";

export default function BannerPage({
  banners,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [client, setClient] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [file, setFile] = useState<string | ArrayBuffer | null>(
    banners.length ? banners[0].url : null,
  );
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  async function handleDeleteBanner() {
    if (!banners.length) return;

    if (!confirm("Apakah anda yakin")) return;

    try {
      await fetcher({
        url: `/dashboard/banners/${banners[0].id}`,
        method: "DELETE",
        token,
      });

      window.location.reload();
    } catch (error) {
      Toast.error("Hapus banner gagal");
      console.error(error);
    }
  }

  async function handleUpload() {
    try {
      const formData = new FormData();
      const croppedImage = await getCroppedImg(file, croppedAreaPixels);

      const response = await fetch(croppedImage as string);
      const blob = await response.blob();

      const fileConvert = new File([blob], "banners.jpg", {
        type: "image/jpg",
      });
      formData.append("banner", fileConvert);

      await fetcher({
        url: "/dashboard/banners",
        method: "POST",
        file: true,
        data: formData,
        token,
      });

      window.location.reload();
    } catch (error) {
      Toast.error("Upload gagal");
      console.error(error);
    }
  }

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) {
    return;
  }
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

          <div className="grid max-w-[500px] gap-4">
            <div className="inline-flex gap-2">
              <div className="aspect-video h-[300px] w-full rounded-[20px] border-[2px] border-dashed border-foreground-200 p-2">
                <div className="relative flex h-full items-center justify-center overflow-hidden rounded-xl bg-foreground-200">
                  <Cropper
                    image={file as string}
                    crop={crop}
                    zoom={zoom}
                    aspect={16 / 9}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>
              </div>
            </div>
            <p className="mt-1.5 text-[12px] font-medium italic text-foreground-600">
              * Preview banner
            </p>

            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <span className="inline-flex text-sm after:ml-[2px] after:text-danger after:content-['*']">
                  Cari Foto
                </span>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="rounded-xl bg-foreground-200 px-2 py-2 text-small text-foreground-600 file:mr-4 file:rounded-md file:border-0 file:bg-foreground-100 file:px-2 file:py-[2px] file:text-sm file:font-medium file:text-emerald-600 hover:file:bg-foreground-200"
                  onChange={(e) => {
                    if (!e.target.files) return;

                    const reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = function () {
                      setFile(reader.result);
                    };
                    reader.onerror = function (error) {
                      Toast.error("Terjadi kesalahan saat menginput gambar");
                      console.log(error);
                    };
                  }}
                />
              </div>

              <div className="flex items-center gap-2 justify-self-end">
                <Button
                  disabled={banners.length ? false : true}
                  variant="bordered"
                  color="danger"
                  startContent={<Trash weight="bold" size={20} />}
                  className="w-max font-semibold"
                  onClick={handleDeleteBanner}
                >
                  Hapus
                </Button>

                <Button
                  variant="solid"
                  startContent={<FloppyDisk weight="bold" size={20} />}
                  className="w-max bg-emerald-600 font-semibold text-white"
                  onClick={handleUpload}
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

export const getServerSideProps = (async ({ req }) => {
  const token = req.headers["access_token"] as string;
  const response: SuccessResponse<{ id: number; url: string }[]> =
    await fetcher({
      url: "/dashboard/banners",
      method: "GET",
      token,
    });

  return {
    props: {
      banners: response.data,
      token,
    },
  };
}) satisfies GetServerSideProps<{
  banners: { id: number; url: string }[];
  token: string;
}>;
