import { defineType, defineField } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "标题",
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
      name: "excerpt",
      title: "摘要",
      type: "localeText",
    }),
    defineField({
      name: "content",
      title: "正文（富文本）",
      type: "localePortableText",
    }),
    defineField({
      name: "heroImage",
      title: "封面图",
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
      title: "视频",
      type: "url",
    }),
    defineField({
      name: "publishedAt",
      title: "发布日期",
      type: "datetime",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "发布日期（新 → 旧）",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
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
