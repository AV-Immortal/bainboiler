import { describe, expect, it } from "vitest";
import { pickLocale } from "../homepage";

describe("pickLocale (homepage mapper helper)", () => {
  it("returns the requested locale value when present and non-empty", () => {
    expect(pickLocale({ zh: "中文", en: "English" }, "en")).toBe("English");
    expect(pickLocale({ zh: "中文", en: "English" }, "zh")).toBe("中文");
  });

  it("falls back to the other locale when requested locale is missing or empty", () => {
    expect(pickLocale({ zh: "中文", en: "" }, "en")).toBe("中文");
    expect(pickLocale({ zh: null, en: "English" }, "zh")).toBe("English");
  });

  it("returns empty string for null / undefined", () => {
    expect(pickLocale(null, "en")).toBe("");
    expect(pickLocale(undefined, "zh")).toBe("");
  });
});
