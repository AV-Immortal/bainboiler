import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getListPage } from "@/lib/cms/get-list-page";

type VideosPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function VideosPage({ params }: VideosPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = await getListPage(locale, "videos");

  return <ContentPageShell title={page.title} description={page.description} items={page.items} />;
}
