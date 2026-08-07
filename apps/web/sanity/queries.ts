/**
 * 取首页配置：slug = home 的 page 文档。
 * 返回 GROQ 投影；mappers/homepage.ts 负责把投影映射成 view model。
 */
export const homepageQuery = `
  *[_type == "page" && slug.current == "home"][0]{
    "slug": slug.current,
    title,
    modules[]{
      _key,
      _type,
      _type == "homepage.heroVideo" => {
        eyebrow, headline, subheadline,
        primaryCta, primaryCtaHref,
        secondaryCta, secondaryCtaHref,
        videoUrl,
        "posterUrl": poster.image.asset->url
      },
      _type == "homepage.brandStats" => {
        items[]{ label, value }
      },
      _type == "homepage.companyIntro" => {
        eyebrow, title, description,
        highlights[]{ label, value }
      },
      _type == "homepage.productCategories" => {
        eyebrow, title, description,
        items[]{ title, description, meta, href,
                 "coverImageUrl": coverImage.image.asset->url }
      },
      _type == "homepage.industrySolutions" => {
        eyebrow, title, description,
        items[]{ title, description, meta, href,
                 "coverImageUrl": coverImage.image.asset->url }
      },
      _type == "homepage.projectShowcase" => {
        eyebrow, title, description,
        items[]{ title, description, meta, href,
                 "coverImageUrl": coverImage.image.asset->url }
      },
      _type == "homepage.globalPresence" => {
        eyebrow, title, description,
        stats[]{ label, value }
      },
      _type == "homepage.certificatesExport" => {
        eyebrow, title, description,
        items[], primaryCta
      },
      _type == "homepage.featuredVideo" => {
        eyebrow, title, description,
        videoUrl, "posterUrl": poster.image.asset->url,
        primaryCta
      },
      _type == "homepage.latestNews" => {
        eyebrow, title, description,
        items[]{ title, description, meta, href,
                 "coverImageUrl": coverImage.image.asset->url }
      },
      _type == "homepage.contactCta" => {
        eyebrow, title, description,
        primaryCta, secondaryCta
      }
    },
    seo
  }
`;

/**
 * 列表页通用查询。按 section 名取对应 collection 类型。
 * section 决定 _type 名字（Sanity 那边用单数：product / project / ...）。
 */
export function listQuery(
  sectionType: "product" | "project" | "solution" | "article" | "download" | "video",
) {
  return `
    *[_type == "${sectionType}"] | order(coalesce(publishedAt, _createdAt) desc) {
      "slug": slug.current,
      title,
      summary,
      category,
      "heroImageUrl": coalesce(heroImage.image.asset->url, coverImage.image.asset->url)
    }
  `;
}

/**
 * 详情页：按 type + slug 取一条。
 */
export function detailQuery(
  sectionType: "product" | "project" | "solution" | "article" | "download" | "video",
) {
  return `
    *[_type == "${sectionType}" && slug.current == $slug][0]{
      "slug": slug.current,
      title,
      summary,
      category,
      country, industry, boilerType,
      painPoints, recommendedProducts, caseStudySummary,
      resultHighlights[]{ label, value },
      highlights[]{ title, description, meta, href },
      specs[]{ label, value },
      "heroImageUrl": coalesce(heroImage.image.asset->url, coverImage.image.asset->url),
      "gallery": coalesce(gallery, [])[]{ "url": image.asset->url, "alt": coalesce(alt.zh, alt.en) },
      videoUrl,
      "downloadUrl": file.file.asset->url,
      relatedProductSlug,
      seo
    }
  `;
}

/**
 * 站点全局配置（单例）。
 */
export const siteSettingQuery = `
  *[_type == "siteSetting"][0]{
    siteName, defaultLocale,
    contactEmail, contactPhone, whatsApp, wechat
  }
`;

/**
 * 列表页全站配置 + 列表元数据
 */
export const allSlugsQuery = (
  sectionType: "product" | "project" | "solution" | "article" | "download" | "video",
) => `
  *[_type == "${sectionType}" && defined(slug.current)][].slug.current
`;
