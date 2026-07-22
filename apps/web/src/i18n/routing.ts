export const locales = ["zh", "en"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";
export const localeCookieName = "locale";

export function isValidLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}

export function replaceLocaleInPathname(pathname: string, locale: AppLocale) {
  const normalizedPathname = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (normalizedPathname === "/") {
    return `/${locale}`;
  }

  if (/^\/(zh|en)(\/|$)/.test(normalizedPathname)) {
    return normalizedPathname.replace(/^\/(zh|en)(?=\/|$)/, `/${locale}`);
  }

  return `/${locale}${normalizedPathname}`;
}
