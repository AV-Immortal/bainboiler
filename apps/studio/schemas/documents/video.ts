import { defineType, defineField } from "sanity";

export const video = defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "视频标题",
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
      name: "coverImage",
      title: "封面图",
      type: "imageWithAlt",
    }),
    defineField({
      name: "videoUrl",
      title: "视频地址",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featuredOnHomepage",
      title: "在首页 Featured Video 模块显示",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "title.zh", subtitle: "title.en", media: "coverImage.image" },
    prepare: ({ title, subtitle, media }) => ({
      title: title ?? subtitle ?? "Untitled",
      subtitle,
      media,
    }),
  },
});
