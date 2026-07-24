import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { SanityModule } from "../sanity-block-renderer";
import type { SanityHomepageModule } from "./mappers/homepage";

function buildModules(): SanityHomepageModule[] {
  return [
    {
      _type: "homepage.heroVideo",
      _key: "h1",
      headline: { zh: "标题", en: "Headline" },
      subheadline: { zh: "副标题", en: "Sub" },
      primaryCta: { zh: "主按钮", en: "Primary" },
      secondaryCta: { zh: "次按钮", en: "Secondary" },
      videoUrl: "https://example.com/hero.mp4",
      posterUrl: "https://example.com/poster.jpg",
    },
    {
      _type: "homepage.brandStats",
      _key: "s1",
      items: [{ label: { zh: "国家", en: "Countries" }, value: "30+" }],
    },
    {
      _type: "homepage.companyIntro",
      _key: "c1",
      eyebrow: { zh: "关于", en: "About" },
      title: { zh: "公司", en: "Company" },
      description: { zh: "描述", en: "Desc" },
    },
    {
      _type: "homepage.certificatesExport",
      _key: "ce1",
      items: [{ zh: "证书1", en: "Cert1" }],
    },
  ];
}

describe("SanityModule", () => {
  it("renders a heroVideo module with locale-specific props", () => {
    const html = renderToStaticMarkup(
      <SanityModule modules={buildModules()} locale="en" />,
    );
    expect(html).toContain("Headline");
    expect(html).toContain("Primary");
    expect(html).toContain("hero.mp4");
  });

  it("uses Chinese props when locale=zh", () => {
    const html = renderToStaticMarkup(
      <SanityModule modules={buildModules()} locale="zh" />,
    );
    expect(html).toContain("标题");
    expect(html).toContain("主按钮");
  });

  it("renders all 4 module types in given order", () => {
    const html = renderToStaticMarkup(
      <SanityModule modules={buildModules()} locale="en" />,
    );
    // Hero renders first
    expect(html.indexOf("Headline")).toBeLessThan(html.indexOf("Countries"));
    // Stats appears
    expect(html).toContain("Countries");
    // Company intro appears
    expect(html).toContain("Company");
    // Certificates
    expect(html).toContain("Cert1");
  });

  it("ignores unknown module types silently", () => {
    const modules = [
      { _type: "homepage.unknownThing", _key: "u1" },
    ] as unknown as SanityHomepageModule[];
    const html = renderToStaticMarkup(
      <SanityModule modules={modules} locale="en" />,
    );
    expect(html).toBe("");
  });
});
