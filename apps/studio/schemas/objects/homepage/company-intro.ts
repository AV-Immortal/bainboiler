import { defineType, defineField } from "sanity";

export const companyIntro = defineType({
  name: "homepage.companyIntro",
  title: "Company Intro",
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
      title: "描述段落",
      type: "localeText",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "highlights",
      title: "下方三个亮点",
      type: "array",
      of: [{ type: "statItem" }],
      validation: (r) => r.min(1).max(6),
    }),
  ],
  preview: {
    select: { title: "title.zh", subtitle: "title.en" },
    prepare: ({ title, subtitle }) => ({
      title: `🏢 Company Intro · ${title ?? "无标题"}`,
      subtitle,
    }),
  },
});
