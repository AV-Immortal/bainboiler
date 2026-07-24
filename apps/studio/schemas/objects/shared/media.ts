import { defineType, defineField } from "sanity";

/**
 * 图片 + 双语 alt。Next.js 端用 @sanity/image-url 转换尺寸。
 */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image with alt text",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "图片",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "alt",
      title: "替代文本（无障碍）",
      type: "localeString",
      description: "鼠标悬停前/图片加载失败时显示。建议每种语言都填。",
    }),
    defineField({
      name: "caption",
      title: "图注（可选）",
      type: "localeString",
    }),
  ],
  preview: {
    select: { media: "image", zh: "alt.zh", en: "alt.en" },
    prepare: ({ media, zh, en }) => ({
      title: zh || en || "Untitled image",
      subtitle: en,
      media,
    }),
  },
});

/**
 * 文件 + 双语文件名：用于 downloads/attachments。
 */
export const fileWithLabel = defineType({
  name: "fileWithLabel",
  title: "File with label",
  type: "object",
  fields: [
    defineField({
      name: "file",
      title: "文件",
      type: "file",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "label",
      title: "显示名称",
      type: "localeString",
    }),
  ],
});
