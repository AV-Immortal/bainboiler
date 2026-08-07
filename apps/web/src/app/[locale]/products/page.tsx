import { ContentPageShell, resolveRouteLocale } from "../content-page-shell";
import { getListPage } from "@/lib/cms/get-list-page";
import { getMessages } from "@/i18n/messages";
import { buildMetadata, buildPageTitle } from "@/lib/seo/build-metadata";
import {
  BoilerTypeGrid,
  IndustryList,
  WhyChooseUsGrid,
  SeoIntro,
} from "@/components/seo-content";
import { FaqSection } from "@/components/faq-section";

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ProductsPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = await getListPage(locale, "products");
  // 列表页 description 用 CMS / fallback 文本，保持简洁；
  // 详情正文关键词由页面正文 + FAQ + 结构化数据提供。
  return buildMetadata({
    locale,
    pathname: "/products",
    title: buildPageTitle(locale, page.title),
    description: page.description,
  });
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const locale = await resolveRouteLocale(params);
  const page = await getListPage(locale, "products");
  const messages = getMessages(locale);
  const seo = messages.seo.products;

  return (
    <>
      {/* 列表页主体（标题 / 描述 / CMS 拉来的产品卡片） */}
      <ContentPageShell
        title={page.title}
        description={page.description}
        items={page.items}
      />

      {/* 长尾关键词正文段落（搜索引擎抓取用） */}
      <section className="bg-white px-6 pb-4 pt-2">
        <div className="mx-auto max-w-6xl">
          <SeoIntro text={seo.intro} />
        </div>
      </section>

      {/* 工业锅炉炉型总览 */}
      <BoilerTypeGrid section={seo.boilerTypes} />

      {/* 应用行业 */}
      <IndustryList section={seo.industries} />

      {/* 为什么选我们 */}
      <WhyChooseUsGrid section={seo.why} />

      {/* FAQ + JSON-LD */}
      <FaqSection title={seo.faq.title} items={seo.faq.items} />
    </>
  );
}
