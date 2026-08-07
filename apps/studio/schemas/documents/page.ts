import { defineType, defineField } from "sanity";

/**
 * Page 文档 = 通用页面 = 一个 slug 对应一组可自由排序的 modules。
 * 首页的 slug 是 "home"，未来可加 "about-us"、"landing-campaign" 等。
 */
export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "页面标题（管理用）",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL 路径",
      type: "slug",
      options: { source: (doc) => doc?.title?.zh ?? doc?.title?.en, maxLength: 96 },
      description: "首页填 home，其他填英文短横线 slug",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "modules",
      title: "页面模块",
      description: "拖拽调整顺序，点击右上角 + 添加新模块",
      type: "array",
      of: [
        { type: "homepage.heroVideo" },
        { type: "homepage.brandStats" },
        { type: "homepage.companyIntro" },
        { type: "homepage.productCategories" },
        { type: "homepage.industrySolutions" },
        { type: "homepage.projectShowcase" },
        { type: "homepage.globalPresence" },
        { type: "homepage.certificatesExport" },
        { type: "homepage.featuredVideo" },
        { type: "homepage.latestNews" },
        { type: "homepage.contactCta" },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "title.zh", subtitle: "title.en", slug: "slug.current" },
    prepare: ({ title, subtitle, slug }) => ({
      title: title ?? subtitle ?? "Untitled",
      subtitle: `/${slug ?? "?"}`,
    }),
  },
});
