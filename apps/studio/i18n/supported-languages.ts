import { definePlugin } from "sanity";

/**
 * 支持的语言列表。每个 translatable 字段（localeString / localeText / localeUrl）内部都按这个顺序展示。
 * 增加新语言时：1) 在这里加 2) Next.js 端 i18n/routing.ts 加 3) messages 加翻译文件。
 */
export const supportedLanguages = [
  { id: "zh", title: "中文" },
  { id: "en", title: "English" },
] as const;

export type SupportedLanguageId = (typeof supportedLanguages)[number]["id"];

export const defaultLanguage: SupportedLanguageId = "zh";

/**
 * 当前路由的 locale 字符串。Next.js 端通过 sanity/i18n.ts 提供同源定义。
 */
export const languageIds = supportedLanguages.map((l) => l.id) as readonly SupportedLanguageId[];

/**
 * 简单插件占位：未来如果需要按语言分组 sidebar 项可在此扩展。
 */
export const languageGroups = definePlugin({
  name: "language-groups",
});
