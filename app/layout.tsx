import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AYBU Store",
  description: "AYBU Store modern Next.js storefront",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
