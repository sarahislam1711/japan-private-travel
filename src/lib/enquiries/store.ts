import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { withDefaults, type Enquiry, type PlanInput, type Status } from "./schema";

/**
 * Where plans are kept. With SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY set,
 * the Supabase table (Tokyo, see supabase/migrations) through its REST API;
 * otherwise a local file, for development only (.data/, git-ignored).
 */
export interface EnquiryStore {
  create(input: Omit<PlanInput, "website">): Promise<Enquiry>;
  list(): Promise<Enquiry[]>;
  get(id: string): Promise<Enquiry | null>;
  update(id: string, patch: { status?: Status; notes?: string }): Promise<Enquiry | null>;
}

export const storeKind = () => (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY ? "supabase" : "file");

export function enquiryStore(): EnquiryStore {
  return storeKind() === "supabase" ? supabaseStore() : fileStore();
}

/* ---------- local file (development) ---------- */

const FILE = join(process.cwd(), ".data", "enquiries.json");

function fileStore(): EnquiryStore {
  if (process.env.VERCEL) throw new Error("No database configured: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  const read = async (): Promise<Enquiry[]> => {
    try {
      return (JSON.parse(await readFile(FILE, "utf8")) as Enquiry[]).map(withDefaults);
    } catch {
      return [];
    }
  };
  const write = async (all: Enquiry[]) => {
    await mkdir(join(process.cwd(), ".data"), { recursive: true });
    await writeFile(FILE, JSON.stringify(all, null, 2));
  };
  return {
    async create(input) {
      const now = new Date().toISOString();
      const e: Enquiry = { ...input, id: randomUUID(), createdAt: now, updatedAt: now, status: "new", notes: "" };
      await write([e, ...(await read())]);
      return e;
    },
    async list() {
      return (await read()).toSorted((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async get(id) {
      return (await read()).find((e) => e.id === id) ?? null;
    },
    async update(id, patch) {
      const all = await read();
      const i = all.findIndex((e) => e.id === id);
      if (i < 0) return null;
      all[i] = { ...all[i], ...patch, updatedAt: new Date().toISOString() };
      await write(all);
      return all[i];
    },
  };
}

/* ---------- Supabase (production) ---------- */

type Row = {
  id: string;
  created_at: string;
  updated_at: string;
  status: Status;
  locale: "en" | "ar";
  name: string;
  reply_channel: PlanInput["reply"];
  contact: string;
  reply_language: PlanInput["language"];
  adults: number;
  grandparents: number;
  child_ages: number[];
  months: number[];
  not_sure: boolean;
  dates_note: string;
  places: PlanInput["places"];
  needs: string;
  email: string | null;
  picks: string[] | null;
  notes: string;
};

const fromRow = (r: Row): Enquiry => ({
  id: r.id,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
  status: r.status,
  locale: r.locale,
  name: r.name,
  reply: r.reply_channel,
  contact: r.contact,
  language: r.reply_language,
  adults: r.adults,
  grandparents: r.grandparents,
  childAges: r.child_ages,
  months: r.months,
  notSure: r.not_sure,
  datesNote: r.dates_note,
  places: r.places,
  needs: r.needs,
  email: r.email ?? "",
  picks: r.picks ?? [],
  notes: r.notes,
});

function supabaseStore(): EnquiryStore {
  const base = `${process.env.SUPABASE_URL!.replace(/\/$/, "")}/rest/v1/enquiries`;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const call = async (query: string, init: RequestInit = {}) => {
    const res = await fetch(`${base}${query}`, {
      ...init,
      cache: "no-store",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=representation", ...init.headers },
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
    return (await res.json()) as Row[];
  };
  return {
    async create(i) {
      const [row] = await call("", {
        method: "POST",
        body: JSON.stringify({
          locale: i.locale,
          name: i.name,
          reply_channel: i.reply,
          contact: i.contact,
          reply_language: i.language,
          adults: i.adults,
          grandparents: i.grandparents,
          child_ages: i.childAges,
          months: i.months,
          not_sure: i.notSure,
          dates_note: i.datesNote,
          places: i.places,
          needs: i.needs,
          email: i.email,
          picks: i.picks,
        }),
      });
      return fromRow(row);
    },
    async list() {
      return (await call("?select=*&order=created_at.desc&limit=1000")).map(fromRow);
    },
    async get(id) {
      const [row] = await call(`?select=*&id=eq.${encodeURIComponent(id)}`);
      return row ? fromRow(row) : null;
    },
    async update(id, patch) {
      const [row] = await call(`?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify({ ...patch, updated_at: new Date().toISOString() }),
      });
      return row ? fromRow(row) : null;
    },
  };
}
