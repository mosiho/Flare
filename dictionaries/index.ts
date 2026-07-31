import type { Locale } from "@/lib/i18n";
import en from "./en";
import ro from "./ro";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  ro,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
