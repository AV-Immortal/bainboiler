import type { CmsLocale } from "../../types/cms";
import type { SanityHomepageModule } from "./mappers/homepage";

/* ------------------------------------------------------------------ */
/* locale helpers                                                      */
/* ------------------------------------------------------------------ */

function ls(zh: string, en: string) {
  return { zh, en };
}
function lt(zh: string, en: string) {
  return { zh, en };
}

/* ------------------------------------------------------------------ */
/* fallback modules（与原 10 个 section 顺序一一对应）                  */
/* ------------------------------------------------------------------ */

export const homepageFallbackModules: SanityHomepageModule[] = [
  {
    _type: "homepage.heroVideo",
    _key: "fallback-hero",
    eyebrow: ls("BAIN BOILER", "BAIN BOILER"),
    headline: ls(
      "为高要求工业场景打造稳定可靠的锅炉系统。",
      "Industrial boiler systems built for demanding operations.",
    ),
    subheadline: lt(
      "覆盖蒸汽、热水与导热油系统的一体化热能方案，兼顾工程交付、出口配套与长期运行表现。",
      "Integrated steam, hot water, and thermal oil solutions engineered for reliability, export delivery, and long-term plant performance.",
    ),
    primaryCta: ls("立即询盘", "Get Quote"),
    primaryCtaHref: null,
    secondaryCta: ls("观看视频", "Watch Video"),
    secondaryCtaHref: null,
    videoUrl: null,
    posterUrl: null,
    // 默认背景：纯色深蓝（与品牌主色一致）
    backgroundType: "color",
    backgroundColor: "#0F3460",
    backgroundGradient: null,
    backgroundImage: null,
    backgroundOverlayOpacity: 50,
  },
  {
    _type: "homepage.brandStats",
    _key: "fallback-stats",
    items: [
      { label: ls("出口市场", "Export Markets"), value: "30+" },
      { label: ls("热能系统类型", "Thermal System Types"), value: "12" },
      { label: ls("项目响应", "Project Response"), value: "24H" },
      { label: ls("工程导向", "Engineering Focus"), value: "100%" },
    ],
  },
  {
    _type: "homepage.companyIntro",
    _key: "fallback-company-intro",
    eyebrow: ls("关于百恩锅炉", "ABOUT BAIN BOILER"),
    title: ls(
      "以制造能力为基础，服务复杂工业热能需求。",
      "Manufacturing-led delivery for complex industrial heat demand.",
    ),
    description: lt(
      "我们面向工厂客户、EPC 团队与工业集团，提供锅炉设备、系统集成与项目交付支持，从方案确认到调试投运保持工程协同。",
      "We support plant operators, EPC teams, and industrial groups with boiler packages, thermal system integration, and dependable project execution from specification to commissioning.",
    ),
    highlights: [
      { label: ls("制造体系", "Manufacturing"), value: "一体化 / Integrated" },
      { label: ls("项目支持", "Project Support"), value: "端到端 / End-to-End" },
      { label: ls("应用行业", "Application Coverage"), value: "多领域 / Multi-Industry" },
    ],
  },
  {
    _type: "homepage.productCategories",
    _key: "fallback-product-categories",
    eyebrow: ls("产品平台", "PRODUCT PLATFORM"),
    title: ls(
      "围绕工况、容量与燃料策略构建完整锅炉产品矩阵。",
      "A complete boiler portfolio aligned to plant duty and fuel strategy.",
    ),
    description: lt(
      "通过清晰的产品结构，帮助采购与技术团队快速比较不同热能系统的适用场景与配置重点。",
      "Structured product lines help procurement teams compare capacity, combustion, and operating scenarios quickly.",
    ),
    items: [
      {
        title: ls("蒸汽锅炉", "Steam Boilers"),
        description: lt(
          "适用于流程制造与公用工程系统的高效蒸汽发生设备。",
          "High-efficiency steam generation packages for process manufacturing and utility systems.",
        ),
        meta: ls("工艺热源", "Process heat"),
        href: null,
        coverImageUrl: null,
      },
      {
        title: ls("热水锅炉", "Hot Water Boilers"),
        description: lt(
          "适用于工业与商业供热场景的稳定热水系统。",
          "Stable hot water systems for district, commercial, and industrial heating applications.",
        ),
        meta: ls("供热系统", "Heating"),
        href: null,
        coverImageUrl: null,
      },
      {
        title: ls("导热油炉", "Thermal Oil Heaters"),
        description: lt(
          "满足连续工况下高温间接加热需求的热能设备。",
          "High-temperature indirect heating solutions for continuous-duty industrial operations.",
        ),
        meta: ls("高温应用", "High temperature"),
        href: null,
        coverImageUrl: null,
      },
    ],
  },
  {
    _type: "homepage.industrySolutions",
    _key: "fallback-industry-solutions",
    eyebrow: ls("行业解决方案", "INDUSTRY SOLUTIONS"),
    title: ls(
      "围绕真实生产环境配置热能系统解决方案。",
      "Thermal system solutions shaped around real operating environments.",
    ),
    description: lt(
      "依据不同行业对稳定性、能效、合规和维护性的要求，组合燃烧、控制与系统配套策略。",
      "We configure combustion, control, and package strategies based on the uptime, compliance, and energy expectations of each industry.",
    ),
    items: [
      {
        title: ls("食品饮料", "Food & Beverage"),
        description: lt(
          "满足蒸煮、杀菌与公用工程需求的稳定热源配置。",
          "Clean, stable heat support for cooking, sterilization, and utility demand.",
        ),
        meta: ls("洁净工况", "Hygiene-driven"),
        href: null,
        coverImageUrl: null,
      },
      {
        title: ls("纺织印染", "Textile & Printing"),
        description: lt(
          "为染整与连续生产提供稳定过程蒸汽支持。",
          "Consistent process steam for dyeing, finishing, and production continuity.",
        ),
        meta: ls("连续负荷", "Continuous load"),
        href: null,
        coverImageUrl: null,
      },
      {
        title: ls("化工制造", "Chemical Processing"),
        description: lt(
          "面向高要求温控与安全标准的工业热能系统。",
          "Robust heat delivery for demanding temperature profiles and safety requirements.",
        ),
        meta: ls("关键工况", "Critical duty"),
        href: null,
        coverImageUrl: null,
      },
    ],
  },
  {
    _type: "homepage.projectShowcase",
    _key: "fallback-project-showcase",
    eyebrow: ls("工程案例", "PROJECT EXECUTION"),
    title: ls(
      "覆盖改造升级与新增产能的工业项目交付经验。",
      "Delivery experience spanning plant upgrades and new industrial capacity.",
    ),
    description: lt(
      "通过典型项目展示我们在工程范围、进度配合和系统可靠性方面的交付能力。",
      "Selected project profiles show how we balance engineering scope, schedule coordination, and system reliability.",
    ),
    items: [
      {
        title: ls("集中锅炉房升级项目", "Central Utility Boiler House Upgrade"),
        description: lt(
          "以分阶段安装与不停产切换为重点的多台设备替换方案。",
          "Multi-unit replacement project focused on staged installation and uninterrupted plant production.",
        ),
        meta: ls("公用工程改造", "Utility revamp"),
        href: null,
        coverImageUrl: null,
      },
      {
        title: ls("海外制造园区出口配套项目", "Export Package for Manufacturing Campus"),
        description: lt(
          "面向海外部署的成套锅炉系统，包含控制与辅助设备。",
          "Container-ready boiler system with controls, auxiliaries, and project documentation for overseas deployment.",
        ),
        meta: ls("出口交付", "Export delivery"),
        href: null,
        coverImageUrl: null,
      },
    ],
  },
  {
    _type: "homepage.certificatesExport",
    _key: "fallback-certificates",
    eyebrow: ls("质量与出口", "QUALITY & EXPORT"),
    title: ls(
      "支撑审批、验收与跨境交付的文件化能力。",
      "Documentation discipline that supports approval and cross-border delivery.",
    ),
    description: lt(
      "为项目提供结构化技术资料、制造记录和出口协同支持，帮助客户推进审批与交付流程。",
      "Project teams receive structured technical files, manufacturing records, and export-oriented coordination support.",
    ),
    items: [
      ls("工厂质量记录", "Factory quality records"),
      ls("检验与验收文件", "Inspection and acceptance documents"),
      ls("调试与移交资料包", "Commissioning handover package"),
    ],
    primaryCta: ls("查看下载中心", "View Downloads"),
  },
  {
    _type: "homepage.featuredVideo",
    _key: "fallback-featured-video",
    eyebrow: ls("视频中心", "VIDEO CENTER"),
    title: ls(
      "通过视频快速了解制造、装配与交付能力。",
      "See boiler engineering, fabrication, and delivery in motion.",
    ),
    description: lt(
      "重点视频模块用于展示工厂能力、设备细节与项目准备状态，强化品牌可信度。",
      "A featured media block gives visitors a fast view of workshop capability, system detail, and project readiness.",
    ),
    videoUrl: null,
    posterUrl: null,
    primaryCta: ls("进入视频中心", "Explore Videos"),
  },
  {
    _type: "homepage.latestNews",
    _key: "fallback-news",
    eyebrow: ls("最新动态", "LATEST NEWS"),
    title: ls(
      "发布产品、项目与工业热能洞察内容。",
      "Updates on products, projects, and industrial energy insights.",
    ),
    description: lt(
      "可用于展示技术文章、项目进展与企业资讯，帮助客户持续了解品牌能力。",
      "Use this area to publish technical updates, delivery news, and corporate developments for customers and partners.",
    ),
    items: [
      {
        title: ls("如何评估工业锅炉系统的全生命周期价值", "How to evaluate industrial boiler system lifecycle value"),
        description: lt(
          "从规格、效率、可维护性到服务支持，理解系统选择的关键维度。",
          "A practical view of specification, efficiency, maintainability, and project support.",
        ),
        meta: ls("洞察", "Insight"),
        href: null,
        coverImageUrl: null,
      },
      {
        title: ls("出口项目锅炉资料包应如何准备", "Preparing export-ready boiler documentation packages"),
        description: lt(
          "梳理海外客户关注的技术文件、检验资料与交付协同要点。",
          "What overseas customers expect from technical files and delivery coordination.",
        ),
        meta: ls("指南", "Guide"),
        href: null,
        coverImageUrl: null,
      },
    ],
  },
  {
    _type: "homepage.contactCta",
    _key: "fallback-contact-cta",
    eyebrow: ls("项目咨询", "PROJECT INQUIRY"),
    title: ls(
      "与工程导向团队讨论您的热能需求。",
      "Discuss your plant demand with an engineering-focused team.",
    ),
    description: lt(
      "欢迎提交容量、燃料、压力与应用场景等需求信息，我们将协助评估适合的锅炉方案。",
      "Share capacity, fuel, pressure, and application requirements. We will help scope a fit-for-purpose boiler solution.",
    ),
    primaryCta: ls("联系我们", "Contact Us"),
    secondaryCta: ls("下载资料", "Download Profile"),
  },
];

/* ------------------------------------------------------------------ */
/* 兜底 SEO                                                            */
/* ------------------------------------------------------------------ */

export const homepageFallbackSeo: Record<
  CmsLocale,
  { title: string; description: string }
> = {
  en: {
    title: "BAIN BOILER | Industrial Boiler Systems",
    description:
      "Premium industrial boiler systems, thermal engineering, and export-oriented energy solutions for global clients.",
  },
  zh: {
    title: "BAIN BOILER | 工业锅炉系统与热能方案",
    description:
      "面向全球客户提供工业锅炉系统、热能工程集成与出口交付支持，体现国际重工企业形象。",
  },
};
