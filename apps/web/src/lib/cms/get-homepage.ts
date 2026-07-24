import type { CmsLocale } from "../../types/cms";
import type { SanityHomepageModule } from "./mappers/homepage";
import { tryGetSanityClient } from "../../../sanity/client";
import { homepageQuery } from "../../../sanity/queries";
import { homepageFallbackModules, homepageFallbackSeo } from "./homepage-fallback";

export type HomepageResult = {
  modules: SanityHomepageModule[];
  seo: { title: string; description: string };
};

/**
 * 取首页数据。流程：
 * 1. 若 NEXT_PUBLIC_SANITY_PROJECT_ID 未配置 → 直接 fallback
 * 2. 调 Sanity GROQ homepageQuery
 * 3. Sanity 抛错或返回 null → fallback
 * 4. 否则把 Sanity 投影交给 page.tsx 渲染（modules 顺序由 Sanity 决定）
 *
 * fallback 保证：build / 404 / 早期开发阶段首页永远有内容。
 */
export async function getHomepage(locale: CmsLocale): Promise<HomepageResult> {
  const client = tryGetSanityClient();

  if (!client) {
    return {
      modules: homepageFallbackModules,
      seo: homepageFallbackSeo[locale],
    };
  }

  try {
    const data = await client.fetch<{
      modules?: SanityHomepageModule[];
      seo?: { title?: { zh?: string | null; en?: string | null } | null; description?: { zh?: string | null; en?: string | null } | null } | null;
    } | null>(
      homepageQuery,
      {},
      { next: { revalidate: 60, tags: ["sanity"] } },
    );

    if (!data) {
      return {
        modules: homepageFallbackModules,
        seo: homepageFallbackSeo[locale],
      };
    }

    const seoFallback = homepageFallbackSeo[locale];
    const seoTitle =
      data.seo?.title?.[locale] || data.seo?.title?.[locale === "zh" ? "en" : "zh"] || seoFallback.title;
    const seoDescription =
      data.seo?.description?.[locale] ||
      data.seo?.description?.[locale === "zh" ? "en" : "zh"] ||
      seoFallback.description;

    return {
      modules: Array.isArray(data.modules) ? data.modules : homepageFallbackModules,
      seo: { title: seoTitle, description: seoDescription },
    };
  } catch (err) {
    if (process.env.NODE_ENV !== "test") {
      console.warn("[getHomepage] Sanity fetch failed, using fallback:", err);
    }
    return {
      modules: homepageFallbackModules,
      seo: homepageFallbackSeo[locale],
    };
  }
}
