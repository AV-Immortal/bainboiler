import type { CmsLocale, ContentListItem } from "../../../types/cms";

/* ------------------------------------------------------------------ */
/* Sanity GROQ 投影类型（与 sanity/queries.ts 对齐）                    */
/* ------------------------------------------------------------------ */

type LocaleString = { zh?: string | null; en?: string | null } | null | undefined;
type LocaleText = { zh?: string | null; en?: string | null } | null | undefined;

type SanityListItem = {
  slug: string;
  title: LocaleString;
  summary: LocaleText;
  category?: LocaleString;
  heroImageUrl?: string | null;
};

type SanityStatItem = { label?: LocaleString; value?: string | null };
type SanityCardItem = {
  title?: LocaleString;
  description?: LocaleText;
  meta?: LocaleString;
  href?: string | null;
};

export type SanityDetail = {
  slug: string;
  title: LocaleString;
  summary: LocaleText;
  category?: LocaleString;
  country?: LocaleString;
  industry?: LocaleString;
  boilerType?: LocaleString;
  painPoints?: LocaleString[] | null;
  recommendedProducts?: LocaleString[] | null;
  caseStudySummary?: LocaleText;
  resultHighlights?: SanityStatItem[] | null;
  highlights?: SanityCardItem[] | null;
  specs?: SanityStatItem[] | null;
  heroImageUrl?: string | null;
  gallery?: Array<{ url: string; alt?: string | null }> | null;
  videoUrl?: string | null;
  downloadUrl?: string | null;
  relatedProductSlug?: string | null;
  seo?: { title?: LocaleString; description?: LocaleText } | null;
};

/* ------------------------------------------------------------------ */
/* Detail view model                                                   */
/* ------------------------------------------------------------------ */

export type DetailViewModel = {
  slug: string;
  title: string;
  summary: string;
  category: string | null;
  heroImageUrl: string | null;
  gallery: Array<{ url: string; alt: string }>;
  videoUrl: string | null;
  downloadUrl: string | null;
  relatedProductSlug: string | null;
  // 以下字段为不同 section 专属，不存在时为 null
  country: string | null;
  industry: string | null;
  boilerType: string | null;
  painPoints: string[];
  recommendedProducts: string[];
  caseStudySummary: string | null;
  resultHighlights: Array<{ label: string; value: string }>;
  highlights: Array<{ title: string; description: string; meta: string | null; href: string | null }>;
  specs: Array<{ label: string; value: string }>;
  seo: { title: string | null; description: string | null };
};

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

function pickLocale(field: LocaleString | LocaleText | undefined, locale: CmsLocale): string {
  if (!field) return "";
  const value = (field as Record<string, string | null | undefined>)[locale];
  if (typeof value === "string" && value.trim() !== "") return value;
  const otherLocale: CmsLocale = locale === "zh" ? "en" : "zh";
  const other = (field as Record<string, string | null | undefined>)[otherLocale];
  return typeof other === "string" ? other : "";
}

function normalizeBasePath(basePath: string) {
  return basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
}

/* ------------------------------------------------------------------ */
/* list mapper                                                         */
/* ------------------------------------------------------------------ */

export function mapSanityList(
  records: SanityListItem[],
  basePath: string,
  locale: CmsLocale,
): ContentListItem[] {
  const normalized = normalizeBasePath(basePath);
  return records
    .filter((r) => r && typeof r.slug === "string" && r.slug.length > 0)
    .map((record) => ({
      title: pickLocale(record.title, locale) || record.slug,
      href: `${normalized}/${record.slug}`,
      summary: pickLocale(record.summary, locale),
    }));
}

/* ------------------------------------------------------------------ */
/* detail mapper                                                       */
/* ------------------------------------------------------------------ */

export function mapSanityDetail(record: SanityDetail, locale: CmsLocale): DetailViewModel {
  const gallery = (record.gallery ?? [])
    .map((g) => ({ url: g.url, alt: g.alt ?? "" }))
    .filter((g) => g.url);

  return {
    slug: record.slug,
    title: pickLocale(record.title, locale) || record.slug,
    summary: pickLocale(record.summary, locale),
    category: pickLocale(record.category, locale) || null,
    heroImageUrl: record.heroImageUrl ?? null,
    gallery,
    videoUrl: record.videoUrl ?? null,
    downloadUrl: record.downloadUrl ?? null,
    relatedProductSlug: record.relatedProductSlug ?? null,
    country: pickLocale(record.country, locale) || null,
    industry: pickLocale(record.industry, locale) || null,
    boilerType: pickLocale(record.boilerType, locale) || null,
    painPoints: (record.painPoints ?? [])
      .map((p) => pickLocale(p, locale))
      .filter(Boolean),
    recommendedProducts: (record.recommendedProducts ?? [])
      .map((p) => pickLocale(p, locale))
      .filter(Boolean),
    caseStudySummary: pickLocale(record.caseStudySummary, locale) || null,
    resultHighlights: (record.resultHighlights ?? [])
      .map((s) => ({ label: pickLocale(s.label, locale), value: s.value ?? "" }))
      .filter((s) => s.label || s.value),
    highlights: (record.highlights ?? [])
      .map((c) => ({
        title: pickLocale(c.title, locale),
        description: pickLocale(c.description, locale),
        meta: pickLocale(c.meta, locale) || null,
        href: c.href ?? null,
      }))
      .filter((c) => c.title || c.description),
    specs: (record.specs ?? [])
      .map((s) => ({
        label: pickLocale(s.label, locale),
        value: typeof s.value === "string" ? s.value : pickLocale(s.value as LocaleString | undefined, locale),
      }))
      .filter((s) => s.label || s.value),
    seo: {
      title: pickLocale(record.seo?.title, locale) || null,
      description: pickLocale(record.seo?.description, locale) || null,
    },
  };
}
