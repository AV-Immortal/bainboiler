import { describe, expect, it } from "vitest";
import { buildMetadata } from "../build-metadata";

describe("buildMetadata", () => {
  it("creates alternate locale links for nested paths", () => {
    const metadata = buildMetadata({
      locale: "en",
      pathname: "/products",
      title: "Products",
      description: "Industrial boiler systems",
    });

    expect(metadata.alternates?.canonical).toBe("https://www.bainboiler.com/en/products");
    expect(metadata.alternates?.languages?.["zh-CN"]).toBe("https://www.bainboiler.com/zh/products");
    expect(metadata.alternates?.languages?.en).toBe("https://www.bainboiler.com/en/products");
    expect(metadata.openGraph?.url).toBe("https://www.bainboiler.com/en/products");
  });

  it("normalizes the locale homepage path", () => {
    const metadata = buildMetadata({
      locale: "zh",
      pathname: "",
      title: "上海百恩锅炉有限公司",
      description: "面向全球客户的工业锅炉系统与热能解决方案。",
    });

    expect(metadata.alternates?.canonical).toBe("https://www.bainboiler.com/zh");
    expect(metadata.alternates?.languages?.["zh-CN"]).toBe("https://www.bainboiler.com/zh");
    expect(metadata.alternates?.languages?.en).toBe("https://www.bainboiler.com/en");
    expect(metadata.openGraph?.url).toBe("https://www.bainboiler.com/zh");
  });
});
