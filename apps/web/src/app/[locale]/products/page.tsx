import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getListPage } from "@/lib/cms/get-list-page";

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProductsPage({ params }: ProductsPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = await getListPage(locale, "products");

  return <ContentPageShell title={page.title} description={page.description} items={page.items} />;
}
