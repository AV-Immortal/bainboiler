import { statItem } from "./shared/items";
import { cardItem } from "./shared/items";
import { imageWithAlt } from "./shared/media";
import { fileWithLabel } from "./shared/media";
import { localeString } from "./locale";
import { localeText } from "./locale";
import { localePortableText } from "./locale";
import { localeUrl } from "./locale";
import { seo } from "./seo";

import { heroVideo } from "./homepage/hero-video";
import { brandStats } from "./homepage/brand-stats";
import { companyIntro } from "./homepage/company-intro";
import { productCategories } from "./homepage/product-categories";
import { industrySolutions } from "./homepage/industry-solutions";
import { projectShowcase } from "./homepage/project-showcase";
import { certificatesExport } from "./homepage/certificates-export";
import { featuredVideo } from "./homepage/featured-video";
import { latestNews } from "./homepage/latest-news";
import { contactCta } from "./homepage/contact-cta";

import { page } from "../documents/page";
import { product } from "../documents/product";
import { project } from "../documents/project";
import { solution } from "../documents/solution";
import { article } from "../documents/article";
import { download } from "../documents/download";
import { video } from "../documents/video";
import { siteSetting } from "../documents/site-setting";

export const schemaTypes = [
  // 共享对象
  localeString,
  localeText,
  localePortableText,
  localeUrl,
  seo,
  imageWithAlt,
  fileWithLabel,
  statItem,
  cardItem,

  // 10 个 homepage module
  heroVideo,
  brandStats,
  companyIntro,
  productCategories,
  industrySolutions,
  projectShowcase,
  certificatesExport,
  featuredVideo,
  latestNews,
  contactCta,

  // 8 个 document
  page,
  product,
  project,
  solution,
  article,
  download,
  video,
  siteSetting,
];
