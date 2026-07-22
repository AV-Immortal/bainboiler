import { NextRequest, NextResponse } from "next/server";
import { localeCookieName, replaceLocaleInPathname } from "@/i18n/routing";
import { resolveLocale } from "@/lib/i18n/resolve-locale";

const publicFilePattern = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    /^\/(zh|en)(\/|$)/.test(pathname) ||
    publicFilePattern.test(pathname)
  ) {
    return NextResponse.next();
  }

  const locale = resolveLocale({
    cookieLocale: request.cookies.get(localeCookieName)?.value,
    acceptLanguage: request.headers.get("accept-language"),
    countryCode: request.headers.get("x-vercel-ip-country"),
  });

  const nextUrl = request.nextUrl.clone();
  nextUrl.pathname = replaceLocaleInPathname(pathname, locale);

  return NextResponse.redirect(nextUrl);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
