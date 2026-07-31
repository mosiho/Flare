import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

function getPreferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, qValue] = part.trim().split(";q=");
      return {
        tag: tag.trim().toLowerCase(),
        q: qValue ? Number(qValue) : 1,
      };
    })
    .filter((part) => part.tag && !Number.isNaN(part.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
    if (tag.startsWith("ro")) return "ro";
    if (tag.startsWith("en")) return "en";
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
