import type { CmsLocale } from "../../types/cms";
import { tryGetSanityClient } from "../../../sanity/client";
import { detailQuery } from "../../../sanity/queries";
import { mapSanityDetail, type SanityDetail } from "./mappers/content-list";

export type DetailSectionKey =
  | "products"
  | "solutions"
  | "projects"
  | "news"
  | "videos"
  | "downloads";

const SECTION_TO_TYPE: Record<
  DetailSectionKey,
  "product" | "solution" | "project" | "article" | "video" | "download"
> = {
  products: "product",
  solutions: "solution",
  projects: "project",
  news: "article",
  videos: "video",
  downloads: "download",
};

export type DetailViewModel = ReturnType<typeof mapSanityDetail>;

/**
 * 详情页数据：按 section + slug 取一条。
 * 取不到返回 null，让调用方决定渲染 404 还是 fallback。
 */
export async function getDetail(
  locale: CmsLocale,
  section: DetailSectionKey,
  slug: string,
): Promise<DetailViewModel | null> {
  if (!slug) return null;

  const client = tryGetSanityClient();
  if (!client) return null;

  const sectionType = SECTION_TO_TYPE[section];

  try {
    const data = await client.fetch<SanityDetail | null>(
      detailQuery(sectionType),
      { slug },
      { next: { revalidate: 60, tags: ["sanity", `sanity:${sectionType}`] } },
    );

    if (!data) return null;
    return mapSanityDetail(data, locale);
  } catch (err) {
    if (process.env.NODE_ENV !== "test") {
      console.warn(`[getDetail:${section}:${slug}] Sanity fetch failed:`, err);
    }
    return null;
  }
}
