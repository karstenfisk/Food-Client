"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Mulish } from "next/font/google";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={mulish.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
