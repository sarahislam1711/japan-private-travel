import { NextResponse, type NextRequest } from "next/server";
import { PlanInput } from "@/lib/enquiries/schema";
import { enquiryStore } from "@/lib/enquiries/store";

/**
 * Receives a trip plan from the Contact page's planner, checks it again on
 * the server and saves it for the admin area. A few submissions per address
 * every ten minutes; a filled honeypot is accepted quietly and dropped.
 */
const WINDOW_MS = 10 * 60_000;
const LIMIT = 5;
const seen = new Map<string, number[]>();

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const recent = (seen.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) return NextResponse.json({ ok: false, error: "rate" }, { status: 429 });
  seen.set(ip, [...recent, now]);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  if (typeof body === "object" && body && "website" in body && (body as { website?: string }).website) {
    return NextResponse.json({ ok: true });
  }
  const parsed = PlanInput.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });

  try {
    const { website: _honeypot, ...plan } = parsed.data;
    const saved = await enquiryStore().create(plan);
    return NextResponse.json({ ok: true, id: saved.id });
  } catch (err) {
    console.error("[enquiries] could not save", err);
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }
}
