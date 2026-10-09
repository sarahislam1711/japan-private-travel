import Link from "next/link";
import { requireAdmin } from "@/lib/enquiries/admin-auth";
import { statusLabel, total, travellers, when, where, formatDate, languageLabel, replyLabel } from "@/lib/enquiries/format";
import { STATUSES, type Status } from "@/lib/enquiries/schema";
import { enquiryStore } from "@/lib/enquiries/store";
import { AdminBar } from "./AdminBar";

export const dynamic = "force-dynamic";

const tone: Record<Status, string> = {
  new: "bg-pine text-plate",
  in_progress: "bg-pine/15 text-pine",
  quoted: "bg-ink/10 text-ink",
  booked: "bg-ink text-plate",
  closed: "bg-mist text-ink-soft",
};

/** Every plan sent from the planner, newest first, with status tabs and search. */
export default async function AdminHome({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  await requireAdmin();
  const { status, q } = await searchParams;
  const all = await enquiryStore().list();
  const query = (q ?? "").trim().toLowerCase();
  const shown = all.filter(
    (e) => (!status || e.status === status) && (!query || [e.name, e.contact, e.needs, e.datesNote].join(" ").toLowerCase().includes(query)),
  );
  const count = (s?: Status) => (s ? all.filter((e) => e.status === s).length : all.length);
  const tab = (s: Status | undefined, label: string) => {
    const active = status === s || (!status && !s);
    const params = new URLSearchParams({ ...(s ? { status: s } : {}), ...(q ? { q } : {}) });
    return (
      <Link
        key={label}
        href={`/admin${params.size ? `?${params}` : ""}`}
        className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-small no-underline transition-colors ${active ? "bg-ink text-plate" : "bg-plate text-ink hover:bg-mist"}`}
      >
        {label}
        <span className={active ? "text-plate/70" : "text-ink-soft"}>{count(s)}</span>
      </Link>
    );
  };

  return (
    <>
      <AdminBar />
      <main className="mx-auto max-w-7xl px-6 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Status" className="flex flex-wrap gap-2">
            {tab(undefined, "All")}
            {STATUSES.map((s) => tab(s, statusLabel[s]))}
          </nav>
          <form className="flex gap-2">
            {status ? <input type="hidden" name="status" value={status} /> : null}
            <input name="q" defaultValue={q} placeholder="Search name, contact, notes" className="min-h-10 w-64 rounded-full bg-plate px-4 text-small outline-pine" />
          </form>
        </div>

        {shown.length === 0 ? (
          <p className="mt-16 text-center text-ink-soft">{all.length === 0 ? "No plans yet. They appear here as soon as someone sends one from the planner." : "Nothing matches."}</p>
        ) : (
          <ul className="mt-6 flex flex-col gap-2">
            {shown.map((e) => (
              <li key={e.id}>
                <Link href={`/admin/${e.id}`} className="grid grid-cols-12 items-center gap-x-4 gap-y-1 rounded-[14px] bg-plate px-5 py-4 no-underline transition-colors hover:bg-white">
                  <span className="col-span-12 flex min-w-0 items-center gap-3 tablet:col-span-4">
                    <span className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[0.75rem] ${tone[e.status]}`}>{statusLabel[e.status]}</span>
                    <span className="truncate font-serif text-[1.125rem]">{e.name}</span>
                  </span>
                  <span className="col-span-6 text-small text-ink tablet:col-span-3">
                    {total(e)} · {travellers(e)}
                  </span>
                  <span className="col-span-6 truncate text-small text-ink-soft tablet:col-span-2">{when(e) || "—"}</span>
                  <span className="col-span-6 truncate text-small text-ink-soft tablet:col-span-1">{where(e) || "—"}</span>
                  <span className="col-span-6 text-end text-[0.8125rem] whitespace-nowrap text-ink-soft tablet:col-span-2">
                    {replyLabel[e.reply]} · {languageLabel[e.language]}
                    <br />
                    {formatDate(e.createdAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
