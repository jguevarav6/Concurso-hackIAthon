import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Copago AI",
  description: "Estimador agentico de copago y cobertura para pacientes demo"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
