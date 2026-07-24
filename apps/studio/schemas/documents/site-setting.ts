import { defineType, defineField } from "sanity";

/**
 * siteSetting 是单例文档（单条），存全站通用配置：
 * - 站点名称、默认语言
 * - 联系方式（邮箱、电话、WhatsApp、微信）
 *
 * SiteHeader / SiteFooter 渲染时读取此单例。
 */
export const siteSetting = defineType({
  name: "siteSetting",
  title: "Site Setting",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "站点名称（中文）",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "defaultLocale",
      title: "默认语言",
      type: "string",
      options: {
        list: [
          { title: "中文", value: "zh" },
          { title: "English", value: "en" },
        ],
        layout: "radio",
      },
      initialValue: "en",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "contactEmail",
      title: "联系邮箱",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "联系电话",
      type: "localeString",
    }),
    defineField({
      name: "whatsApp",
      title: "WhatsApp",
      type: "localeString",
    }),
    defineField({
      name: "wechat",
      title: "微信",
      type: "localeString",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Setting（单例）" }),
  },
});
