import "@/styles/globals.css";
import { clientFetcher } from "@/utils/fetcher";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <NextUIProvider>
      <SessionProvider session={session} refetchOnWindowFocus={false}>
        <SWRConfig value={{ fetcher: clientFetcher }}>
          <Toaster position="top-right" />
          <Component {...pageProps} />
        </SWRConfig>
      </SessionProvider>
    </NextUIProvider>
  );
}
