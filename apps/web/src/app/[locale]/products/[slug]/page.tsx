import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/routing";
import { buildMetadata, buildPageTitle } from "@/lib/seo/build-metadata";
import { getDetail } from "@/lib/cms/get-product";
import { tryGetSanityClient } from "../../../../../sanity/client";
import { getProductDetailPageCopy } from "../../content-pages";
import { getMessages } from "@/i18n/messages";
import { Breadcrumb } from "@/components/breadcrumb";
import { FaqSection } from "@/components/faq-section";
import { JsonLd, productJsonLd } from "@/lib/seo/json-ld";

type ProductDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  // 优先从 Sanity 取真实数据（如果可访问）；否则用 fallback copy
  const client = tryGetSanityClient();
  let title: string;
  let description: string;
  let ogImage: string | undefined;
  let ogType: "website" | "article" = "website";
  let publishedTime: string | undefined;

  if (client) {
    try {
      const detail = await getDetail(locale, "products", slug);
      if (detail) {
        title = detail.title;
        description = detail.summary;
        ogImage = detail.heroImageUrl ?? undefined;
        ogType = "article";
        // 详情模型暂未在 mapper 暴露 publishedAt，先留空
      } else {
        const fallback = getProductDetailPageCopy(locale, slug);
        title = fallback.title;
        description = fallback.description;
      }
    } catch {
      const fallback = getProductDetailPageCopy(locale, slug);
      title = fallback.title;
      description = fallback.description;
    }
  } else {
    const fallback = getProductDetailPageCopy(locale, slug);
    title = fallback.title;
    description = fallback.description;
  }

  return buildMetadata({
    locale,
    pathname: `/products/${slug}`,
    title: buildPageTitle(locale, title),
    description,
    ogImage,
    ogType,
    publishedTime,
  });
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const page = getProductDetailPageCopy(locale, slug);
  const messages = getMessages(locale);

  // 可见面包屑 + JSON-LD BreadcrumbList（自动通过 Breadcrumb 组件注入）
  const breadcrumbItems = [
    { name: messages.breadcrumb.home, href: `/${locale}` },
    { name: messages.breadcrumb.products, href: `/${locale}/products` },
    { name: page.title, href: `/${locale}/products/${slug}` },
  ];

  // Product JSON-LD：详情页核心结构化数据，搜索引擎富媒体结果用
  const productLd = productJsonLd({
    name: page.title,
    description: page.description,
    urlPath: `/${locale}/products/${slug}`,
    category: messages.breadcrumb.products,
  });

  return (
    <>
      <JsonLd data={productLd} />
      <section className="bg-white px-6 py-16 text-slate-950 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            {page.description}
          </p>
        </div>
      </section>
      {/* FAQ 沿用产品中心 FAQ 列表，每个产品详情页都附一份，
          便于 Google 富媒体问答卡片抓取。 */}
      <FaqSection
        title={messages.seo.products.faq.title}
        items={messages.seo.products.faq.items}
      />
    </>
  );
}
