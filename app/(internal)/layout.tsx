import type React from "react";
import "@/app/(internal)/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import { InternalSidebar } from "@/components/internal-sidebar";
import { InternalTopbar } from "@/components/internal-topbar";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <InternalTopbar />
        <SidebarProvider>
          <InternalSidebar />
          <main className="flex justify-center w-full mt-16">
            <div className="container">{children}</div>
          </main>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
