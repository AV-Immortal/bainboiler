import type {
  CmsLocale,
  HomepageCardItem,
  HomepageCertificatesExportModule,
  HomepageCompanyIntroModule,
  HomepageContactCtaModule,
  HomepageBrandStatsModule,
  HomepageFeaturedVideoModule,
  HomepageConfig,
  HomepageHeroVideoModule,
  HomepageIndustrySolutionsModule,
  HomepageLatestNewsModule,
  HomepageModule,
  HomepageProductCategoriesModule,
  HomepageProjectShowcaseModule,
  HomepageStatItem,
  HomepageViewModel,
} from "../../../types/cms";

const homepageFallbackContent: Record<
  CmsLocale,
  Omit<HomepageViewModel, "locale">
> = {
  en: {
    seo: {
      title: "BAIN BOILER | Industrial Boiler Systems",
      description:
        "Premium industrial boiler systems, thermal engineering, and export-oriented energy solutions for global clients.",
    },
    hero: {
      headline: "Industrial boiler systems built for demanding operations.",
      subheadline:
        "Integrated steam, hot water, and thermal oil solutions engineered for reliability, export delivery, and long-term plant performance.",
      primaryCta: "Get Quote",
      secondaryCta: "Watch Video",
      videoUrl: undefined,
      posterUrl: undefined,
    },
    stats: [
      { label: "Export Markets", value: "30+" },
      { label: "Thermal System Types", value: "12" },
      { label: "Project Response", value: "24H" },
      { label: "Engineering Focus", value: "100%" },
    ],
    companyIntro: {
      eyebrow: "ABOUT BAIN BOILER",
      title: "Manufacturing-led delivery for complex industrial heat demand.",
      description:
        "We support plant operators, EPC teams, and industrial groups with boiler packages, thermal system integration, and dependable project execution from specification to commissioning.",
      highlights: [
        { label: "Manufacturing", value: "Integrated" },
        { label: "Project Support", value: "End-to-End" },
        { label: "Application Coverage", value: "Multi-Industry" },
      ],
    },
    productCategories: {
      eyebrow: "PRODUCT PLATFORM",
      title: "A complete boiler portfolio aligned to plant duty and fuel strategy.",
      description:
        "Structured product lines help procurement teams compare capacity, combustion, and operating scenarios quickly.",
      items: [
        {
          title: "Steam Boilers",
          description:
            "High-efficiency steam generation packages for process manufacturing and utility systems.",
          href: "/en/products",
          meta: "Process heat",
        },
        {
          title: "Hot Water Boilers",
          description:
            "Stable hot water systems for district, commercial, and industrial heating applications.",
          href: "/en/products",
          meta: "Heating",
        },
        {
          title: "Thermal Oil Heaters",
          description:
            "High-temperature indirect heating solutions for continuous-duty industrial operations.",
          href: "/en/products",
          meta: "High temperature",
        },
      ],
    },
    industrySolutions: {
      eyebrow: "INDUSTRY SOLUTIONS",
      title: "Thermal system solutions shaped around real operating environments.",
      description:
        "We configure combustion, control, and package strategies based on the uptime, compliance, and energy expectations of each industry.",
      items: [
        {
          title: "Food & Beverage",
          description:
            "Clean, stable heat support for cooking, sterilization, and utility demand.",
          href: "/en/solutions",
          meta: "Hygiene-driven",
        },
        {
          title: "Textile & Printing",
          description:
            "Consistent process steam for dyeing, finishing, and production continuity.",
          href: "/en/solutions",
          meta: "Continuous load",
        },
        {
          title: "Chemical Processing",
          description:
            "Robust heat delivery for demanding temperature profiles and safety requirements.",
          href: "/en/solutions",
          meta: "Critical duty",
        },
      ],
    },
    projectShowcase: {
      eyebrow: "PROJECT EXECUTION",
      title: "Delivery experience spanning plant upgrades and new industrial capacity.",
      description:
        "Selected project profiles show how we balance engineering scope, schedule coordination, and system reliability.",
      items: [
        {
          title: "Central Utility Boiler House Upgrade",
          description:
            "Multi-unit replacement project focused on staged installation and uninterrupted plant production.",
          href: "/en/projects",
          meta: "Utility revamp",
        },
        {
          title: "Export Package for Manufacturing Campus",
          description:
            "Container-ready boiler system with controls, auxiliaries, and project documentation for overseas deployment.",
          href: "/en/projects",
          meta: "Export delivery",
        },
      ],
    },
    certificatesExport: {
      eyebrow: "QUALITY & EXPORT",
      title: "Documentation discipline that supports approval and cross-border delivery.",
      description:
        "Project teams receive structured technical files, manufacturing records, and export-oriented coordination support.",
      items: [
        "Factory quality records",
        "Inspection and acceptance documents",
        "Commissioning handover package",
      ],
      primaryCta: "View Downloads",
    },
    featuredVideo: {
      eyebrow: "VIDEO CENTER",
      title: "See boiler engineering, fabrication, and delivery in motion.",
      description:
        "A featured media block gives visitors a fast view of workshop capability, system detail, and project readiness.",
      videoUrl: undefined,
      posterUrl: undefined,
      primaryCta: "Explore Videos",
    },
    latestNews: {
      eyebrow: "LATEST NEWS",
      title: "Updates on products, projects, and industrial energy insights.",
      description:
        "Use this area to publish technical updates, delivery news, and corporate developments for customers and partners.",
      items: [
        {
          title: "How to evaluate industrial boiler system lifecycle value",
          description:
            "A practical view of specification, efficiency, maintainability, and project support.",
          href: "/en/news",
          meta: "Insight",
        },
        {
          title: "Preparing export-ready boiler documentation packages",
          description:
            "What overseas customers expect from technical files and delivery coordination.",
          href: "/en/news",
          meta: "Guide",
        },
      ],
    },
    contactCta: {
      eyebrow: "PROJECT INQUIRY",
      title: "Discuss your plant demand with an engineering-focused team.",
      description:
        "Share capacity, fuel, pressure, and application requirements. We will help scope a fit-for-purpose boiler solution.",
      primaryCta: "Contact Us",
      secondaryCta: "Download Profile",
    },
  },
  zh: {
    seo: {
      title: "BAIN BOILER | 工业锅炉系统与热能方案",
      description:
        "面向全球客户提供工业锅炉系统、热能工程集成与出口交付支持，体现国际重工企业形象。",
    },
    hero: {
      headline: "为高要求工业场景打造稳定可靠的锅炉系统。",
      subheadline:
        "覆盖蒸汽、热水与导热油系统的一体化热能方案，兼顾工程交付、出口配套与长期运行表现。",
      primaryCta: "立即询盘",
      secondaryCta: "观看视频",
      videoUrl: undefined,
      posterUrl: undefined,
    },
    stats: [
      { label: "出口市场", value: "30+" },
      { label: "热能系统类型", value: "12" },
      { label: "项目响应", value: "24H" },
      { label: "工程导向", value: "100%" },
    ],
    companyIntro: {
      eyebrow: "关于百恩锅炉",
      title: "以制造能力为基础，服务复杂工业热能需求。",
      description:
        "我们面向工厂客户、EPC 团队与工业集团，提供锅炉设备、系统集成与项目交付支持，从方案确认到调试投运保持工程协同。",
      highlights: [
        { label: "制造体系", value: "一体化" },
        { label: "项目支持", value: "端到端" },
        { label: "应用行业", value: "多领域" },
      ],
    },
    productCategories: {
      eyebrow: "产品平台",
      title: "围绕工况、容量与燃料策略构建完整锅炉产品矩阵。",
      description:
        "通过清晰的产品结构，帮助采购与技术团队快速比较不同热能系统的适用场景与配置重点。",
      items: [
        {
          title: "蒸汽锅炉",
          description:
            "适用于流程制造与公用工程系统的高效蒸汽发生设备。",
          href: "/zh/products",
          meta: "工艺热源",
        },
        {
          title: "热水锅炉",
          description:
            "适用于工业与商业供热场景的稳定热水系统。",
          href: "/zh/products",
          meta: "供热系统",
        },
        {
          title: "导热油炉",
          description:
            "满足连续工况下高温间接加热需求的热能设备。",
          href: "/zh/products",
          meta: "高温应用",
        },
      ],
    },
    industrySolutions: {
      eyebrow: "行业解决方案",
      title: "围绕真实生产环境配置热能系统解决方案。",
      description:
        "依据不同行业对稳定性、能效、合规和维护性的要求，组合燃烧、控制与系统配套策略。",
      items: [
        {
          title: "食品饮料",
          description:
            "满足蒸煮、杀菌与公用工程需求的稳定热源配置。",
          href: "/zh/solutions",
          meta: "洁净工况",
        },
        {
          title: "纺织印染",
          description:
            "为染整与连续生产提供稳定过程蒸汽支持。",
          href: "/zh/solutions",
          meta: "连续负荷",
        },
        {
          title: "化工制造",
          description:
            "面向高要求温控与安全标准的工业热能系统。",
          href: "/zh/solutions",
          meta: "关键工况",
        },
      ],
    },
    projectShowcase: {
      eyebrow: "工程案例",
      title: "覆盖改造升级与新增产能的工业项目交付经验。",
      description:
        "通过典型项目展示我们在工程范围、进度配合和系统可靠性方面的交付能力。",
      items: [
        {
          title: "集中锅炉房升级项目",
          description:
            "以分阶段安装与不停产切换为重点的多台设备替换方案。",
          href: "/zh/projects",
          meta: "公用工程改造",
        },
        {
          title: "海外制造园区出口配套项目",
          description:
            "面向海外部署的成套锅炉系统，包含控制与辅助设备。",
          href: "/zh/projects",
          meta: "出口交付",
        },
      ],
    },
    certificatesExport: {
      eyebrow: "质量与出口",
      title: "支撑审批、验收与跨境交付的文件化能力。",
      description:
        "为项目提供结构化技术资料、制造记录和出口协同支持，帮助客户推进审批与交付流程。",
      items: [
        "工厂质量记录",
        "检验与验收文件",
        "调试与移交资料包",
      ],
      primaryCta: "查看下载中心",
    },
    featuredVideo: {
      eyebrow: "视频中心",
      title: "通过视频快速了解制造、装配与交付能力。",
      description:
        "重点视频模块用于展示工厂能力、设备细节与项目准备状态，强化品牌可信度。",
      videoUrl: undefined,
      posterUrl: undefined,
      primaryCta: "进入视频中心",
    },
    latestNews: {
      eyebrow: "最新动态",
      title: "发布产品、项目与工业热能洞察内容。",
      description:
        "可用于展示技术文章、项目进展与企业资讯，帮助客户持续了解品牌能力。",
      items: [
        {
          title: "如何评估工业锅炉系统的全生命周期价值",
          description:
            "从规格、效率、可维护性到服务支持，理解系统选择的关键维度。",
          href: "/zh/news",
          meta: "洞察",
        },
        {
          title: "出口项目锅炉资料包应如何准备",
          description:
            "梳理海外客户关注的技术文件、检验资料与交付协同要点。",
          href: "/zh/news",
          meta: "指南",
        },
      ],
    },
    contactCta: {
      eyebrow: "项目咨询",
      title: "与工程导向团队讨论您的热能需求。",
      description:
        "欢迎提交容量、燃料、压力与应用场景等需求信息，我们将协助评估适合的锅炉方案。",
      primaryCta: "联系我们",
      secondaryCta: "下载资料",
    },
  },
};

