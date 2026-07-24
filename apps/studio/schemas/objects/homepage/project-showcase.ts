import { defineType, defineField } from "sanity";

export const projectShowcase = defineType({
  name: "homepage.projectShowcase",
  title: "Project Showcase",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow 文字",
      type: "localeString",
    }),
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
      name: "items",
      title: "案例卡片",
      type: "array",
      of: [{ type: "cardItem" }],
      validation: (r) => r.min(1).max(12),
    }),
  ],
  preview: {
    select: { title: "title.zh" },
    prepare: ({ title }) => ({
      title: `🚧 Project Showcase · ${title ?? "无标题"}`,
    }),
  },
});
