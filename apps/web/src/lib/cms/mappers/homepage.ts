import { homepageFallbackModules } from "../homepage-fallback";

/* ------------------------------------------------------------------ */
/* Sanity GROQ 投影的类型（与 sanity/queries.ts 的 homepageQuery 对齐） */
/* ------------------------------------------------------------------ */

type LocaleString = { zh?: string | null; en?: string | null } | null | undefined;
type LocaleText = { zh?: string | null; en?: string | null } | null | undefined;

export type SanityStatItem = { label?: LocaleString; value?: string | null };

export type SanityCardItem = {
  title?: LocaleString;
  description?: LocaleText;
  meta?: LocaleString;
  href?: string | null;
  coverImageUrl?: string | null;
};

export type SanityHeroVideo = {
  _type: "homepage.heroVideo";
  _key: string;
  eyebrow?: LocaleString;
  headline?: LocaleString;
  subheadline?: LocaleText;
  primaryCta?: LocaleString;
  primaryCtaHref?: string | null;
  secondaryCta?: LocaleString;
  secondaryCtaHref?: string | null;
  videoUrl?: string | null;
  posterUrl?: string | null;
  // 背景配置（来自 Sanity）
  backgroundType?: "color" | "gradient" | "image" | null;
  backgroundColor?: string | null;
  backgroundGradient?: { from?: string | null; to?: string | null; angle?: number | null } | null;
  // 保留 Sanity 原始 image 引用，让前端用 urlFor 构造 URL
  backgroundImage?: unknown;
  backgroundOverlayOpacity?: number | null;
};

export type SanityBrandStats = {
  _type: "homepage.brandStats";
  _key: string;
  items?: SanityStatItem[] | null;
};

export type SanityCompanyIntro = {
  _type: "homepage.companyIntro";
  _key: string;
  eyebrow?: LocaleString;
  title?: LocaleString;
  description?: LocaleText;
  highlights?: SanityStatItem[] | null;
};

export type SanityCardList = {
  _type:
    | "homepage.productCategories"
    | "homepage.industrySolutions"
    | "homepage.projectShowcase"
    | "homepage.latestNews";
  _key: string;
  eyebrow?: LocaleString;
  title?: LocaleString;
  description?: LocaleText;
  items?: SanityCardItem[] | null;
};

export type SanityCertificatesExport = {
  _type: "homepage.certificatesExport";
  _key: string;
  eyebrow?: LocaleString;
  title?: LocaleString;
  description?: LocaleText;
  items?: LocaleString[] | null;
  primaryCta?: LocaleString;
};

export type SanityFeaturedVideo = {
  _type: "homepage.featuredVideo";
  _key: string;
  eyebrow?: LocaleString;
  title?: LocaleString;
  description?: LocaleText;
  videoUrl?: string | null;
  posterUrl?: string | null;
  primaryCta?: LocaleString;
};

export type SanityContactCta = {
  _type: "homepage.contactCta";
  _key: string;
  eyebrow?: LocaleString;
  title?: LocaleString;
  description?: LocaleText;
  primaryCta?: LocaleString;
  secondaryCta?: LocaleString;
};

export type SanityGlobalPresence = {
  _type: "homepage.globalPresence";
  _key: string;
  eyebrow?: LocaleString;
  title?: LocaleString;
  description?: LocaleText;
  stats?: SanityStatItem[] | null;
};

export type SanityHomepageModule =
  | SanityHeroVideo
  | SanityBrandStats
  | SanityCompanyIntro
  | SanityCardList
  | SanityCertificatesExport
  | SanityFeaturedVideo
  | SanityContactCta
  | SanityGlobalPresence;

export type SanityHomepageResult = {
  slug: string;
  title: LocaleString;
  modules: SanityHomepageModule[];
  seo?: { title?: LocaleString; description?: LocaleText } | null;
};

/* ------------------------------------------------------------------ */
/* helpers（保留为测试/调试用）                                          */
/* ------------------------------------------------------------------ */

export function pickLocale(
  field: LocaleString | LocaleText | undefined,
  locale: "zh" | "en",
): string {
  if (!field) return "";
  const value = (field as Record<string, string | null | undefined>)[locale];
  if (typeof value === "string" && value.trim() !== "") return value;
  const otherLocale: "zh" | "en" = locale === "zh" ? "en" : "zh";
  const other = (field as Record<string, string | null | undefined>)[otherLocale];
  return typeof other === "string" ? other : "";
}

/* ------------------------------------------------------------------ */
/* 保留 fallback 重导出（让 React 组件可直接 import）                  */
/* ------------------------------------------------------------------ */

export { homepageFallbackModules };
