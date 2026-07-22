import { ContentPageShell } from "../../content-page-shell";
import { getProductDetailPageCopy } from "../../content-pages";
import { isValidLocale } from "@/i18n/routing";
import { notFound } from "next/navigation";

type ProductDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const page = getProductDetailPageCopy(locale, slug);

  return <ContentPageShell title={page.title} description={page.description} />;
}
