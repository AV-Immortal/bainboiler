import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getStaticPageCopy } from "../content-pages";
import { buildMetadata, buildPageTitle } from "@/lib/seo/build-metadata";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ContactPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = getStaticPageCopy(locale, "contact");
  return buildMetadata({
    locale,
    pathname: "/contact",
    title: buildPageTitle(locale, page.title),
    description: page.description,
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = getStaticPageCopy(locale, "contact");

  return <ContentPageShell title={page.title} description={page.description} />;
}
