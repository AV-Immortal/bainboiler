import { describe, expect, it } from "vitest";
import { resolveLocale } from "../resolve-locale";

describe("resolveLocale", () => {
  it("prefers cookie locale over browser hints", () => {
    const locale = resolveLocale({
      cookieLocale: "en",
      acceptLanguage: "zh-CN,zh;q=0.9,en;q=0.8",
      countryCode: "CN",
    });

    expect(locale).toBe("en");
  });

  it("defaults mainland China traffic to zh", () => {
    const locale = resolveLocale({
      acceptLanguage: "en-US,en;q=0.9",
      countryCode: "CN",
    });

    expect(locale).toBe("zh");
  });

  it("prefers zh when browser language contains zh", () => {
    const locale = resolveLocale({
      acceptLanguage: "zh-CN,zh;q=0.9,en;q=0.8",
      countryCode: "US",
    });

    expect(locale).toBe("zh");
  });

  it("defaults non-China traffic to en", () => {
    const locale = resolveLocale({
      acceptLanguage: "fr-FR,fr;q=0.9",
      countryCode: "FR",
    });

    expect(locale).toBe("en");
  });
});
