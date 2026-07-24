export type CmsLocale = "zh" | "en";

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
