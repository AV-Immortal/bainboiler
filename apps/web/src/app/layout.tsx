import type { ReactNode } from "react";
import "./globals.css";
import "./motion.css";
import { JsonLd, siteJsonLd } from "@/lib/seo/json-ld";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  "https://www.bainboiler.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BAIN BOILER | 工业锅炉系统与热能方案",
    template: "%s | BAIN BOILER",
  },
  description:
    "面向全球客户的工业锅炉系统与热能解决方案。Industrial boiler systems and thermal solutions for global clients.",
  applicationName: "BAIN BOILER",
  keywords: [
    "BAIN BOILER",
    "工业锅炉",
    "industrial boiler",
    "thermal solution",
    "热能方案",
    "WNS 锅炉",
    "waste heat recovery",
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
    siteName: "BAIN BOILER",
    url: SITE_URL,
    title: "BAIN BOILER | 工业锅炉系统与热能方案",
    description:
      "面向全球客户的工业锅炉系统与热能解决方案。Industrial boiler systems and thermal solutions for global clients.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BAIN BOILER",
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

export default function RootLayout({ children }: { children: ReactNode }) {
  const siteLd = siteJsonLd("zh");

  return (
    <html lang="zh-CN" suppressHydrationWarning>
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
