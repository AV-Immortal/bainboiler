export type CmsLocale = "zh" | "en";

export type HomepageHeroVideoModule = {
  key: "hero-video";
  headline: string;
  subheadline: string;
  primaryCta?: string | null;
  secondaryCta?: string | null;
  videoUrl?: string | null;
  posterUrl?: string | null;
};

export type HomepageStatItem = {
  label: string;
  value: string;
};

export type HomepageBrandStatsModule = {
  key: "brand-stats";
  items: HomepageStatItem[];
};

export type HomepageModule = HomepageHeroVideoModule | HomepageBrandStatsModule;

export type HomepageConfig = {
  title: string;
  slug?: string;
  locale: CmsLocale;
  seoTitle?: string | null;
  seoDescription?: string | null;
  modules: HomepageModule[];
};

export type HomepageViewModel = {
  locale: CmsLocale;
  seo: {
    title: string;
    description: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    videoUrl?: string;
    posterUrl?: string;
  };
  stats: HomepageStatItem[];
};

export type StrapiV4Entity<T> = {
  id: number;
  attributes: T;
};

export type StrapiV5Entity<T> = T & {
  id: number;
  documentId?: string;
};

export type StrapiCollectionResponse<T> = {
  data: Array<StrapiV4Entity<T> | StrapiV5Entity<T>>;
  meta?: Record<string, unknown>;
};

export type PageConfigRecord = {
  title: string;
  slug: string;
  locale: CmsLocale;
  seoTitle?: string | null;
  seoDescription?: string | null;
  modules: unknown;
};
