import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getListPage } from "@/lib/cms/get-list-page";
import { buildMetadata, buildPageTitle } from "@/lib/seo/build-metadata";

type VideosPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: VideosPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = await getListPage(locale, "videos");
  return buildMetadata({
    locale,
    pathname: "/videos",
    title: buildPageTitle(locale, page.title),
    description: page.description,
  });
}

export default async function VideosPage({ params }: VideosPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = await getListPage(locale, "videos");

  return <ContentPageShell title={page.title} description={page.description} items={page.items} />;
}
