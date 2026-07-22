import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/routing";

type BuildMetadataInput = {
  locale: AppLocale;
  pathname: string;
  title: string;
  description: string;
};

const defaultSiteUrl = "https://www.bainboiler.com";

function normalizeSiteUrl(siteUrl: string) {
  return siteUrl.replace(/\/+$/, "");
}

function normalizePathname(pathname: string) {
  if (!pathname || pathname === "/") {
    return "";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const siteUrl = normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl,
  );
  const pathname = normalizePathname(input.pathname);
  const currentUrl = `${siteUrl}/${input.locale}${pathname}`;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: currentUrl,
      languages: {
        "zh-CN": `${siteUrl}/zh${pathname}`,
        en: `${siteUrl}/en${pathname}`,
      },
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url: currentUrl,
      siteName: "BAIN BOILER",
      locale: input.locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
  };
}
