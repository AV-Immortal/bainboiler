import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getListPage } from "@/lib/cms/get-list-page";
import { buildMetadata, buildPageTitle } from "@/lib/seo/build-metadata";

type DownloadsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: DownloadsPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = await getListPage(locale, "downloads");
  return buildMetadata({
    locale,
    pathname: "/downloads",
    title: buildPageTitle(locale, page.title),
    description: page.description,
  });
}

export default async function DownloadsPage({ params }: DownloadsPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = await getListPage(locale, "downloads");

  return <ContentPageShell title={page.title} description={page.description} items={page.items} />;
}
