import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { getHomepage } from "@/lib/cms/get-homepage";
import { SanityModule } from "@/lib/cms/sanity-block-renderer";

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocaleHomePageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const { seo } = await getHomepage(locale);
  return buildMetadata({
    locale,
    pathname: "",
    title: seo.title,
    description: seo.description,
  });
}

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const { modules } = await getHomepage(locale);

  return <SanityModule modules={modules} locale={locale} />;
}
