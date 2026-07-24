import { defineType, defineField } from "sanity";

export const heroVideo = defineType({
  name: "homepage.heroVideo",
  title: "Hero Video",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow 文字（可选）",
      type: "localeString",
    }),
    defineField({
      name: "headline",
      title: "主标题",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subheadline",
      title: "副标题",
      type: "localeText",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "primaryCta",
      title: "主按钮文字",
      type: "localeString",
    }),
    defineField({
      name: "primaryCtaHref",
      title: "主按钮链接",
      type: "string",
      description: "默认 /<locale>/contact",
    }),
    defineField({
      name: "secondaryCta",
      title: "次按钮文字",
      type: "localeString",
    }),
    defineField({
      name: "secondaryCtaHref",
      title: "次按钮链接",
      type: "string",
      description: "默认跳到 #featured-video",
    }),
    defineField({
      name: "videoUrl",
      title: "视频地址（mp4 直链或外链）",
      type: "url",
    }),
    defineField({
      name: "poster",
      title: "视频封面图",
      type: "imageWithAlt",
    }),
  ],
  preview: {
    select: { title: "headline.zh", subtitle: "headline.en" },
    prepare: ({ title, subtitle }) => ({
      title: `🎬 Hero · ${title ?? "无标题"}`,
      subtitle,
    }),
  },
});
