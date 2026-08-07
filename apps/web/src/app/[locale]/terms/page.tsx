import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getStaticPageCopy } from "../content-pages";
import { buildMetadata, buildPageTitle } from "@/lib/seo/build-metadata";

type TermsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: TermsPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = getStaticPageCopy(locale, "terms");
  return buildMetadata({
    locale,
    pathname: "/terms",
    title: buildPageTitle(locale, page.title),
    description: page.description,
    ogType: "article",
  });
}

export default async function TermsPage({ params }: TermsPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = getStaticPageCopy(locale, "terms");

  return <ContentPageShell title={page.title} description={page.description} />;
}
