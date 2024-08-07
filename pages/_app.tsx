import "@/styles/globals.css";
import { fetcher } from "@/utils/fetcher";
import { NextUIProvider } from "@nextui-org/react";
import { getSession, SessionProvider, signOut } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  useEffect(() => {
    window.onfocus = async () => {
      if (router.pathname != "/") {
        const session = await getSession();

        if (!session) {
          await signOut({
            redirect: false,
          });

          router.push("/");
        }
      }
    };
  }, [router]);

  return (
    <NextUIProvider>
      <SessionProvider session={session} refetchOnWindowFocus={false}>
        <SWRConfig value={{ fetcher: fetcher }}>
          <Toaster position="top-right" />
          <NextNProgress color="#059669" />
          <Component {...pageProps} />
        </SWRConfig>
      </SessionProvider>
    </NextUIProvider>
  );
}
