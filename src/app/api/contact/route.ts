import { NextResponse } from "next/server";
import { z } from "zod";

const payloadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  service: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(5000),
  consent: z.literal(true),
  locale: z.enum(["en", "ar"]).optional(),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_payload", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const { consent, ...fields } = parsed.data;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({
        source: "blackcubeksa.com",
        type: "consultation_request",
        submittedAt: new Date().toISOString(),
        consent: consent === true,
        ...fields,
      }),
      signal: AbortSignal.timeout(12_000),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "upstream_failed" }, { status: 502 });
    }
  } catch {
    return NextResponse.json(
      { error: "upstream_unreachable" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
