import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getStaticPageCopy } from "../content-pages";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: AboutPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = getStaticPageCopy(locale, "about");

  return <ContentPageShell title={page.title} description={page.description} />;
}
