import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation/inquiry";

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const parsed = inquirySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { website: _website, ...inquiry } = parsed.data;

  console.info("Inquiry received", inquiry);

  return NextResponse.json({ ok: true });
}
