import { defineType, defineField } from "sanity";

export const featuredVideo = defineType({
  name: "homepage.featuredVideo",
  title: "Featured Video",
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
      name: "videoUrl",
      title: "视频地址",
      type: "url",
    }),
    defineField({
      name: "poster",
      title: "封面图",
      type: "imageWithAlt",
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
      title: `🎞️ Featured Video · ${title ?? "无标题"}`,
    }),
  },
});
