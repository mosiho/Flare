import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries";
import en from "./en";
import ro from "./ro";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  ro,
};

export function getAtelierDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export const atelierMemoryWords = {
  en: [
    "blue dial, declined",
    "grandmother's ring",
    "private viewing",
    "estate chronograph",
    "returned in spring",
    "heirloom reset",
    "collector, quiet taste",
  ],
  ro: [
    "cadran albastru, refuzat",
    "inelul bunicii",
    "vizionare privată",
    "cronograf de epocă",
    "întoarsă în primăvară",
    "moștenire resetată",
    "colecționar, gust liniștit",
  ],
} as const satisfies Record<Locale, readonly string[]>;
