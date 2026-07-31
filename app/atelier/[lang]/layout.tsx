import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAtelierDictionary } from "@/dictionaries/atelier";
import { isLocale, locales } from "@/lib/i18n";

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

  const dict = getAtelierDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL("https://www.flaremind.site"),
    alternates: {
      languages: {
        en: "/atelier/en",
        ro: "/atelier/ro",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      images: [
        {
          url: "/images/atelier-hero-vitrine.jpg",
          width: 1536,
          height: 1024,
          alt: "Flare Atelier",
        },
      ],
      type: "website",
      locale: lang === "ro" ? "ro_RO" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      images: ["/images/atelier-hero-vitrine.jpg"],
    },
  };
}

export default async function AtelierLangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return children;
}
