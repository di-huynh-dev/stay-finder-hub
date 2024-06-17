import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StayFinder",
  description:
    "Discover the perfect stay with StayFinder, your go-to platform for effortless hotel booking. Whether you’re planning a weekend getaway, a business trip, or a family vacation, StayFinder offers a seamless experience to find and reserve the ideal accommodation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
