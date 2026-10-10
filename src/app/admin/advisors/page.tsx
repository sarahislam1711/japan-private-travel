import { requireAdmin } from "@/lib/enquiries/admin-auth";
import { ADVISOR_STATUSES, listAdvisorRequests } from "@/lib/enquiries/advisors";
import { formatDate } from "@/lib/enquiries/format";
import { updateAdvisor } from "../actions";
import { AdminBar } from "../AdminBar";

export const dynamic = "force-dynamic";

const label = { new: "New", verifying: "Verifying", approved: "Approved", declined: "Declined" } as const;

/** Agent access requests from the For travel advisors page: check each agency, then set its status. */
export default async function AdvisorRequestsPage() {
  await requireAdmin();
  const all = await listAdvisorRequests();
  return (
    <>
      <AdminBar />
      <main className="mx-auto max-w-7xl px-6 pb-20">
        <h1 className="font-serif text-[1.75rem]">Advisor requests</h1>
        {all.length === 0 ? (
          <p className="mt-12 text-center text-ink-soft">No requests yet. They appear here when an advisor sends the form.</p>
        ) : (
          <ul className="mt-6 flex flex-col gap-3">
            {all.map((r) => (
              <li key={r.id} className="grid gap-4 rounded-[14px] bg-plate p-5 desktop:grid-cols-12">
                <div className="desktop:col-span-7">
                  <p className="font-serif text-[1.25rem]">
                    {r.agency} <span className="font-gothic text-small text-ink-soft">· {r.country} · {r.network}</span>
                  </p>
                  <p className="mt-1 text-small">
                    {r.name} ·{" "}
                    <a href={`mailto:${r.email}`} className="text-ink">
                      {r.email}
                    </a>
                  </p>
                  <p className="mt-1 text-small text-ink-soft">
                    Registration / IATA: {r.registration} · {r.locale === "ar" ? "Arabic site" : "English site"} · {formatDate(r.createdAt)}
                  </p>
                </div>
                <form action={updateAdvisor} className="flex flex-col gap-2 desktop:col-span-5">
                  <input type="hidden" name="id" value={r.id} />
                  <div className="flex gap-2">
                    <select name="status" defaultValue={r.status} className="min-h-10 flex-1 cursor-pointer rounded-(--radius-control) bg-ground px-3 text-small">
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
                  <textarea name="notes" defaultValue={r.notes} rows={2} placeholder="Team notes" className="rounded-(--radius-control) bg-ground p-2 text-small" />
                </form>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
