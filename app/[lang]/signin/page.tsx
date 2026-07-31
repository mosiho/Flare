import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { isLocale } from "@/lib/i18n";
import SignIn from "@/components/SignIn";

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
  return <SignIn locale={lang} dict={dict} />;
}
