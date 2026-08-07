import type { ReactNode } from "react";
import { headers } from "next/headers";
import "./globals.css";
import "./motion.css";
import { JsonLd, siteJsonLd } from "@/lib/seo/json-ld";
import { isValidLocale, type AppLocale } from "@/i18n/routing";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  "https://www.bainboiler.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "百恩锅炉 | 工业锅炉系统与热能方案",
    template: "%s",
  },
  description:
    "面向全球客户的工业锅炉系统与热能解决方案。Industrial boiler systems and thermal solutions for global clients.",
  applicationName: "百恩锅炉",
  keywords: [
    // 品牌
    "BAIN BOILER",
    "百恩锅炉",
    "Shanghai Bain Boiler",
    "上海百恩锅炉",
    // 中文：产品 / 炉型（覆盖主要搜索词）
    "工业锅炉",
    "工业锅炉厂家",
    "工业锅炉制造商",
    "锅炉厂家",
    "锅炉供应商",
    "蒸汽锅炉",
    "燃气蒸汽锅炉",
    "燃油蒸汽锅炉",
    "燃煤蒸汽锅炉",
    "生物质蒸汽锅炉",
    "热水锅炉",
    "导热油炉",
    "有机热载体锅炉",
    "余热回收锅炉",
    "余热锅炉",
    "WNS 锅炉",
    "SZS 锅炉",
    "DZL 锅炉",
    "LHS 锅炉",
    "燃煤锅炉",
    "燃油锅炉",
    "燃气锅炉",
    "生物质锅炉",
    "工业锅炉系统",
    "热能方案",
    "热能工程",
    "EPC 锅炉项目",
    "锅炉出口",
    "锅炉配件",
    "燃烧器",
    "节能锅炉",
    "低氮锅炉",
    "环保锅炉",
    // English: products / types
    "industrial boiler",
    "industrial boiler manufacturer",
    "boiler manufacturer",
    "boiler supplier",
    "steam boiler",
    "gas-fired steam boiler",
    "oil-fired steam boiler",
    "coal-fired steam boiler",
    "biomass boiler",
    "hot water boiler",
    "thermal oil heater",
    "thermal oil boiler",
    "waste heat recovery",
    "waste heat boiler",
    "WNS boiler",
    "SZS boiler",
    "DZL boiler",
    "LHS boiler",
    "thermal solution",
    "thermal energy system",
    "boiler EPC",
    "boiler export",
    "burner",
    "energy-saving boiler",
    "low-NOx boiler",
    "eco-friendly boiler",
  ],
  authors: [{ name: "BAIN BOILER", url: SITE_URL }],
  creator: "BAIN BOILER",
  publisher: "BAIN BOILER",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    siteName: "百恩锅炉",
    url: SITE_URL,
    title: "百恩锅炉 | 工业锅炉系统与热能方案",
    description:
      "面向全球客户的工业锅炉系统与热能解决方案。Industrial boiler systems and thermal solutions for global clients.",
  },
  twitter: {
    card: "summary_large_image",
    title: "百恩锅炉",
    description: "Industrial boiler systems and thermal solutions.",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  // icons：多尺寸圆角 webp（透明背景），浏览器按设备自动选择
  icons: {
    icon: [
      { url: "/favicon-16.webp", type: "image/webp", sizes: "16x16" },
      { url: "/favicon-32.webp", type: "image/webp", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon-180.webp", type: "image/webp", sizes: "180x180" },
    ],
    shortcut: [{ url: "/favicon-32.webp", type: "image/webp" }],
  },
};

/**
 * 从当前请求 URL 中解析出 locale。
 * Next.js 15 的 root layout 拿不到 [locale] params，
 * 但可以通过 middleware 注入的 x-pathname / x-locale header
 * （参见 src/middleware.ts）拿到当前语言。
 */
async function resolveLocaleFromHeaders(): Promise<AppLocale> {
  // 优先使用 middleware 显式注入的 x-locale
  const headerList = await headers();
  const fromHeader = headerList.get("x-locale");
  if (fromHeader && isValidLocale(fromHeader)) {
    return fromHeader;
  }

  // fallback：从 x-pathname 中解析
  const pathname = headerList.get("x-pathname") ?? "";
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/zh")) return "zh";
  return "zh";
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await resolveLocaleFromHeaders();
  const siteLd = siteJsonLd(locale);
  const lang = locale === "zh" ? "zh-CN" : "en";

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {siteLd.map((data, i) => (
          // 不同 schema.org @type 用不同 key 避免 React duplicate-key
          <JsonLd key={`ld-${data["@type"]}-${i}`} data={data} />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
