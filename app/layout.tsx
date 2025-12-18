import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "ENRICH - Farmatsevtika kompaniyasi",
  description: "Sog'lom hayot uchun sifatli dorilar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
