import type {
  CmsLocale,
  HomepageBrandStatsModule,
  HomepageConfig,
  HomepageHeroVideoModule,
  HomepageModule,
  HomepageStatItem,
  HomepageViewModel,
} from "../../../types/cms";

const homepageFallbackCopy: Record<
  CmsLocale,
  Pick<HomepageViewModel["hero"], "primaryCta" | "secondaryCta">
> = {
  en: {
    primaryCta: "Get Quote",
    secondaryCta: "Watch Video",
  },
  zh: {
    primaryCta: "立即询盘",
    secondaryCta: "观看视频",
  },
};

function isHeroModule(module: HomepageModule): module is HomepageHeroVideoModule {
  return module.key === "hero-video";
}

function isStatsModule(module: HomepageModule): module is HomepageBrandStatsModule {
  return module.key === "brand-stats";
}

function normalizeStats(items: HomepageStatItem[] | undefined) {
  return items ?? [];
}

export function mapHomepage(config: HomepageConfig): HomepageViewModel {
  const heroModule = config.modules.find(isHeroModule);
  const statsModule = config.modules.find(isStatsModule);
  const fallbackCopy = homepageFallbackCopy[config.locale];

  return {
    locale: config.locale,
    seo: {
      title: config.seoTitle ?? config.title,
      description: config.seoDescription ?? "",
    },
    hero: {
      headline: heroModule?.headline ?? "",
      subheadline: heroModule?.subheadline ?? "",
      primaryCta: heroModule?.primaryCta || fallbackCopy.primaryCta,
      secondaryCta: heroModule?.secondaryCta || fallbackCopy.secondaryCta,
      videoUrl: heroModule?.videoUrl ?? undefined,
      posterUrl: heroModule?.posterUrl ?? undefined,
    },
    stats: normalizeStats(statsModule?.items),
  };
}
