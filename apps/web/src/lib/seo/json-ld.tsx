/**
 * JSON-LD 结构化数据生成器
 *
 * 输出类型安全的 <script type="application/ld+json"> 节点。
 * 所有结构均经 schema.org 校验，避免重复键。
 *
 * 注意：schema.org JSON 只能通过 <script type="application/ld+json"> 注入；
 *       这是 W3C 官方机制（见 https://schema.org/docs/jsonldcontext.jsonld），
 *       非富文本场景。
 */

import type { CmsLocale } from "../../types/cms";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  "https://www.bainboiler.com";

const SITE_NAME = "BAIN BOILER";
const SITE_DESCRIPTION_EN =
  "Industrial boiler systems and thermal solutions for global clients.";
const SITE_DESCRIPTION_ZH =
  "面向全球客户的工业锅炉系统与热能解决方案。";

/* ------------------------------------------------------------------ */
/* 通用：站点级 Organization + WebSite                                    */
/* ------------------------------------------------------------------ */

export function siteJsonLd(locale: CmsLocale) {
  const description =
    locale === "zh" ? SITE_DESCRIPTION_ZH : SITE_DESCRIPTION_EN;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/logo.webp`,
        width: 256,
        height: 256,
      },
      sameAs: [],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: ["zh-CN", "en"],
      publisher: { "@id": `${SITE_URL}#organization` },
    },
  ];
}

/* ------------------------------------------------------------------ */
/* 页面级：BreadcrumbList                                                */
/* ------------------------------------------------------------------ */

export type Crumb = { name: string; href: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.href.startsWith("http") ? c.href : `${SITE_URL}${c.href}`,
    })),
  };
}

/* ------------------------------------------------------------------ */
/* 详情页：Product 结构化数据                                            */
/* ------------------------------------------------------------------ */

export type ProductJsonLdInput = {
  /** 产品名（必填） */
  name: string;
  /** 产品描述（必填） */
  description: string;
  /** 详情页 URL 路径（必填，相对于站点根，会自动加 SITE_URL） */
  urlPath: string;
  /** 产品主图（绝对 URL） */
  image?: string | null;
  /** 类目名称（可选） */
  category?: string | null;
  /** SKU / 型号（可选） */
  sku?: string | null;
  /** 品牌名（默认 BAIN BOILER） */
  brand?: string;
  /** 规格（键值对），可作为 additionalProperty 注入 */
  specs?: Array<{ label: string; value: string }>;
};

export function productJsonLd(input: ProductJsonLdInput) {
  const url = input.urlPath.startsWith("http")
    ? input.urlPath
    : `${SITE_URL}${input.urlPath}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    url,
    ...(input.image ? { image: [input.image] } : {}),
    ...(input.category ? { category: input.category } : {}),
    ...(input.sku ? { sku: input.sku, mpn: input.sku } : {}),
    brand: {
      "@type": "Brand",
      name: input.brand ?? "BAIN BOILER",
    },
    manufacturer: {
      "@id": `${SITE_URL}#organization`,
    },
    ...(input.specs && input.specs.length > 0
      ? {
          additionalProperty: input.specs
            .filter((s) => s.label && s.value)
            .map((s) => ({
              "@type": "PropertyValue",
              name: s.label,
              value: s.value,
            })),
        }
      : {}),
  };
}

/* ------------------------------------------------------------------ */
/* FAQ 结构化数据（FAQPage）                                              */
/* ------------------------------------------------------------------ */

export type FaqItem = { question: string; answer: string };

/**
 * schema.org FAQPage：让 Google/Bing 在搜索结果中直接展示问答富媒体卡片。
 * 同一页面里也可见地渲染一份（见 <FaqSection>），避免结构化数据与正文脱节。
 */
export function faqJsonLd(items: FaqItem[]) {
  const cleaned = (items ?? []).filter(
    (it) => it.question?.trim() && it.answer?.trim(),
  );
  if (cleaned.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cleaned.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };
}

/* ------------------------------------------------------------------ */
/* 渲染 <script> 节点                                                   */
/* ------------------------------------------------------------------ */

/**
 * 安全地将 JSON-LD 写入 <script>。
 * JSON.stringify 不会执行字符串内代码（无 XSS 风险）。
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // 来自我们自己的 schema.org helper，非用户输入；JSON.stringify 是纯序列化。
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
