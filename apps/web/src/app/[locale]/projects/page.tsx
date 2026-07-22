import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getListPage } from "@/lib/cms/get-list-page";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = getListPage(locale, "projects");

  return <ContentPageShell title={page.title} description={page.description} items={page.items} />;
}
