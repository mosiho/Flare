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

export function proxy(request: NextRequest) {
  const hostname = hostnameOf(request);
  const { pathname } = request.nextUrl;

  // Legacy subdomain → path on apex (www if present in host family).
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
      url.pathname = `/atelier/${locale}${rest === "/" ? "" : rest}`;
    } else {
      url.pathname = `/atelier${rest}`;
    }
    return NextResponse.redirect(url);
  }

  // Path vertical: /atelier → /atelier/{locale}
  if (pathname === "/atelier" || pathname === "/atelier/") {
    const locale = getPreferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/atelier/${locale}`;
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/atelier/")) {
    const after = pathname.slice("/atelier".length) || "/";
    const afterHasLocale = locales.some(
      (locale) => after === `/${locale}` || after.startsWith(`/${locale}/`),
    );

    if (!afterHasLocale) {
      const locale = getPreferredLocale(request);
      const url = request.nextUrl.clone();
      url.pathname = `/atelier/${locale}${after === "/" ? "" : after}`;
      return NextResponse.redirect(url);
    }

    const locale = localeFromPath(after) ?? defaultLocale;
    return NextResponse.next({
      request: {
        headers: withLocaleHeaders(request, locale, "atelier"),
      },
    });
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
      headers: withLocaleHeaders(request, locale, "hospitality"),
    },
  });
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
