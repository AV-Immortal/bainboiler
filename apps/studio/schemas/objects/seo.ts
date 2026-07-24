import { defineType, defineField } from "sanity";

/**
 * SEO 元数据：所有可被搜索引擎索引的文档都引用此对象。
 */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Meta Title",
      type: "localeString",
      validation: (r) => r.max(70).warning("建议不超过 70 字符"),
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "localeText",
      validation: (r) => r.max(160).warning("建议不超过 160 字符"),
    }),
    defineField({
      name: "ogImage",
      title: "OG Image (optional)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
