import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  memoryWords,
  getDictionary,
} from "@/dictionaries";
import { isLocale } from "@/lib/i18n";
import SignIn from "@/components/SignIn";

const BRAND = "Flare Atelier";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);
  return {
    title: dict.meta.signInTitle,
    description: dict.meta.signInDescription,
  };
}

export default async function SignInPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  return (
    <SignIn
      locale={lang}
      dict={dict}
      brand={BRAND}
      atmosphere={{
        imageSrc: "/images/atelier-hero-vitrine.jpg",
        imageAlt:
          lang === "ro"
            ? "Vitrină cu ceasuri și bijuterii rare; colecție de mașini clasice estompată prin sticlă"
            : "Showcase of rare watches and jewelry; blurred classic car collection through the glass",
        memoryWords: memoryWords[lang],
        imagePosition: "50% 48%",
        emberAt: "50% 55%",
      }}
    />
  );
}
