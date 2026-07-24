import { defineType, defineField } from "sanity";

export const certificatesExport = defineType({
  name: "homepage.certificatesExport",
  title: "Certificates & Export",
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
      title: "文件/能力清单（短句）",
      type: "array",
      of: [{ type: "localeString" }],
      validation: (r) => r.min(1).max(12),
    }),
    defineField({
      name: "primaryCta",
      title: "主按钮文字",
      type: "localeString",
    }),
  ],
  preview: {
    select: { title: "title.zh" },
    prepare: ({ title }) => ({
      title: `📜 Certificates & Export · ${title ?? "无标题"}`,
    }),
  },
});