function isHeroModule(module: HomepageModule): module is HomepageHeroVideoModule {
  return module.key === "hero-video";
}

function isStatsModule(module: HomepageModule): module is HomepageBrandStatsModule {
  return module.key === "brand-stats";
}

function isCompanyIntroModule(
  module: HomepageModule,
): module is HomepageCompanyIntroModule {
  return module.key === "company-intro";
}

function isProductCategoriesModule(
  module: HomepageModule,
): module is HomepageProductCategoriesModule {
  return module.key === "product-categories";
}

function isIndustrySolutionsModule(
  module: HomepageModule,
): module is HomepageIndustrySolutionsModule {
  return module.key === "industry-solutions";
}

function isProjectShowcaseModule(
  module: HomepageModule,
): module is HomepageProjectShowcaseModule {
  return module.key === "project-showcase";
}

function isCertificatesExportModule(
  module: HomepageModule,
): module is HomepageCertificatesExportModule {
  return module.key === "certificates-export";
}

function isFeaturedVideoModule(
  module: HomepageModule,
): module is HomepageFeaturedVideoModule {
  return module.key === "featured-video";
}

function isLatestNewsModule(
  module: HomepageModule,
): module is HomepageLatestNewsModule {
  return module.key === "latest-news";
}

function isContactCtaModule(
  module: HomepageModule,
): module is HomepageContactCtaModule {
  return module.key === "contact-cta";
}

