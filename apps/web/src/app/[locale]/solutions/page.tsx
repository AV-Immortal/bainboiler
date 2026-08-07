import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getListPage } from "@/lib/cms/get-list-page";
import { getMessages } from "@/i18n/messages";
import { buildMetadata, buildPageTitle } from "@/lib/seo/build-metadata";
import { SeoIntro } from "@/components/seo-content";

type SolutionsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: SolutionsPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = await getListPage(locale, "solutions");
  return buildMetadata({
    locale,
    pathname: "/solutions",
    title: buildPageTitle(locale, page.title),
    description: page.description,
  });
}

export default async function SolutionsPage({ params }: SolutionsPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = await getListPage(locale, "solutions");
  const messages = getMessages(locale);

  return (
    <>
      <ContentPageShell
        title={page.title}
        description={page.description}
        items={page.items}
      />
      <section className="bg-white px-6 pb-16 pt-2 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <SeoIntro text={messages.seo.solutions.intro} />
        </div>
      </section>
    </>
  );
}
