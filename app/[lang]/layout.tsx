import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Bodoni_Moda, DM_Sans, Fraunces } from "next/font/google";
import { getDictionary } from "@/dictionaries";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import "../globals.css";

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

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL("https://flare.hospitality"),
    alternates: {
      languages: {
        en: "/en",
        ro: "/ro",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      images: [
        { url: "/images/og-share.jpg", width: 1920, height: 1080, alt: "Flare" },
      ],
      type: "website",
      locale: lang === "ro" ? "ro_RO" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      images: ["/images/og-share.jpg"],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang as Locale}
      className={`${fraunces.variable} ${dmSans.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-fg font-sans">{children}</body>
    </html>
  );
}
