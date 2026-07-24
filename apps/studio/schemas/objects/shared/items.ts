import { defineType, defineField } from "sanity";

/**
 * 通用统计项：{ label, value }。
 * 供 brand-stats、company-intro.highlights 复用。
 */
export const statItem = defineType({
  name: "statItem",
  title: "Stat Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "标签",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "value",
      title: "数值",
      type: "string",
      description: "可以是数字或字符串，例如 30+ / 24H / 100%",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "label.zh", subtitle: "value" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Untitled stat",
      subtitle: subtitle || "",
    }),
  },
});

/**
 * 通用卡片项：标题 + 描述 + 可选跳转 + meta。
 * 供 product-categories / industry-solutions / project-showcase / latest-news 复用。
 */
export const cardItem = defineType({
  name: "cardItem",
  title: "Card Item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "标题",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "描述",
      type: "localeText",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "meta",
      title: "Meta 标签",
      description: "卡片上方的小标签（eyebrow），如「工艺热源 / Insight / Project」。",
      type: "localeString",
    }),
    defineField({
      name: "href",
      title: "跳转链接（可选）",
      description: "可填站内路径（/zh/products）或外链。不填则用 section 默认链接。",
      type: "string",
    }),
    defineField({
      name: "coverImage",
      title: "封面图（可选）",
      type: "imageWithAlt",
    }),
  ],
  preview: {
    select: { title: "title.zh", subtitle: "title.en", media: "coverImage.image" },
    prepare: ({ title, subtitle, media }) => ({
      title: title || subtitle || "Untitled card",
      subtitle,
      media,
    }),
  },
});
