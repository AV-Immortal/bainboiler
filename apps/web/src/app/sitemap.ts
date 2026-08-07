import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";

/* 不依赖 CMS 的静态路由（与 i18n routing 对齐） */
const STATIC_ROUTES = [
  { path: "", priority: 1.0, freq: "weekly" as const },
  { path: "/about", priority: 0.7, freq: "monthly" as const },
  { path: "/contact", priority: 0.8, freq: "monthly" as const },
  { path: "/privacy-policy", priority: 0.3, freq: "yearly" as const },
  { path: "/terms", priority: 0.3, freq: "yearly" as const },
  { path: "/products", priority: 0.9, freq: "weekly" as const },
  { path: "/solutions", priority: 0.9, freq: "monthly" as const },
  { path: "/projects", priority: 0.9, freq: "monthly" as const },
  { path: "/news", priority: 0.8, freq: "weekly" as const },
  { path: "/videos", priority: 0.6, freq: "monthly" as const },
  { path: "/downloads", priority: 0.6, freq: "monthly" as const },
];

/* 产品 slug —— 覆盖主要工业锅炉型号，方便 Google 抓取长尾词。
   若未来从 CMS 拉取，可改为 getListPage("products") 的合并。 */
const PRODUCT_SLUGS = [
  "wns-boiler",
  "szs-boiler",
  "dzl-boiler",
  "lhs-boiler",
  "clhs-hot-water-boiler",
  "thermal-oil-heater",
  "biomass-boiler",
  "waste-heat-recovery",
  "aux-boiler",
  "wboiler-series",
  "sboiler-series",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of STATIC_ROUTES) {
      base.push({
        // 用相对路径，让根 layout 的 metadataBase 自动拼接站点 URL
        url: `/${locale}${route.path}`,
        lastModified,
        changeFrequency: route.freq,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((alt) => [
              alt,
              `/${alt}${route.path}`,
            ]),
          ),
        },
      });
    }

    for (const slug of PRODUCT_SLUGS) {
      base.push({
        url: `/${locale}/products/${slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((alt) => [
              alt,
              `/${alt}/products/${slug}`,
            ]),
          ),
        },
      });
    }
  }

  return base;
}
