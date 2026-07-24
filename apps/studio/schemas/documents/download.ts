import { defineType, defineField } from "sanity";

export const download = defineType({
  name: "download",
  title: "Download",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "资料名称",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: (doc) => doc?.title?.en, maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "分类",
      type: "localeString",
    }),
    defineField({
      name: "summary",
      title: "简介",
      type: "localeText",
    }),
    defineField({
      name: "file",
      title: "下载文件（PDF / ZIP / Excel 等）",
      type: "fileWithLabel",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "relatedProductSlug",
      title: "关联产品 slug（可选）",
      type: "string",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "title.zh", subtitle: "title.en" },
    prepare: ({ title, subtitle }) => ({
      title: title ?? subtitle ?? "Untitled",
      subtitle,
    }),
  },
});
