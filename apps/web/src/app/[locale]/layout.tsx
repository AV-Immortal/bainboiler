import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { isValidLocale, locales } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/build-metadata";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<LocaleLayoutProps, "params">) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return buildMetadata({
    locale,
    pathname: "",
    title: locale === "zh" ? "上海百恩锅炉有限公司" : "BAIN BOILER",
    description:
      locale === "zh"
        ? "面向全球客户的工业锅炉系统与热能解决方案。"
        : "Industrial boiler systems and thermal solutions for global clients.",
  });
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <>
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </>
  );
}