function normalizeStats(items: HomepageStatItem[] | undefined) {
  return items ?? [];
}

function normalizeCards(items: HomepageCardItem[] | undefined) {
  return items ?? [];
}

function preferArray<T>(value: T[], fallback: T[]) {
  return value.length > 0 ? value : fallback;
}

export function mapHomepage(config: HomepageConfig): HomepageViewModel {
  const fallback = homepageFallbackContent[config.locale];
  const heroModule = config.modules.find(isHeroModule);
  const statsModule = config.modules.find(isStatsModule);
  const companyIntroModule = config.modules.find(isCompanyIntroModule);
  const productCategoriesModule = config.modules.find(isProductCategoriesModule);
  const industrySolutionsModule = config.modules.find(isIndustrySolutionsModule);
  const projectShowcaseModule = config.modules.find(isProjectShowcaseModule);
  const certificatesExportModule = config.modules.find(isCertificatesExportModule);
  const featuredVideoModule = config.modules.find(isFeaturedVideoModule);
  const latestNewsModule = config.modules.find(isLatestNewsModule);
  const contactCtaModule = config.modules.find(isContactCtaModule);

  return {
    locale: config.locale,
    seo: {
      title: config.seoTitle ?? config.title ?? fallback.seo.title,
      description: config.seoDescription ?? fallback.seo.description,
    },
    hero: {
      headline: heroModule?.headline ?? fallback.hero.headline,
      subheadline: heroModule?.subheadline ?? fallback.hero.subheadline,
      primaryCta: heroModule?.primaryCta || fallback.hero.primaryCta,
      secondaryCta: heroModule?.secondaryCta || fallback.hero.secondaryCta,
      videoUrl: heroModule?.videoUrl ?? fallback.hero.videoUrl,
      posterUrl: heroModule?.posterUrl ?? fallback.hero.posterUrl,
    },
    stats: preferArray(normalizeStats(statsModule?.items), fallback.stats),
    companyIntro: {
      eyebrow: companyIntroModule?.eyebrow || fallback.companyIntro.eyebrow,
      title: companyIntroModule?.title ?? fallback.companyIntro.title,
      description:
        companyIntroModule?.description ?? fallback.companyIntro.description,
      highlights: preferArray(
        normalizeStats(companyIntroModule?.highlights),
        fallback.companyIntro.highlights,
      ),
    },
    productCategories: {
      eyebrow:
        productCategoriesModule?.eyebrow || fallback.productCategories.eyebrow,
      title: productCategoriesModule?.title ?? fallback.productCategories.title,
      description:
        productCategoriesModule?.description ??
        fallback.productCategories.description,
      items: preferArray(
        normalizeCards(productCategoriesModule?.items),
        fallback.productCategories.items,
      ),
    },
    industrySolutions: {
      eyebrow:
        industrySolutionsModule?.eyebrow || fallback.industrySolutions.eyebrow,
      title: industrySolutionsModule?.title ?? fallback.industrySolutions.title,
      description:
        industrySolutionsModule?.description ??
        fallback.industrySolutions.description,
      items: preferArray(
        normalizeCards(industrySolutionsModule?.items),
        fallback.industrySolutions.items,
      ),
    },
    projectShowcase: {
      eyebrow:
        projectShowcaseModule?.eyebrow || fallback.projectShowcase.eyebrow,
      title: projectShowcaseModule?.title ?? fallback.projectShowcase.title,
      description:
        projectShowcaseModule?.description ??
        fallback.projectShowcase.description,
      items: preferArray(
        normalizeCards(projectShowcaseModule?.items),
        fallback.projectShowcase.items,
      ),
    },
    certificatesExport: {
      eyebrow:
        certificatesExportModule?.eyebrow ||
        fallback.certificatesExport.eyebrow,
      title:
        certificatesExportModule?.title ?? fallback.certificatesExport.title,
      description:
        certificatesExportModule?.description ??
        fallback.certificatesExport.description,
      items: preferArray(
        certificatesExportModule?.items ?? [],
        fallback.certificatesExport.items,
      ),
      primaryCta:
        certificatesExportModule?.primaryCta ||
        fallback.certificatesExport.primaryCta,
    },
    featuredVideo: {
      eyebrow:
        featuredVideoModule?.eyebrow || fallback.featuredVideo.eyebrow,
      title: featuredVideoModule?.title ?? fallback.featuredVideo.title,
      description:
        featuredVideoModule?.description ?? fallback.featuredVideo.description,
      videoUrl: featuredVideoModule?.videoUrl ?? fallback.featuredVideo.videoUrl,
      posterUrl:
        featuredVideoModule?.posterUrl ?? fallback.featuredVideo.posterUrl,
      primaryCta:
        featuredVideoModule?.primaryCta || fallback.featuredVideo.primaryCta,
    },
    latestNews: {
      eyebrow: latestNewsModule?.eyebrow || fallback.latestNews.eyebrow,
      title: latestNewsModule?.title ?? fallback.latestNews.title,
      description:
        latestNewsModule?.description ?? fallback.latestNews.description,
      items: preferArray(
        normalizeCards(latestNewsModule?.items),
        fallback.latestNews.items,
      ),
    },
    contactCta: {
      eyebrow: contactCtaModule?.eyebrow || fallback.contactCta.eyebrow,
      title: contactCtaModule?.title ?? fallback.contactCta.title,
      description:
        contactCtaModule?.description ?? fallback.contactCta.description,
      primaryCta:
        contactCtaModule?.primaryCta || fallback.contactCta.primaryCta,
      secondaryCta:
        contactCtaModule?.secondaryCta || fallback.contactCta.secondaryCta,
    },
  };
}

export function createHomepageFallback(locale: CmsLocale): HomepageViewModel {
  return mapHomepage({
    title: locale === "zh" ? "首页" : "Home",
    locale,
    modules: [],
  });
}
