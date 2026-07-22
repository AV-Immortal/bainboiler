import { defaultLocale, isValidLocale, type AppLocale } from "@/i18n/routing";

type ResolveLocaleInput = {
  cookieLocale?: string | null;
  acceptLanguage?: string | null;
  countryCode?: string | null;
};

export type Locale = AppLocale;

const languageToLocaleMap: Record<string, Locale> = {
  en: "en",
  zh: "zh",
};

function normalizeLocale(value?: string | null) {
  if (!value) {
    return null;
  }

  const loweredValue = value.toLowerCase();

  if (isValidLocale(loweredValue)) {
    return loweredValue;
  }

  const [languageCode] = loweredValue.split("-");

  return languageToLocaleMap[languageCode] ?? null;
}

export function resolveLocale(input: ResolveLocaleInput): Locale {
  const cookieLocale = normalizeLocale(input.cookieLocale);

  if (cookieLocale) {
    return cookieLocale;
  }

  if (input.countryCode?.toUpperCase() === "CN") {
    return "zh";
  }

  if (input.acceptLanguage) {
    const acceptedLanguages = input.acceptLanguage
      .split(",")
      .map((item) => item.trim().split(";")[0])
      .map((item) => normalizeLocale(item))
      .filter((item): item is Locale => item !== null);

    const detectedLocale = acceptedLanguages.find(Boolean);

    if (detectedLocale) {
      return detectedLocale;
    }
  }

  return defaultLocale;
}
