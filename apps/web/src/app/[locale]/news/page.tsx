import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getListPage } from "@/lib/cms/get-list-page";

type NewsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function NewsPage({ params }: NewsPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = getListPage(locale, "news");

  return <ContentPageShell title={page.title} description={page.description} items={page.items} />;
}
