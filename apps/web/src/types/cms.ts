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

export type HomepageCardItem = {
  title: string;
  description: string;
  href?: string | null;
  meta?: string | null;
};

export type ContentListItem = {
  title: string;
  href: string;
  summary: string;
};

export type ContentListPageViewModel = {
  title: string;
  description: string;
  items: ContentListItem[];
};

export type HomepageBrandStatsModule = {
  key: "brand-stats";
  items: HomepageStatItem[];
};

export type HomepageCompanyIntroModule = {
  key: "company-intro";
  eyebrow?: string | null;
  title: string;
  description: string;
  highlights?: HomepageStatItem[];
};

export type HomepageProductCategoriesModule = {
  key: "product-categories";
  eyebrow?: string | null;
  title: string;
  description: string;
  items: HomepageCardItem[];
};

export type HomepageIndustrySolutionsModule = {
  key: "industry-solutions";
  eyebrow?: string | null;
  title: string;
  description: string;
  items: HomepageCardItem[];
};

export type HomepageProjectShowcaseModule = {
  key: "project-showcase";
  eyebrow?: string | null;
  title: string;
  description: string;
  items: HomepageCardItem[];
};

export type HomepageCertificatesExportModule = {
  key: "certificates-export";
  eyebrow?: string | null;
  title: string;
  description: string;
  items: string[];
  primaryCta?: string | null;
};

export type HomepageFeaturedVideoModule = {
  key: "featured-video";
  eyebrow?: string | null;
  title: string;
  description: string;
  videoUrl?: string | null;
  posterUrl?: string | null;
  primaryCta?: string | null;
};

export type HomepageLatestNewsModule = {
  key: "latest-news";
  eyebrow?: string | null;
  title: string;
  description: string;
  items: HomepageCardItem[];
};

export type HomepageContactCtaModule = {
  key: "contact-cta";
  eyebrow?: string | null;
  title: string;
  description: string;
  primaryCta?: string | null;
  secondaryCta?: string | null;
};

export type HomepageModule =
  | HomepageHeroVideoModule
  | HomepageBrandStatsModule
  | HomepageCompanyIntroModule
  | HomepageProductCategoriesModule
  | HomepageIndustrySolutionsModule
  | HomepageProjectShowcaseModule
  | HomepageCertificatesExportModule
  | HomepageFeaturedVideoModule
  | HomepageLatestNewsModule
  | HomepageContactCtaModule;

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
  companyIntro: {
    eyebrow: string;
    title: string;
    description: string;
    highlights: HomepageStatItem[];
  };
  productCategories: {
    eyebrow: string;
    title: string;
    description: string;
    items: HomepageCardItem[];
  };
  industrySolutions: {
    eyebrow: string;
    title: string;
    description: string;
    items: HomepageCardItem[];
  };
  projectShowcase: {
    eyebrow: string;
    title: string;
    description: string;
    items: HomepageCardItem[];
  };
  certificatesExport: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
    primaryCta: string;
  };
  featuredVideo: {
    eyebrow: string;
    title: string;
    description: string;
    videoUrl?: string;
    posterUrl?: string;
    primaryCta: string;
  };
  latestNews: {
    eyebrow: string;
    title: string;
    description: string;
    items: HomepageCardItem[];
  };
  contactCta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
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
