import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";

/** Agent access requests: checked like trip plans, stored like them (local file in development, Supabase when configured). */
export const ADVISOR_STATUSES = ["new", "verifying", "approved", "declined"] as const;
export type AdvisorStatus = (typeof ADVISOR_STATUSES)[number];

export const AdvisorInput = z.object({
  locale: z.enum(["en", "ar"]),
  name: z.string().trim().min(1).max(120),
  agency: z.string().trim().min(1).max(160),
  country: z.string().trim().min(1).max(80),
  network: z.string().trim().min(1).max(60),
  registration: z.string().trim().min(2).max(60),
  email: z.email().max(160),
  website: z.string().max(0).optional(),
});
export type AdvisorRequest = Omit<z.infer<typeof AdvisorInput>, "website"> & {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: AdvisorStatus;
  notes: string;
};

const FILE = join(process.cwd(), ".data", "advisor-requests.json");
const supa = () => (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY ? process.env.SUPABASE_URL.replace(/\/$/, "") : null);

async function call(query: string, init: RequestInit = {}) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const res = await fetch(`${supa()}/rest/v1/advisor_requests${query}`, {
    ...init,
    cache: "no-store",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=representation", ...init.headers },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  return (await res.json()) as Record<string, string>[];
}
const fromRow = (r: Record<string, string>): AdvisorRequest => ({
  id: r.id,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
  status: r.status as AdvisorStatus,
  locale: r.locale as "en" | "ar",
  name: r.name,
  agency: r.agency,
  country: r.country,
  network: r.network,
  registration: r.registration,
  email: r.email,
  notes: r.notes,
});

async function readAll(): Promise<AdvisorRequest[]> {
  try {
    return JSON.parse(await readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}
async function writeAll(all: AdvisorRequest[]) {
  await mkdir(join(process.cwd(), ".data"), { recursive: true });
  await writeFile(FILE, JSON.stringify(all, null, 2));
}

export async function createAdvisorRequest(i: Omit<z.infer<typeof AdvisorInput>, "website">) {
  if (supa()) {
    const [row] = await call("", { method: "POST", body: JSON.stringify(i) });
    return fromRow(row);
  }
  if (process.env.VERCEL) throw new Error("No database configured.");
  const now = new Date().toISOString();
  const r: AdvisorRequest = { ...i, id: randomUUID(), createdAt: now, updatedAt: now, status: "new", notes: "" };
  await writeAll([r, ...(await readAll())]);
  return r;
}

export async function listAdvisorRequests(): Promise<AdvisorRequest[]> {
  if (supa()) return (await call("?select=*&order=created_at.desc&limit=1000")).map(fromRow);
  return (await readAll()).toSorted((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateAdvisorRequest(id: string, patch: { status: AdvisorStatus; notes: string }) {
  if (supa()) {
    await call(`?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ ...patch, updated_at: new Date().toISOString() }) });
    return;
  }
  const all = await readAll();
  const i = all.findIndex((r) => r.id === id);
  if (i >= 0) {
    all[i] = { ...all[i], ...patch, updatedAt: new Date().toISOString() };
    await writeAll(all);
  }
}
