import type { CmsLocale, ContentListPageViewModel } from "../../types/cms";
import { tryGetSanityClient } from "../../../sanity/client";
import { listQuery } from "../../../sanity/queries";
import { mapSanityList } from "./mappers/content-list";

export type ContentSectionKey =
  | "products"
  | "solutions"
  | "projects"
  | "news"
  | "videos"
  | "downloads";

/**
 * section 名 → Sanity _type 名（单数）。
 */
const SECTION_TO_TYPE: Record<
  ContentSectionKey,
  "product" | "solution" | "project" | "article" | "video" | "download"
> = {
  products: "product",
  solutions: "solution",
  projects: "project",
  news: "article",
  videos: "video",
  downloads: "download",
};

/**
 * 列表页的硬编码标题/描述（保留自原文件）。Sanity 文档本身没有 description 字段，
 * 暂时由代码维护；如需"管理员可改 description"，需为每种 collection 加 description 字段。
 */
const listPageCopy: Record<
  CmsLocale,
  Record<ContentSectionKey, { title: string; description: string }>
> = {
  en: {
    products: {
      title: "Products",
      description:
        "Explore steam boilers, hot water boilers, thermal oil heaters, and engineered auxiliary systems for industrial heat demand.",
    },
    solutions: {
      title: "Solutions",
      description:
        "Review application-focused boiler and thermal system solutions built around plant duty, fuel strategy, and compliance requirements.",
    },
    projects: {
      title: "Projects",
      description:
        "See selected delivery references covering industrial retrofits, export packages, and coordinated turnkey boiler execution.",
    },
    news: {
      title: "News",
      description:
        "Follow product updates, project milestones, and practical thermal engineering insights from the BAIN BOILER team.",
    },
    videos: {
      title: "Videos",
      description:
        "Watch fabrication, testing, and delivery highlights that show how BAIN BOILER supports industrial projects end to end.",
    },
    downloads: {
      title: "Downloads",
      description:
        "Access company profiles, technical materials, and export documentation prepared for procurement and engineering teams.",
    },
  },
  zh: {
    products: {
      title: "产品中心",
      description:
        "查看蒸汽锅炉、热水锅炉、导热油炉及配套设备，快速了解不同工业热能场景的产品布局。",
    },
    solutions: {
      title: "解决方案",
      description:
        "围绕行业工况、燃料策略与合规要求，了解百恩锅炉的热能系统配置思路与实施方向。",
    },
    projects: {
      title: "工程案例",
      description:
        "浏览工业改造、整厂配套与出口交付等典型项目，了解百恩锅炉的工程执行能力。",
    },
    news: {
      title: "新闻中心",
      description:
        "关注产品更新、项目进展与工业热能相关洞察，持续了解百恩锅炉的最新动态。",
    },
    videos: {
      title: "视频中心",
      description:
        "通过制造、测试与项目交付视频内容，快速感受百恩锅炉的工厂能力与工程细节。",
    },
    downloads: {
      title: "下载中心",
      description:
        "获取企业资料、技术文件与出口相关文档，为采购、技术与项目沟通提供参考。",
    },
  },
};

export async function getListPage(
  locale: CmsLocale,
  section: ContentSectionKey,
): Promise<ContentListPageViewModel> {
  const copy = listPageCopy[locale][section];
  const basePath = `/${locale}/${section}`;

  const client = tryGetSanityClient();
  if (!client) {
    return { ...copy, items: [] };
  }

  try {
    const sectionType = SECTION_TO_TYPE[section];
    const data = await client.fetch<Array<{
      slug: string;
      title: { zh?: string; en?: string } | null;
      summary: { zh?: string; en?: string } | null;
      heroImageUrl?: string | null;
    }> | null>(
      listQuery(sectionType),
      {},
      { next: { revalidate: 60, tags: ["sanity", `sanity:${sectionType}`] } },
    );

    return {
      ...copy,
      items: mapSanityList(data ?? [], basePath, locale),
    };
  } catch (err) {
    if (process.env.NODE_ENV !== "test") {
      console.warn(`[getListPage:${section}] Sanity fetch failed:`, err);
    }
    return { ...copy, items: [] };
  }
}
