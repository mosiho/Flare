import type { Viewport } from "next";
import { headers } from "next/headers";
import { Bodoni_Moda, DM_Sans, Fraunces } from "next/font/google";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: "#F7F4EF",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const raw = headerList.get("x-locale") ?? "en";
  const lang: Locale = isLocale(raw) ? raw : "en";

  return (
    <html
      lang={lang}
      className={`${fraunces.variable} ${dmSans.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-fg font-sans">{children}</body>
    </html>
  );
}
