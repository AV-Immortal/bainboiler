import { defineType, defineField } from "sanity";

export const solution = defineType({
  name: "solution",
  title: "Solution",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "方案名称",
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
      name: "summary",
      title: "简介",
      type: "localeText",
    }),
    defineField({
      name: "painPoints",
      title: "客户痛点",
      type: "array",
      of: [{ type: "localeString" }],
    }),
    defineField({
      name: "recommendedProducts",
      title: "推荐产品",
      type: "array",
      of: [{ type: "localeString" }],
    }),
    defineField({
      name: "caseStudySummary",
      title: "案例摘要",
      type: "localeText",
    }),
    defineField({
      name: "heroImage",
      title: "主图",
      type: "imageWithAlt",
    }),
    defineField({
      name: "gallery",
      title: "图集",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
    defineField({
      name: "videoUrl",
      title: "方案视频",
      type: "url",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "title.zh", subtitle: "title.en", media: "heroImage.image" },
    prepare: ({ title, subtitle, media }) => ({
      title: title ?? subtitle ?? "Untitled",
      subtitle,
      media,
    }),
  },
});
