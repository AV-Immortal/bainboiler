import { defineType, defineField } from "sanity";
import { localize } from "@sanity/document-internationalization";

/**
 * 短文本双语句子：标题、CTA 标签、name 等。
 * 渲染时按当前 locale 取 `field.zh` 或 `field.en`。
 */
export const localeString = defineType({
  name: "localeString",
  title: "Localized String",
  type: "object",
  fieldsets: [{ name: "translations", title: "Translations" }],
  fields: [
    defineField({
      name: "zh",
      title: "中文",
      type: "string",
      fieldset: "translations",
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
      fieldset: "translations",
    }),
  ],
});

/**
 * 长文本双语句子：description、summary、message。
 */
export const localeText = defineType({
  name: "localeText",
  title: "Localized Text",
  type: "object",
  fieldsets: [{ name: "translations", title: "Translations" }],
  fields: [
    defineField({
      name: "zh",
      title: "中文",
      type: "text",
      rows: 3,
      fieldset: "translations",
    }),
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 3,
      fieldset: "translations",
    }),
  ],
});

/**
 * 富文本双语句子（PortableText）：详情页正文。
 * 导出后供 array of block 字段引用。
 */
export const localePortableText = defineType({
  name: "localePortableText",
  title: "Localized Rich Text",
  type: "object",
  fieldsets: [{ name: "translations", title: "Translations" }],
  fields: [
    defineField({
      name: "zh",
      title: "中文",
      type: "array",
      of: [{ type: "block" }],
      fieldset: "translations",
    }),
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "block" }],
      fieldset: "translations",
    }),
  ],
});

/**
 * URL 双语包装：内部跳转可分语言。
 */
export const localeUrl = defineType({
  name: "localeUrl",
  title: "Localized URL",
  type: "object",
  fieldsets: [{ name: "translations", title: "Translations" }],
  fields: [
    defineField({
      name: "zh",
      title: "中文",
      type: "string",
      fieldset: "translations",
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
      fieldset: "translations",
    }),
  ],
});
