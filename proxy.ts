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

function hostnameOf(request: NextRequest): string {
  const host = request.headers.get("host") ?? "";
  return host.split(":")[0]?.toLowerCase() ?? "";
}

function isAtelierHost(hostname: string): boolean {
  return hostname.startsWith("atelier.");
}

function withLocaleHeaders(
  request: NextRequest,
  locale: Locale,
  vertical: "atelier" | "hospitality",
): Headers {
  const headers = new Headers(request.headers);
  headers.set("x-locale", locale);
  headers.set("x-flare-vertical", vertical);
  return headers;
}

function localeFromPath(pathname: string): Locale | null {
  const match = pathname.match(/^\/(en|ro)(?:\/|$)/);
  return match ? (match[1] as Locale) : null;
}

function redirectWithoutAtelierPrefix(
  request: NextRequest,
  pathname: string,
): NextResponse {
  const locale = getPreferredLocale(request);
  const after = pathname.slice("/atelier".length) || "/";
  const afterHasLocale = locales.some(
    (l) => after === `/${l}` || after.startsWith(`/${l}/`),
  );

  const url = request.nextUrl.clone();
  if (!afterHasLocale) {
    url.pathname = `/${locale}${after === "/" ? "" : after}`;
  } else {
    url.pathname = after;
  }
  return NextResponse.redirect(url);
}

export function proxy(request: NextRequest) {
  const hostname = hostnameOf(request);
  const { pathname } = request.nextUrl;

  // Legacy subdomain → apex path (Atelier is now the main site).
  if (isAtelierHost(hostname)) {
    const url = request.nextUrl.clone();
    url.hostname = hostname.replace(/^atelier\./, "www.");
    const rest =
      pathname === "/" || pathname === ""
        ? ""
        : pathname.startsWith("/atelier")
          ? pathname.slice("/atelier".length)
          : pathname;
    const restHasLocale = locales.some(
      (locale) => rest === `/${locale}` || rest.startsWith(`/${locale}/`),
    );
    if (!restHasLocale) {
      const locale = getPreferredLocale(request);
      url.pathname = `/${locale}${rest === "/" ? "" : rest}`;
    } else {
      url.pathname = rest;
    }
    return NextResponse.redirect(url);
  }

  // Legacy /atelier paths → root (Atelier is now the main site).
  if (
    pathname === "/atelier" ||
    pathname === "/atelier/" ||
    pathname.startsWith("/atelier/")
  ) {
    return redirectWithoutAtelierPrefix(request, pathname);
  }

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    const locale = getPreferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  const locale = localeFromPath(pathname) ?? defaultLocale;

  return NextResponse.next({
    request: {
      headers: withLocaleHeaders(request, locale, "atelier"),
    },
  });
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
