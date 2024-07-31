import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="flex h-screen">
        <Sidebar sidebarOpen={sidebarOpen} />

        <div className="grid w-full">
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="overflow-y-scroll scrollbar-hide">
            <div className="mx-auto w-full max-w-[1200px] p-6">{children}</div>

            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
