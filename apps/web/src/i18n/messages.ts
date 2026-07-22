import enMessages from "../../messages/en.json";
import zhMessages from "../../messages/zh.json";
import type { AppLocale } from "./routing";

const messageMap = {
  en: enMessages,
  zh: zhMessages,
} as const;

export type AppMessages = (typeof messageMap)[AppLocale];

export function getMessages(locale: AppLocale): AppMessages {
  return messageMap[locale];
}
