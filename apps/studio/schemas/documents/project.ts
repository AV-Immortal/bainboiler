import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "项目名称",
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
      name: "country",
      title: "国家/地区",
      type: "localeString",
    }),
    defineField({
      name: "industry",
      title: "行业",
      type: "localeString",
    }),
    defineField({
      name: "boilerType",
      title: "锅炉类型",
      type: "localeString",
    }),
    defineField({
      name: "resultHighlights",
      title: "成果亮点",
      type: "array",
      of: [{ type: "statItem" }],
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
      title: "项目视频",
      type: "url",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "title.zh", subtitle: "country.zh", media: "heroImage.image" },
    prepare: ({ title, subtitle, media }) => ({
      title: title ?? "Untitled",
      subtitle,
      media,
    }),
  },
});
