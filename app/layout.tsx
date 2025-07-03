import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stack Auth App",
  description: "A Next.js app with Stack Auth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
