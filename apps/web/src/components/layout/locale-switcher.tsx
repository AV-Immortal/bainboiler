"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeCookieName, replaceLocaleInPathname, type AppLocale } from "@/i18n/routing";

type LocaleSwitcherProps = {
  locale: AppLocale;
  labels: {
    zh: string;
    en: string;
  };
};

export function LocaleSwitcher({ locale, labels }: LocaleSwitcherProps) {
  const pathname = usePathname() ?? `/${locale}`;

  function setLocaleCookie(nextLocale: AppLocale) {
    document.cookie = `${localeCookieName}=${nextLocale};path=/;max-age=31536000;samesite=lax`;
  }

  const zhHref = replaceLocaleInPathname(pathname, "zh");
  const enHref = replaceLocaleInPathname(pathname, "en");

  return (
    <div className="flex items-center gap-2 text-sm text-slate-200">
      <Link
        href={zhHref}
        onClick={() => setLocaleCookie("zh")}
        className={locale === "zh" ? "text-white" : "transition hover:text-white"}
      >
        {labels.zh}
      </Link>
      <span className="text-white/30">/</span>
      <Link
        href={enHref}
        onClick={() => setLocaleCookie("en")}
        className={locale === "en" ? "text-white" : "transition hover:text-white"}
      >
        {labels.en}
      </Link>
    </div>
  );
}
