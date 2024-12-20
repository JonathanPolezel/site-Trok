// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { fontSans, fontMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trok!",
  description: "Serviços na palma da sua mão",
  icons: {
    icon: "/favicon.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
