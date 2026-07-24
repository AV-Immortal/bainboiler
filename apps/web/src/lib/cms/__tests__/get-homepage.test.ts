import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getHomepage } from "../get-homepage";
import { tryGetSanityClient } from "../../../../sanity/client";

vi.mock("../../../../sanity/client", () => ({
  tryGetSanityClient: vi.fn(),
}));

const clientMock = vi.mocked(tryGetSanityClient);

type SanityPage = {
  modules?: Array<{ _type: string; _key: string }>;
  seo?: {
    title?: { zh?: string; en?: string };
    description?: { zh?: string; en?: string };
  };
};

function buildClient(data: SanityPage | null) {
  return {
    fetch: vi.fn().mockResolvedValue(data),
  } as unknown as ReturnType<typeof tryGetSanityClient> & { fetch: ReturnType<typeof vi.fn> };
}

describe("getHomepage (Sanity)", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    clientMock.mockReset();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns fallback when NEXT_PUBLIC_SANITY_PROJECT_ID is missing", async () => {
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    clientMock.mockReturnValue(null);

    const result = await getHomepage("en");
    expect(result.modules.length).toBeGreaterThan(0);
    expect(result.seo.title).toBeTruthy();
  });

  it("returns fallback when Sanity client returns null", async () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "fake";
    const client = buildClient(null);
    clientMock.mockReturnValue(client);

    const result = await getHomepage("zh");
    expect(result.modules.length).toBeGreaterThan(0);
  });

  it("uses Sanity data when client returns page with modules", async () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "fake";
    const client = buildClient({
      modules: [
        { _type: "homepage.heroVideo", _key: "k1" },
        { _type: "homepage.brandStats", _key: "k2" },
      ],
      seo: { title: { zh: "首页 - 中文", en: "Home - English" } },
    });
    clientMock.mockReturnValue(client);

    const result = await getHomepage("en");
    expect(result.modules).toHaveLength(2);
    expect(result.modules[0]?._type).toBe("homepage.heroVideo");
    expect(result.seo.title).toBe("Home - English");
  });

  it("falls back to other locale when requested locale is missing in seo", async () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "fake";
    const client = buildClient({
      modules: [{ _type: "homepage.heroVideo", _key: "k1" }],
      seo: { title: { zh: "只有中文", en: undefined } },
    });
    clientMock.mockReturnValue(client);

    const result = await getHomepage("en");
    expect(result.seo.title).toBe("只有中文");
  });

  it("falls back gracefully on Sanity fetch error", async () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "fake";
    const client = {
      fetch: vi.fn().mockRejectedValue(new Error("network down")),
    };
    clientMock.mockReturnValue(client as never);

    const result = await getHomepage("zh");
    expect(result.modules.length).toBeGreaterThan(0);
  });
});
