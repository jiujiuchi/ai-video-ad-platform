import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "VidMotion — AI Video Ad Generator",
  description:
    "Turn product photos into high-quality video ads in 3 steps. Built for small business owners — no prompt engineering required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-bg-light text-slate-800 antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
