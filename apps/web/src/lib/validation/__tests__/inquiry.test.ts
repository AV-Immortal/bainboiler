import { describe, expect, it } from "vitest";
import { inquirySchema } from "../inquiry";

describe("inquirySchema", () => {
  it("accepts a valid inquiry payload", () => {
    const parsed = inquirySchema.safeParse({
      name: "Alice",
      email: "alice@example.com",
      country: "Indonesia",
      boilerType: "Steam Boiler",
      message: "Need 4 ton steam boiler quotation",
    });

    expect(parsed.success).toBe(true);
  });

  it("rejects empty message", () => {
    const parsed = inquirySchema.safeParse({
      name: "Alice",
      email: "alice@example.com",
      country: "Indonesia",
      boilerType: "Steam Boiler",
      message: "",
    });

    expect(parsed.success).toBe(false);
  });
});
