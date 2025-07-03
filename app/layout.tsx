import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nabila Ahmad Studio - Distribution Music Platform",
  description:
    "Platform distribusi musik terdepan di Indonesia dengan AI canggih dan harga terjangkau",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
