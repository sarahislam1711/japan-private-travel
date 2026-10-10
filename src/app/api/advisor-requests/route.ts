import { NextResponse, type NextRequest } from "next/server";
import { AdvisorInput, createAdvisorRequest } from "@/lib/enquiries/advisors";

/** Receives an agent access request, checks it on the server and saves it for the admin area. */
const seen = new Map<string, number[]>();

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const recent = (seen.get(ip) ?? []).filter((t) => now - t < 600_000);
  if (recent.length >= 5) return NextResponse.json({ ok: false }, { status: 429 });
  seen.set(ip, [...recent, now]);
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (typeof body === "object" && body && "website" in body && (body as { website?: string }).website) return NextResponse.json({ ok: true });
  const parsed = AdvisorInput.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  try {
    const { website: _h, ...req } = parsed.data;
    await createAdvisorRequest(req);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[advisor-requests] could not save", err);
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
