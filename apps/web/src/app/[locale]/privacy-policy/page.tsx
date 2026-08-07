import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getStaticPageCopy } from "../content-pages";
import { buildMetadata, buildPageTitle } from "@/lib/seo/build-metadata";

type PrivacyPolicyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PrivacyPolicyPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = getStaticPageCopy(locale, "privacy-policy");
  return buildMetadata({
    locale,
    pathname: "/privacy-policy",
    title: buildPageTitle(locale, page.title),
    description: page.description,
    ogType: "article",
  });
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = getStaticPageCopy(locale, "privacy-policy");

  return <ContentPageShell title={page.title} description={page.description} />;
}
