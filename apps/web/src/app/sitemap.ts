import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";

/* 不依赖 CMS 的静态路由（与 i18n routing 对齐） */
const STATIC_ROUTES = [
  "",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/products",
] as const;

/* 产品 slug —— 若未来从 CMS 拉取，可改为 getListPage("products") 的合并。 */
const PRODUCT_SLUGS = [
  "wboiler-series",
  "sboiler-series",
  "thermal-oil-heater",
  "waste-heat-recovery",
  "aux-boiler",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of STATIC_ROUTES) {
      base.push({
        // 用相对路径，让根 layout 的 metadataBase 自动拼接站点 URL
        url: `/${locale}${route}`,
        lastModified,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((alt) => [
              alt,
              `/${alt}${route}`,
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
