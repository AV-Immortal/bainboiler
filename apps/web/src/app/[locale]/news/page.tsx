import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getListPage } from "@/lib/cms/get-list-page";
import { buildMetadata, buildPageTitle } from "@/lib/seo/build-metadata";

type NewsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: NewsPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = await getListPage(locale, "news");
  return buildMetadata({
    locale,
    pathname: "/news",
    title: buildPageTitle(locale, page.title),
    description: page.description,
  });
}

export default async function NewsPage({ params }: NewsPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = await getListPage(locale, "news");

  return <ContentPageShell title={page.title} description={page.description} items={page.items} />;
}
