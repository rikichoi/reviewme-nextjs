import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingTemplate from "./(main)/LoadingTemplate";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ReviewMe - Review Board",
  description:
    "Review Board for anything. Share your thoughts and experiences with others.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#fcfbf3] font-[family-name:var(--font-geist-sans)]`}
      >
        <Navbar />
        <Suspense fallback={<LoadingTemplate />}>
          <main className="">{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
