import { describe, expect, it } from "vitest";
import { mapSanityList } from "../content-list";

describe("mapSanityList", () => {
  it("maps Sanity records into card items with locale-aware title and summary", () => {
    const result = mapSanityList(
      [
        {
          slug: "wns-steam-boiler",
          title: { zh: "WNS 蒸汽锅炉", en: "WNS Steam Boiler" },
          summary: { zh: "高效蒸汽系统", en: "High efficiency steam system" },
        },
      ],
      "/products",
      "en",
    );

    expect(result[0]).toEqual({
      title: "WNS Steam Boiler",
      href: "/products/wns-steam-boiler",
      summary: "High efficiency steam system",
    });
  });

  it("normalizes trailing slashes and empty summaries", () => {
    const result = mapSanityList(
      [
        {
          slug: "szs-hot-water-boiler",
          title: { zh: "SZS 热水锅炉", en: "SZS Hot Water Boiler" },
          summary: { zh: "", en: null },
        },
      ],
      "/en/products/",
      "en",
    );

    expect(result[0]).toEqual({
      title: "SZS Hot Water Boiler",
      href: "/en/products/szs-hot-water-boiler",
      summary: "",
    });
  });

  it("falls back to the other locale when requested locale is missing", () => {
    const result = mapSanityList(
      [
        {
          slug: "x",
          title: { zh: "只有中文", en: undefined },
          summary: { zh: "中文摘要", en: undefined },
        },
      ],
      "/zh/products",
      "en",
    );

    expect(result[0]?.title).toBe("只有中文");
    expect(result[0]?.summary).toBe("中文摘要");
  });

  it("filters out records with empty slug", () => {
    const result = mapSanityList(
      [
        { slug: "", title: { zh: "无", en: "no" }, summary: { zh: "", en: "" } },
        { slug: "ok", title: { zh: "好的", en: "ok" }, summary: { zh: "", en: "" } },
      ],
      "/products",
      "en",
    );

    expect(result).toHaveLength(1);
    expect(result[0]?.href).toBe("/products/ok");
  });
});
