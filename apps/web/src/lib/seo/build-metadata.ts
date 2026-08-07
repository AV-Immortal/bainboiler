import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/routing";

type BuildMetadataInput = {
  locale: AppLocale;
  pathname: string;
  title: string;
  description: string;
  /**
   * 详情页可提供，渲染成 <meta property="og:image"> 与 twitter:card
   * 必须是绝对 URL（Next.js 会原样写入）
   */
  ogImage?: string;
  /**
   * 详情页可指定 openGraph.type（如 "article"），默认 "website"
   */
  ogType?: "website" | "article";
  /**
   * 详情页（article）可选发布时间（ISO），未提供则不输出
   */
  publishedTime?: string;
};

const defaultSiteUrl = "https://www.bainboiler.com";

/**
 * 站点级兜底 OG 图。当详情页没传 ogImage 时，搜索引擎抓取 og:image
 * 不会落空，社交分享也能取到一张正方形 logo 而不是空白。
 */
export const DEFAULT_OG_IMAGE = `${defaultSiteUrl}/brand/og-default.webp`;

/**
 * 站点级 OG 图基础宽度（仅用于 og:image:width，不影响实际图片）
 */
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

function normalizeSiteUrl(siteUrl: string) {
  return siteUrl.replace(/\/+$/, "");
}

function normalizePathname(pathname: string) {
  if (!pathname || pathname === "/") {
    return "";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

/**
 * 品牌后缀常量。详情页/列表页生成 metadata 时统一用：
 *   buildPageTitle(locale, "产品中心") → "产品中心 | 百恩锅炉"
 *   buildPageTitle(locale, "Products") → "Products | BAIN BOILER"
 */
const BRAND_TITLE: Record<AppLocale, string> = {
  zh: "百恩锅炉",
  en: "BAIN BOILER",
};

export function buildPageTitle(locale: AppLocale, pageTitle: string) {
  const cleaned = pageTitle.trim();
  if (!cleaned) return BRAND_TITLE[locale];
  if (cleaned === BRAND_TITLE[locale] || cleaned.includes(BRAND_TITLE[locale])) {
    return cleaned;
  }
  return `${cleaned} | ${BRAND_TITLE[locale]}`;
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const siteUrl = normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl,
  );
  const pathname = normalizePathname(input.pathname);
  const currentUrl = `${siteUrl}/${input.locale}${pathname}`;
  const ogType = input.ogType ?? "website";
  // 详情页无 hero 图时仍输出 og:image，避免社交分享卡片空白
  const ogImage = input.ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: currentUrl,
      languages: {
        "zh-CN": `${siteUrl}/zh${pathname}`,
        en: `${siteUrl}/en${pathname}`,
      },
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url: currentUrl,
      siteName: "BAIN BOILER",
      locale: input.locale === "zh" ? "zh_CN" : "en_US",
      type: ogType,
      images: [
        {
          url: ogImage,
          width: DEFAULT_OG_IMAGE_WIDTH,
          height: DEFAULT_OG_IMAGE_HEIGHT,
          alt: BRAND_TITLE[input.locale],
        },
      ],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [ogImage],
    },
  };
}

