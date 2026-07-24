/**
 * Next.js 端 i18n 共享：和 apps/studio/i18n/supported-languages.ts 保持一致。
 * 任何修改同时改两边。
 */
export const supportedLanguageIds = ["zh", "en"] as const;
export type SupportedLanguageId = (typeof supportedLanguageIds)[number];

export const defaultLanguageId: SupportedLanguageId = "en";
