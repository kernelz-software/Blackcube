import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/types/i18n";

function detectLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");

  if (!header) {
    return defaultLocale;
  }

  const accepted = header
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");
      return {
        tag: tag.toLowerCase(),
        quality: quality ? Number.parseFloat(quality) : 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of accepted) {
    if (tag === "ar" || tag.startsWith("ar-")) {
      return "ar";
    }
    if (tag === "en" || tag.startsWith("en-")) {
      return "en";
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
