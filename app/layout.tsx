import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/src/contexts/AuthContext";

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
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
