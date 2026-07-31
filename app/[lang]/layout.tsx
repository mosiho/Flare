import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
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

  const dict = getDictionary(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL("https://flaremind.site"),
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

  return children;
}
