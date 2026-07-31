import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

const VERTICAL_COOKIE = "flare-vertical";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

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

function isLocalHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".localhost")
  );
}

function isAtelierVertical(request: NextRequest): boolean {
  const hostname = hostnameOf(request);
  if (isAtelierHost(hostname)) return true;

  const { pathname } = request.nextUrl;
  if (pathname === "/atelier" || pathname.startsWith("/atelier/")) return true;

  if (!isLocalHost(hostname)) return false;

  const param = request.nextUrl.searchParams.get("vertical");
  if (param === "atelier") return true;
  if (param === "hospitality") return false;

  return request.cookies.get(VERTICAL_COOKIE)?.value === "atelier";
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

function setVerticalCookie(
  response: NextResponse,
  vertical: "atelier" | "hospitality",
) {
  if (vertical === "atelier") {
    response.cookies.set(VERTICAL_COOKIE, "atelier", {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  } else {
    response.cookies.delete(VERTICAL_COOKIE);
  }
}

export function proxy(request: NextRequest) {
  const hostname = hostnameOf(request);
  const { pathname } = request.nextUrl;
  const verticalParam = request.nextUrl.searchParams.get("vertical");

  // Local preview: ?vertical=atelier|hospitality sets cookie and strips the query.
  if (
    isLocalHost(hostname) &&
    (verticalParam === "atelier" || verticalParam === "hospitality")
  ) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("vertical");
    const response = NextResponse.redirect(url);
    setVerticalCookie(
      response,
      verticalParam === "atelier" ? "atelier" : "hospitality",
    );
    return response;
  }

  // Direct /atelier/... preview → public path + atelier cookie (local), then rewrite.
  if (pathname === "/atelier" || pathname.startsWith("/atelier/")) {
    const stripped = pathname.replace(/^\/atelier/, "") || "/";
    const url = request.nextUrl.clone();
    url.pathname = stripped;

    // Ensure locale on the public URL before rewrite on the next hop.
    const strippedHasLocale = locales.some(
      (locale) =>
        stripped === `/${locale}` || stripped.startsWith(`/${locale}/`),
    );

    if (!strippedHasLocale) {
      const locale = getPreferredLocale(request);
      url.pathname = `/${locale}${stripped === "/" ? "" : stripped}`;
    }

    const response = NextResponse.redirect(url);
    if (isLocalHost(hostname) || isAtelierHost(hostname)) {
      setVerticalCookie(response, "atelier");
    }
    return response;
  }

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    const locale = getPreferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.redirect(url);
    if (isAtelierVertical(request)) {
      setVerticalCookie(response, "atelier");
    }
    return response;
  }

  const locale = (locales.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  ) ?? defaultLocale) as Locale;

  const rest = pathname.replace(new RegExp(`^/${locale}`), "") || "";
  const atelier = isAtelierVertical(request);

  if (atelier) {
    const url = request.nextUrl.clone();
    url.pathname = `/atelier/${locale}${rest}`;
    const response = NextResponse.rewrite(url, {
      request: {
        headers: withLocaleHeaders(request, locale, "atelier"),
      },
    });
    if (isLocalHost(hostname)) {
      setVerticalCookie(response, "atelier");
    }
    return response;
  }

  return NextResponse.next({
    request: {
      headers: withLocaleHeaders(request, locale, "hospitality"),
    },
  });
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
