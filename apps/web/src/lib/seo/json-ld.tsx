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
