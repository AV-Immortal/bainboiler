import type {
  CmsLocale,
  HomepageCardItem,
  HomepageBrandStatsModule,
  HomepageCertificatesExportModule,
  HomepageCompanyIntroModule,
  HomepageContactCtaModule,
  HomepageConfig,
  HomepageFeaturedVideoModule,
  HomepageHeroVideoModule,
  HomepageIndustrySolutionsModule,
  HomepageLatestNewsModule,
  HomepageModule,
  HomepageProductCategoriesModule,
  HomepageProjectShowcaseModule,
  HomepageStatItem,
  PageConfigRecord,
  StrapiCollectionResponse,
  StrapiV4Entity,
  StrapiV5Entity,
} from "../../types/cms";
import { fetchJson } from "./fetch-json";
import { mapHomepage } from "./mappers/homepage";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStatItem(value: unknown): value is HomepageStatItem {
  return (
    isRecord(value) &&
    typeof value.label === "string" &&
    typeof value.value === "string"
  );
}

function isCardItem(value: unknown): value is HomepageCardItem {
  return (
    isRecord(value) &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    (typeof value.href === "string" || typeof value.href === "undefined") &&
    (typeof value.meta === "string" || typeof value.meta === "undefined")
  );
}

function isHeroModule(value: unknown): value is HomepageHeroVideoModule {
  return (
    isRecord(value) &&
    value.key === "hero-video" &&
    typeof value.headline === "string" &&
    typeof value.subheadline === "string"
  );
}

function isStatsModule(value: unknown): value is HomepageBrandStatsModule {
  return (
    isRecord(value) &&
    value.key === "brand-stats" &&
    Array.isArray(value.items) &&
    value.items.every(isStatItem)
  );
}

function isCompanyIntroModule(value: unknown): value is HomepageCompanyIntroModule {
  return (
    isRecord(value) &&
    value.key === "company-intro" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    (typeof value.eyebrow === "string" || typeof value.eyebrow === "undefined") &&
    (typeof value.highlights === "undefined" ||
      (Array.isArray(value.highlights) && value.highlights.every(isStatItem)))
  );
}

function isCardListModule(
  value: unknown,
  key:
    | "product-categories"
    | "industry-solutions"
    | "project-showcase"
    | "latest-news",
): value is
  | HomepageProductCategoriesModule
  | HomepageIndustrySolutionsModule
  | HomepageProjectShowcaseModule
  | HomepageLatestNewsModule {
  return (
    isRecord(value) &&
    value.key === key &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    Array.isArray(value.items) &&
    value.items.every(isCardItem) &&
    (typeof value.eyebrow === "string" || typeof value.eyebrow === "undefined")
  );
}

function isCertificatesExportModule(
  value: unknown,
): value is HomepageCertificatesExportModule {
  return (
    isRecord(value) &&
    value.key === "certificates-export" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    Array.isArray(value.items) &&
    value.items.every((item) => typeof item === "string") &&
    (typeof value.eyebrow === "string" || typeof value.eyebrow === "undefined") &&
    (typeof value.primaryCta === "string" ||
      typeof value.primaryCta === "undefined")
  );
}

function isFeaturedVideoModule(value: unknown): value is HomepageFeaturedVideoModule {
  return (
    isRecord(value) &&
    value.key === "featured-video" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    (typeof value.eyebrow === "string" || typeof value.eyebrow === "undefined") &&
    (typeof value.videoUrl === "string" || typeof value.videoUrl === "undefined") &&
    (typeof value.posterUrl === "string" || typeof value.posterUrl === "undefined") &&
    (typeof value.primaryCta === "string" ||
      typeof value.primaryCta === "undefined")
  );
}

function isContactCtaModule(value: unknown): value is HomepageContactCtaModule {
  return (
    isRecord(value) &&
    value.key === "contact-cta" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    (typeof value.eyebrow === "string" || typeof value.eyebrow === "undefined") &&
    (typeof value.primaryCta === "string" ||
      typeof value.primaryCta === "undefined") &&
    (typeof value.secondaryCta === "string" ||
      typeof value.secondaryCta === "undefined")
  );
}

