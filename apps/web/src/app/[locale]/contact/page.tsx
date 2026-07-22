import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getStaticPageCopy } from "../content-pages";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: ContactPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = getStaticPageCopy(locale, "contact");

  return <ContentPageShell title={page.title} description={page.description} />;
}
