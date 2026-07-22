import { describe, expect, it } from "vitest";
import { mapHomepage } from "../homepage";

describe("mapHomepage", () => {
  it("maps hero and stats blocks from page config", () => {
    const result = mapHomepage({
      title: "Home",
      locale: "en",
      modules: [
        {
          key: "hero-video",
          headline: "Industrial Boiler Systems",
          subheadline: "Premium steam boiler solutions",
          primaryCta: "Get Quote",
          secondaryCta: "Watch Video",
          videoUrl: "https://example.com/hero.mp4",
        },
        {
          key: "brand-stats",
          items: [{ label: "Countries", value: "30+" }],
        },
      ],
    });

    expect(result.hero).toEqual({
      headline: "Industrial Boiler Systems",
      subheadline: "Premium steam boiler solutions",
      primaryCta: "Get Quote",
      secondaryCta: "Watch Video",
      videoUrl: "https://example.com/hero.mp4",
      posterUrl: undefined,
    });
    expect(result.stats).toEqual([{ label: "Countries", value: "30+" }]);
  });

  it("falls back to locale-specific CTA labels when optional fields are missing", () => {
    const result = mapHomepage({
      title: "首页",
      locale: "zh",
      modules: [
        {
          key: "hero-video",
          headline: "工业锅炉系统",
          subheadline: "面向全球客户的热能解决方案",
        },
      ],
    });

    expect(result.hero.primaryCta).toBe("立即询盘");
    expect(result.hero.secondaryCta).toBe("观看视频");
    expect(result.stats).toEqual([]);
  });
});
