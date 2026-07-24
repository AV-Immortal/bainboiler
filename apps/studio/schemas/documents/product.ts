import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "产品名称",
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
      name: "highlights",
      title: "亮点（标签 + 描述）",
      type: "array",
      of: [{ type: "cardItem" }],
    }),
    defineField({
      name: "specs",
      title: "技术参数（自由 JSON）",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "localeString" }),
            defineField({ name: "value", type: "localeString" }),
          ],
          preview: { select: { title: "label.zh", subtitle: "value.zh" } },
        },
      ],
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
      title: "产品视频",
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
      subtitle: subtitle ? `EN: ${subtitle}` : undefined,
      media,
    }),
  },
});
