import { notFound } from "next/navigation";
import { BrandStats } from "@/modules/brand-stats";
import { CertificatesExport } from "@/modules/certificates-export";
import { CompanyIntro } from "@/modules/company-intro";
import { ContactCta } from "@/modules/contact-cta";
import { FeaturedVideo } from "@/modules/featured-video";
import { HeroVideo } from "@/modules/hero-video";
import { IndustrySolutions } from "@/modules/industry-solutions";
import { LatestNews } from "@/modules/latest-news";
import { ProductCategories } from "@/modules/product-categories";
import { ProjectShowcase } from "@/modules/project-showcase";
import { isValidLocale } from "@/i18n/routing";
import { getHomepage } from "@/lib/cms/get-homepage";
import { createHomepageFallback } from "@/lib/cms/mappers/homepage";

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const homepage = await getHomepage(locale).catch(() =>
    createHomepageFallback(locale),
  );

  return (
    <>
      <HeroVideo locale={locale} {...homepage.hero} />
      <BrandStats items={homepage.stats} />
      <CompanyIntro {...homepage.companyIntro} />
      <ProductCategories locale={locale} {...homepage.productCategories} />
      <IndustrySolutions locale={locale} {...homepage.industrySolutions} />
      <ProjectShowcase locale={locale} {...homepage.projectShowcase} />
      <CertificatesExport locale={locale} {...homepage.certificatesExport} />
      <FeaturedVideo locale={locale} {...homepage.featuredVideo} />
      <LatestNews locale={locale} {...homepage.latestNews} />
      <ContactCta locale={locale} {...homepage.contactCta} />
    </>
  );
}
