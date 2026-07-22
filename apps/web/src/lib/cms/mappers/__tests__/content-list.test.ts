import { describe, expect, it } from "vitest";
import { mapContentList } from "../content-list";

describe("mapContentList", () => {
  it("maps API records into card items", () => {
    const result = mapContentList(
      [
        {
          title: "WNS Steam Boiler",
          slug: "wns-steam-boiler",
          summary: "High efficiency steam system",
        },
      ],
      "/products",
    );

    expect(result[0]).toEqual({
      title: "WNS Steam Boiler",
      href: "/products/wns-steam-boiler",
      summary: "High efficiency steam system",
    });
  });

  it("normalizes trailing slashes and empty summaries", () => {
    const result = mapContentList(
      [
        {
          title: "SZS Hot Water Boiler",
          slug: "szs-hot-water-boiler",
          summary: null,
        },
      ],
      "/en/products/",
    );

    expect(result[0]).toEqual({
      title: "SZS Hot Water Boiler",
      href: "/en/products/szs-hot-water-boiler",
      summary: "",
    });
  });
});