function normalizeModule(value: unknown): HomepageModule | null {
  if (isHeroModule(value)) {
    return {
      key: "hero-video",
      headline: value.headline,
      subheadline: value.subheadline,
      primaryCta: typeof value.primaryCta === "string" ? value.primaryCta : null,
      secondaryCta:
        typeof value.secondaryCta === "string" ? value.secondaryCta : null,
      videoUrl: typeof value.videoUrl === "string" ? value.videoUrl : null,
      posterUrl: typeof value.posterUrl === "string" ? value.posterUrl : null,
    };
  }

  if (isStatsModule(value)) {
    return {
      key: "brand-stats",
      items: value.items,
    };
  }

  if (isCompanyIntroModule(value)) {
    return {
      key: "company-intro",
      eyebrow: typeof value.eyebrow === "string" ? value.eyebrow : null,
      title: value.title,
      description: value.description,
      highlights: Array.isArray(value.highlights) ? value.highlights : [],
    };
  }

  if (isCardListModule(value, "product-categories")) {
    return {
      key: "product-categories",
      eyebrow: typeof value.eyebrow === "string" ? value.eyebrow : null,
      title: value.title,
      description: value.description,
      items: value.items,
    };
  }

  if (isCardListModule(value, "industry-solutions")) {
    return {
      key: "industry-solutions",
      eyebrow: typeof value.eyebrow === "string" ? value.eyebrow : null,
      title: value.title,
      description: value.description,
      items: value.items,
    };
  }

  if (isCardListModule(value, "project-showcase")) {
    return {
      key: "project-showcase",
      eyebrow: typeof value.eyebrow === "string" ? value.eyebrow : null,
      title: value.title,
      description: value.description,
      items: value.items,
    };
  }

  if (isCertificatesExportModule(value)) {
    return {
      key: "certificates-export",
      eyebrow: typeof value.eyebrow === "string" ? value.eyebrow : null,
      title: value.title,
      description: value.description,
      items: value.items,
      primaryCta: typeof value.primaryCta === "string" ? value.primaryCta : null,
    };
  }

  if (isFeaturedVideoModule(value)) {
    return {
      key: "featured-video",
      eyebrow: typeof value.eyebrow === "string" ? value.eyebrow : null,
      title: value.title,
      description: value.description,
      videoUrl: typeof value.videoUrl === "string" ? value.videoUrl : null,
      posterUrl: typeof value.posterUrl === "string" ? value.posterUrl : null,
      primaryCta: typeof value.primaryCta === "string" ? value.primaryCta : null,
    };
  }

  if (isCardListModule(value, "latest-news")) {
    return {
      key: "latest-news",
      eyebrow: typeof value.eyebrow === "string" ? value.eyebrow : null,
      title: value.title,
      description: value.description,
      items: value.items,
    };
  }

  if (isContactCtaModule(value)) {
    return {
      key: "contact-cta",
      eyebrow: typeof value.eyebrow === "string" ? value.eyebrow : null,
      title: value.title,
      description: value.description,
      primaryCta: typeof value.primaryCta === "string" ? value.primaryCta : null,
      secondaryCta:
        typeof value.secondaryCta === "string" ? value.secondaryCta : null,
    };
  }

  return null;
}

function unwrapEntity<T>(entity: StrapiV4Entity<T> | StrapiV5Entity<T>): T {
  if ("attributes" in entity) {
    return entity.attributes;
  }

  return entity;
}

function normalizeHomepageConfig(record: PageConfigRecord): HomepageConfig {
  const modules = Array.isArray(record.modules)
    ? record.modules.map(normalizeModule).filter((module): module is HomepageModule => module !== null)
    : [];

  return {
    title: record.title,
    slug: record.slug,
    locale: record.locale,
    seoTitle: record.seoTitle ?? null,
    seoDescription: record.seoDescription ?? null,
    modules,
  };
}

export async function getHomepage(locale: CmsLocale) {
  const baseUrl = process.env.CMS_BASE_URL;

  if (!baseUrl) {
    throw new Error("CMS_BASE_URL is not configured");
  }

  const url = new URL("/api/page-configs", baseUrl);
  url.searchParams.set("filters[slug][$eq]", "home");
  url.searchParams.set("filters[locale][$eq]", locale);
  url.searchParams.set("pagination[pageSize]", "1");

  const response = await fetchJson<StrapiCollectionResponse<PageConfigRecord>>(
    url,
    {
      next: { revalidate: 60 },
    },
  );
  const entries = Array.isArray(response.data) ? response.data : [response.data];
  const [entry] = entries;

  if (!entry) {
    throw new Error(`Homepage config not found for locale: ${locale}`);
  }

  return mapHomepage(normalizeHomepageConfig(unwrapEntity(entry)));
}
