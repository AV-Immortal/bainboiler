import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getListPage } from "@/lib/cms/get-list-page";

type DownloadsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DownloadsPage({ params }: DownloadsPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = getListPage(locale, "downloads");

  return <ContentPageShell title={page.title} description={page.description} items={page.items} />;
}
