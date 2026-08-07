import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getStaticPageCopy } from "../content-pages";
import { buildMetadata, buildPageTitle } from "@/lib/seo/build-metadata";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = getStaticPageCopy(locale, "about");
  return buildMetadata({
    locale,
    pathname: "/about",
    title: buildPageTitle(locale, page.title),
    description: page.description,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = getStaticPageCopy(locale, "about");

  return <ContentPageShell title={page.title} description={page.description} />;
}
