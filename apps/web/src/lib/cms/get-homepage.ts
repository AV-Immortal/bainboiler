import type {
  CmsLocale,
  HomepageBrandStatsModule,
  HomepageConfig,
  HomepageHeroVideoModule,
  HomepageModule,
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
