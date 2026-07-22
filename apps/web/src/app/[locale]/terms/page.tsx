import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getStaticPageCopy } from "../content-pages";

type TermsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: TermsPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = getStaticPageCopy(locale, "terms");

  return <ContentPageShell title={page.title} description={page.description} />;
}
