"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  labels: { en: string; ro: string };
  label: string;
  basePath?: string;
};

export default function LanguageSwitcher({
  locale,
  labels,
  label,
  basePath = "",
}: Props) {
  const pathname = usePathname();
  const inferredBase = pathname.startsWith("/atelier") ? "/atelier" : "";
  const base = (basePath || inferredBase).replace(/\/$/, "");
  const withoutBase = base
    ? pathname.replace(new RegExp(`^${base}(?=/|$)`), "") || "/"
    : pathname;
  const rest = withoutBase.replace(/^\/(en|ro)/, "") || "";

  return (
    <div
      className="flex items-center gap-1.5 text-sm"
      role="navigation"
      aria-label={label}
    >
      {locales.map((l, index) => (
        <span key={l} className="flex items-center gap-1.5">
          {index > 0 ? (
            <span className="text-hero-fg/25" aria-hidden>
              /
            </span>
          ) : null}
          <Link
            href={`${base}/${l}${rest}`}
            hrefLang={l}
            lang={l}
            aria-current={locale === l ? "page" : undefined}
            className={
              locale === l
                ? "text-hero-fg"
                : "text-hero-muted transition-colors hover:text-hero-fg"
            }
          >
            {labels[l]}
          </Link>
        </span>
      ))}
    </div>
  );
}
