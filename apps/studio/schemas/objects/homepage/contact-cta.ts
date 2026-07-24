import { defineType, defineField } from "sanity";

export const contactCta = defineType({
  name: "homepage.contactCta",
  title: "Contact CTA",
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
      name: "primaryCta",
      title: "提交按钮文字（表单）",
      type: "localeString",
    }),
    defineField({
      name: "secondaryCta",
      title: "次按钮文字（下载资料）",
      type: "localeString",
    }),
  ],
  preview: {
    select: { title: "title.zh" },
    prepare: ({ title }) => ({
      title: `✉️ Contact CTA · ${title ?? "无标题"}`,
    }),
  },
});
