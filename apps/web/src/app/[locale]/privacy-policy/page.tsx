import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getStaticPageCopy } from "../content-pages";

type PrivacyPolicyPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = getStaticPageCopy(locale, "privacy-policy");

  return <ContentPageShell title={page.title} description={page.description} />;
}
