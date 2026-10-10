import Link from "next/link";
import { requireAdmin } from "@/lib/enquiries/admin-auth";
import { ADVISOR_STATUSES, listAdvisorRequests, type AdvisorStatus } from "@/lib/enquiries/advisors";
import { formatDate } from "@/lib/enquiries/format";
import { updateAdvisor } from "../actions";
import { AdminBar } from "../AdminBar";

export const dynamic = "force-dynamic";

const label: Record<AdvisorStatus, string> = { new: "New", verifying: "Verifying", approved: "Approved", declined: "Declined" };
const tone: Record<AdvisorStatus, string> = {
  new: "bg-pine text-plate",
  verifying: "bg-pine/15 text-pine",
  approved: "bg-ink text-plate",
  declined: "bg-mist text-ink-soft",
};

/** Agent access requests from the For travel advisors page: filter, check each agency, set its status and notes. */
export default async function AdvisorRequestsPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  await requireAdmin();
  const { status, q } = await searchParams;
  const all = await listAdvisorRequests();
  const query = (q ?? "").trim().toLowerCase();
  const shown = all.filter(
    (r) => (!status || r.status === status) && (!query || [r.agency, r.name, r.email, r.country, r.network, r.registration].join(" ").toLowerCase().includes(query)),
  );
  const count = (s?: AdvisorStatus) => (s ? all.filter((r) => r.status === s).length : all.length);
  const tab = (s: AdvisorStatus | undefined, text: string) => {
    const active = status === s || (!status && !s);
    const params = new URLSearchParams({ ...(s ? { status: s } : {}), ...(q ? { q } : {}) });
    return (
      <Link
        key={text}
        href={`/admin/advisors${params.size ? `?${params}` : ""}`}
        className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-small no-underline transition-colors ${active ? "bg-ink text-plate" : "bg-plate text-ink hover:bg-mist"}`}
      >
        {text}
        <span className={active ? "text-plate/70" : "text-ink-soft"}>{count(s)}</span>
      </Link>
    );
  };

  return (
    <>
      <AdminBar current="advisors" />
      <main className="mx-auto max-w-7xl px-6 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Status" className="flex flex-wrap gap-2">
            {tab(undefined, "All")}
            {ADVISOR_STATUSES.map((s) => tab(s, label[s]))}
          </nav>
          <form className="flex items-center gap-3">
            <a href="/admin/advisors/export" className="tap text-small text-ink">
              Export CSV
            </a>
            {status ? <input type="hidden" name="status" value={status} /> : null}
            <input name="q" defaultValue={q} placeholder="Search agency, name, email" className="min-h-10 w-64 rounded-full bg-plate px-4 text-small outline-pine" />
          </form>
        </div>

        {shown.length === 0 ? (
          <p className="mt-16 text-center text-ink-soft">{all.length === 0 ? "No requests yet. They appear here as soon as an advisor sends the form." : "Nothing matches."}</p>
        ) : (
          <ul className="mt-6 flex flex-col gap-2">
            {shown.map((r) => (
              <li key={r.id} className="grid gap-4 rounded-[14px] bg-plate p-5 desktop:grid-cols-12 desktop:items-start">
                <div className="desktop:col-span-7">
                  <p className="flex flex-wrap items-center gap-3">
                    <span className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[0.75rem] ${tone[r.status]}`}>{label[r.status]}</span>
                    <span className="font-serif text-[1.25rem]">{r.agency}</span>
                    <span className="text-small text-ink-soft">
                      {r.country} · {r.network}
                    </span>
                  </p>
                  <p className="mt-2 text-small">
                    {r.name} · {r.email}
                  </p>
                  <p className="mt-1 text-small text-ink-soft">
                    Registration / IATA: {r.registration} · {r.locale === "ar" ? "Arabic site" : "English site"} · {formatDate(r.createdAt)}
                  </p>
                  <a
                    href={`mailto:${r.email}?subject=${encodeURIComponent("HalaJapan agent access")}`}
                    className="mt-3 inline-flex min-h-10 items-center rounded-(--radius-control) bg-ink px-4 text-small font-bold text-plate no-underline hover:bg-pine hover:text-plate"
                  >
                    Email advisor
                  </a>
                </div>
                <form action={updateAdvisor} className="flex flex-col gap-2 desktop:col-span-5">
                  <input type="hidden" name="id" value={r.id} />
                  <div className="flex gap-2">
                    <select name="status" defaultValue={r.status} aria-label="Status" className="min-h-10 flex-1 cursor-pointer rounded-(--radius-control) bg-ground px-3 text-small">
                      {ADVISOR_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {label[s]}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="min-h-10 cursor-pointer rounded-(--radius-control) bg-ink px-4 text-small font-bold text-plate hover:bg-pine">
                      Save
                    </button>
                  </div>
                  <textarea name="notes" defaultValue={r.notes} rows={3} aria-label="Team notes" placeholder="Team notes (verification, contact)" className="rounded-(--radius-control) bg-ground p-2 text-small" />
                </form>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
