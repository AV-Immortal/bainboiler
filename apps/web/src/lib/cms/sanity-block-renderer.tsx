import type { CmsLocale } from "../../types/cms";
import type {
  SanityHomepageModule,
  SanityHeroVideo,
  SanityBrandStats,
  SanityCompanyIntro,
  SanityCardList,
  SanityCertificatesExport,
  SanityFeaturedVideo,
  SanityContactCta,
  SanityGlobalPresence,
  SanityStatItem,
  SanityCardItem,
} from "./mappers/homepage";
import { pickLocale } from "./mappers/homepage";
import { BrandStats } from "@/modules/brand-stats";
import { CertificatesExport } from "@/modules/certificates-export";
import { CompanyIntro } from "@/modules/company-intro";
import { ContactCta } from "@/modules/contact-cta";
import { FeaturedVideo } from "@/modules/featured-video";
import { GlobalPresence } from "@/modules/global-presence";
import { HeroVideo } from "@/modules/hero-video";
import { IndustrySolutions } from "@/modules/industry-solutions";
import { LatestNews } from "@/modules/latest-news";
import { ProductCategories } from "@/modules/product-categories";
import { ProjectShowcase } from "@/modules/project-showcase";

/* ------------------------------------------------------------------ */
/* 单字段扁平化：把 { zh, en } 拆成 string                               */
/* ------------------------------------------------------------------ */

function pick(
  field: { zh?: string | null; en?: string | null } | null | undefined,
  locale: CmsLocale,
) {
  return pickLocale(field, locale);
}

function mapStats(items: SanityStatItem[] | null | undefined, locale: CmsLocale) {
  if (!Array.isArray(items)) return [];
  return items.map((it) => ({
    label: pick(it.label, locale),
    value: typeof it.value === "string" ? it.value : "",
  }));
}

function mapCards(items: SanityCardItem[] | null | undefined, locale: CmsLocale) {
  if (!Array.isArray(items)) return [];
  return items.map((it) => ({
    title: pick(it.title, locale),
    description: pick(it.description, locale),
    meta: pick(it.meta, locale) || null,
    href: typeof it.href === "string" && it.href ? it.href : null,
  }));
}

/* ------------------------------------------------------------------ */
/* SanityModule → React component 映射                                 */
/* ------------------------------------------------------------------ */

