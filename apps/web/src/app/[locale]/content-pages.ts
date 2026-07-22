import type { AppLocale } from "@/i18n/routing";

export type StaticContentPageKey =
  | "about"
  | "contact"
  | "privacy-policy"
  | "terms";

type ContentPageCopy = {
  title: string;
  description: string;
};

const staticPageCopy: Record<
  AppLocale,
  Record<StaticContentPageKey, ContentPageCopy>
> = {
  en: {
    about: {
      title: "About BAIN BOILER",
      description:
        "We build industrial boiler systems for domestic and global clients with a focus on reliability, efficiency, and long-term thermal performance.",
    },
    contact: {
      title: "Contact",
      description:
        "Use the inquiry form, email, phone, WhatsApp, or WeChat to reach our team about your next boiler or thermal system project.",
    },
    "privacy-policy": {
      title: "Privacy Policy",
      description:
        "This route is ready for the detailed bilingual privacy policy content that will be maintained through the CMS and legal review flow.",
    },
    terms: {
      title: "Terms",
      description:
        "This route is ready for bilingual service terms, commercial conditions, and website usage clauses as the legal content is finalized.",
    },
  },
  zh: {
    about: {
      title: "关于百恩锅炉",
      description:
        "我们面向国内及全球客户提供工业锅炉系统与热能方案，强调可靠性、效率与长期稳定运行表现。",
    },
    contact: {
      title: "联系我们",
      description:
        "欢迎通过询盘表单、邮箱、电话、WhatsApp 或微信联系百恩锅炉团队，沟通您的锅炉与热能项目需求。",
    },
    "privacy-policy": {
      title: "隐私政策",
      description:
        "该路由已预留，后续将接入中英文隐私政策正文，并与法务审校及 CMS 内容维护流程对齐。",
    },
    terms: {
      title: "服务条款",
      description:
        "该路由已预留，后续将接入中英文服务条款、商务条件与网站使用说明等正式内容。",
    },
  },
};

const productDetailFallbackCopy: Record<AppLocale, ContentPageCopy> = {
  en: {
    title: "Product Detail",
    description:
      "This draft product route is available so CMS-backed specifications, media, and download assets can be connected in a later task.",
  },
  zh: {
    title: "产品详情",
    description:
      "该产品详情路由已准备就绪，后续任务会在此接入 CMS 管理的规格参数、图片视频与资料下载内容。",
  },
};

function formatProductSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getStaticPageCopy(
  locale: AppLocale,
  page: StaticContentPageKey,
): ContentPageCopy {
  return staticPageCopy[locale][page];
}

export function getProductDetailPageCopy(
  locale: AppLocale,
  slug: string,
): ContentPageCopy {
  const fallback = productDetailFallbackCopy[locale];

  if (!slug) {
    return fallback;
  }

  const productName = formatProductSlug(slug);

  return {
    title: productName || fallback.title,
    description:
      locale === "zh"
        ? `当前详情页已匹配产品草稿路由“${slug}”，后续将接入该产品的完整 CMS 内容。`
        : `The draft detail route for "${slug}" is active and will be connected to full CMS-managed product content in a later task.`,
  };
}
