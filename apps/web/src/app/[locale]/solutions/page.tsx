import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getListPage } from "@/lib/cms/get-list-page";

type SolutionsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SolutionsPage({ params }: SolutionsPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = await getListPage(locale, "solutions");

  return <ContentPageShell title={page.title} description={page.description} items={page.items} />;
}
