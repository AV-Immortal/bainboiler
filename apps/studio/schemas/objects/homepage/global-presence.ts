import { defineType, defineField } from "sanity";

export const globalPresence = defineType({
  name: "homepage.globalPresence",
  title: "Global Presence",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow 文字",
      type: "localeString",
    }),
    defineField({
      name: "title",
      title: "主标题",
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
      name: "stats",
      title: "数据项（左侧四个）",
      type: "array",
      of: [{ type: "statItem" }],
      validation: (r) => r.min(2).max(6),
      description:
        "地球位置固定为中国（110°E / 34°N），无需在 CMS 中配置；如需调整标题与数据项可在此修改。",
    }),
  ],
  preview: {
    select: { title: "title.zh", subtitle: "title.en" },
    prepare: ({ title, subtitle }) => ({
      title: `🌐 Global Presence · ${title ?? "无标题"}`,
      subtitle,
    }),
  },
});