export function SanityModule({
  modules,
  locale,
}: {
  modules: SanityHomepageModule[];
  locale: CmsLocale;
}) {
  return (
    <>
      {modules.map((m) => {
        switch (m._type) {
          case "homepage.heroVideo":
            return renderHero(m, locale);
          case "homepage.brandStats":
            return renderStats(m, locale);
          case "homepage.companyIntro":
            return renderCompanyIntro(m, locale);
          case "homepage.productCategories":
            return renderCardList(m, locale, "product-categories");
          case "homepage.industrySolutions":
            return renderCardList(m, locale, "industry-solutions");
          case "homepage.projectShowcase":
            return renderCardList(m, locale, "project-showcase");
          case "homepage.certificatesExport":
            return renderCertificates(m, locale);
          case "homepage.featuredVideo":
            return renderFeaturedVideo(m, locale);
          case "homepage.latestNews":
            return renderCardList(m, locale, "latest-news");
          case "homepage.contactCta":
            return renderContactCta(m, locale);
          case "homepage.globalPresence":
            return renderGlobalPresence(m, locale);
          default:
            return null;
        }
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* per-type renderers                                                  */
/* ------------------------------------------------------------------ */

function renderHero(m: SanityHeroVideo, locale: CmsLocale) {
  return (
    <HeroVideo
      key={m._key}
      locale={locale}
      headline={pick(m.headline, locale)}
      subheadline={pick(m.subheadline, locale)}
      primaryCta={pick(m.primaryCta, locale)}
      secondaryCta={pick(m.secondaryCta, locale)}
      videoUrl={m.videoUrl ?? undefined}
      posterUrl={m.posterUrl ?? undefined}
      backgroundType={m.backgroundType ?? undefined}
      backgroundColor={m.backgroundColor ?? undefined}
      backgroundGradient={
        m.backgroundGradient
          ? {
              from: m.backgroundGradient.from ?? undefined,
              to: m.backgroundGradient.to ?? undefined,
              angle: m.backgroundGradient.angle ?? undefined,
            }
          : undefined
      }
      // backgroundImage 是 Sanity image 引用（mux imageWithAlt 结构），原样传
      backgroundImage={m.backgroundImage as never}
      backgroundOverlayOpacity={m.backgroundOverlayOpacity ?? undefined}
    />
  );
}

function renderStats(m: SanityBrandStats, locale: CmsLocale) {
  return <BrandStats key={m._key} items={mapStats(m.items, locale)} />;
}

function renderCompanyIntro(m: SanityCompanyIntro, locale: CmsLocale) {
  return (
    <CompanyIntro
      key={m._key}
      eyebrow={pick(m.eyebrow, locale)}
      title={pick(m.title, locale)}
      description={pick(m.description, locale)}
      highlights={mapStats(m.highlights, locale)}
    />
  );
}

function renderCardList(
  m: SanityCardList,
  locale: CmsLocale,
  variant: "product-categories" | "industry-solutions" | "project-showcase" | "latest-news",
) {
  const items = mapCards(m.items, locale);
  const eyebrow = pick(m.eyebrow, locale);
  const title = pick(m.title, locale);
  const description = pick(m.description, locale);

  if (variant === "product-categories") {
    return (
      <ProductCategories
        key={m._key}
        locale={locale}
        eyebrow={eyebrow}
        title={title}
        description={description}
        items={items}
      />
    );
  }
  if (variant === "industry-solutions") {
    return (
      <IndustrySolutions
        key={m._key}
        locale={locale}
        eyebrow={eyebrow}
        title={title}
        description={description}
        items={items}
      />
    );
  }
  if (variant === "project-showcase") {
    return (
      <ProjectShowcase
        key={m._key}
        locale={locale}
        eyebrow={eyebrow}
        title={title}
        description={description}
        items={items}
      />
    );
  }
  // latest-news
  return (
    <LatestNews
      key={m._key}
      locale={locale}
      eyebrow={eyebrow}
      title={title}
      description={description}
      items={items}
    />
  );
}

function renderCertificates(m: SanityCertificatesExport, locale: CmsLocale) {
  const items = (m.items ?? [])
    .map((it) => pick(it, locale))
    .filter((v) => v !== "");

  return (
    <CertificatesExport
      key={m._key}
      locale={locale}
      eyebrow={pick(m.eyebrow, locale)}
      title={pick(m.title, locale)}
      description={pick(m.description, locale)}
      items={items}
      primaryCta={pick(m.primaryCta, locale)}
    />
  );
}

function renderFeaturedVideo(m: SanityFeaturedVideo, locale: CmsLocale) {
  return (
    <FeaturedVideo
      key={m._key}
      locale={locale}
      eyebrow={pick(m.eyebrow, locale)}
      title={pick(m.title, locale)}
      description={pick(m.description, locale)}
      primaryCta={pick(m.primaryCta, locale)}
      videoUrl={m.videoUrl ?? undefined}
      posterUrl={m.posterUrl ?? undefined}
    />
  );
}

function renderContactCta(m: SanityContactCta, locale: CmsLocale) {
  return (
    <ContactCta
      key={m._key}
      locale={locale}
      eyebrow={pick(m.eyebrow, locale)}
      title={pick(m.title, locale)}
      description={pick(m.description, locale)}
      primaryCta={pick(m.primaryCta, locale)}
      secondaryCta={pick(m.secondaryCta, locale)}
    />
  );
}

function renderGlobalPresence(m: SanityGlobalPresence, locale: CmsLocale) {
  return (
    <GlobalPresence
      key={m._key}
      locale={locale}
      eyebrow={pick(m.eyebrow, locale)}
      title={pick(m.title, locale)}
      description={pick(m.description, locale)}
      stats={mapStats(m.stats, locale)}
    />
  );
}
