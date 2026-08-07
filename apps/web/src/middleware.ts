import { NextRequest, NextResponse } from "next/server";
import { localeCookieName, replaceLocaleInPathname, isValidLocale } from "@/i18n/routing";
import { resolveLocale } from "@/lib/i18n/resolve-locale";

const publicFilePattern = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 不处理 /api、_next、静态文件
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    publicFilePattern.test(pathname)
  ) {
    return setLocaleHeaders(NextResponse.next(), request, "zh");
  }

  // 已带语言前缀的请求：注入 x-locale / x-pathname 后放行
  const localeMatch = pathname.match(/^\/(zh|en)(\/|$)/);
  if (localeMatch) {
    const locale = isValidLocale(localeMatch[1]) ? localeMatch[1] : "zh";
    return setLocaleHeaders(NextResponse.next(), request, locale);
  }

  // 无语言前缀：解析后 302 到 /zh 或 /en
  const locale = resolveLocale({
    cookieLocale: request.cookies.get(localeCookieName)?.value,
    acceptLanguage: request.headers.get("accept-language"),
    countryCode: request.headers.get("x-vercel-ip-country"),
  });

  const nextUrl = request.nextUrl.clone();
  nextUrl.pathname = replaceLocaleInPathname(pathname, locale);

  return setLocaleHeaders(NextResponse.redirect(nextUrl), request, locale);
}

/**
 * 给 response 注入 x-locale / x-pathname，
 * 供根布局（app/layout.tsx）读取以决定 <html lang> 与 JSON-LD 文案。
 */
function setLocaleHeaders(
  response: NextResponse,
  request: NextRequest,
  locale: string,
) {
  response.headers.set("x-locale", locale);
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
