import { beforeEach, describe, expect, it, vi } from "vitest";
import { getHomepage } from "../get-homepage";
import { fetchJson } from "../fetch-json";

vi.mock("../fetch-json", () => ({
  fetchJson: vi.fn(),
}));

const fetchJsonMock = vi.mocked(fetchJson);

describe("getHomepage", () => {
  beforeEach(() => {
    fetchJsonMock.mockReset();
    process.env.CMS_BASE_URL = "http://localhost:1337";
  });

  it("loads homepage config for the requested locale and maps it", async () => {
    fetchJsonMock.mockResolvedValue({
      data: {
        title: "Home",
        locale: "en",
        modules: [
          {
            key: "hero-video",
            headline: "Industrial Boiler Systems",
            subheadline: "Premium steam boiler solutions",
          },
          {
            key: "brand-stats",
            items: [{ label: "Countries", value: "30+" }],
          },
        ],
      },
    });

    const result = await getHomepage("en");

    const [requestUrl, requestOptions] = fetchJsonMock.mock.calls[0] ?? [];

    expect(String(requestUrl)).toBe(
      "http://localhost:1337/api/page-configs?filters%5Bslug%5D%5B%24eq%5D=home&filters%5Blocale%5D%5B%24eq%5D=en&pagination%5BpageSize%5D=1",
    );
    expect(requestOptions).toEqual({
      next: { revalidate: 60 },
    });
    expect(result.hero.headline).toBe("Industrial Boiler Systems");
    expect(result.stats[0]?.value).toBe("30+");
  });

  it("throws when CMS_BASE_URL is missing", async () => {
    delete process.env.CMS_BASE_URL;

    await expect(getHomepage("zh")).rejects.toThrow(
      "CMS_BASE_URL is not configured",
    );
  });
});
