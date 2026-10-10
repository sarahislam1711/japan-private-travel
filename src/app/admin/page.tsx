import Link from "next/link";
import { requireAdmin } from "@/lib/enquiries/admin-auth";
import { listAdvisorRequests } from "@/lib/enquiries/advisors";
import { formatDate } from "@/lib/enquiries/format";
import { enquiryStore } from "@/lib/enquiries/store";
import { AdminBar } from "./AdminBar";

export const dynamic = "force-dynamic";

/** The admin dashboard: both sections at a glance, with what is new and the latest arrivals. */
export default async function AdminDashboard() {
  await requireAdmin();
  const [plans, advisors] = await Promise.all([enquiryStore().list(), listAdvisorRequests()]);
  const cards = [
    {
      href: "/admin/plans",
      title: "Trip plans",
      from: "From the Plan your trip page",
      total: plans.length,
      fresh: plans.filter((p) => p.status === "new").length,
      latest: plans.slice(0, 3).map((p) => ({ id: p.id, line: p.name, when: formatDate(p.createdAt), href: `/admin/plans/${p.id}` })),
    },
    {
      href: "/admin/advisors",
      title: "Advisor requests",
      from: "From the For travel advisors page",
      total: advisors.length,
      fresh: advisors.filter((a) => a.status === "new").length,
      latest: advisors.slice(0, 3).map((a) => ({ id: a.id, line: `${a.agency} · ${a.country}`, when: formatDate(a.createdAt), href: "/admin/advisors" })),
    },
  ];
  return (
    <>
      <AdminBar current="dashboard" />
      <main className="mx-auto grid max-w-7xl gap-4 px-6 pb-20 tablet:grid-cols-2">
        {cards.map((c) => (
          <section key={c.href} className="flex flex-col rounded-[20px] bg-plate p-7">
            <p className="text-small text-ink-soft">{c.from}</p>
            <h2 className="mt-1 font-serif text-[1.75rem]">{c.title}</h2>
            <div className="mt-5 flex gap-8">
              <p>
                <span className="block font-serif text-[2.5rem] leading-none text-pine">{c.fresh}</span>
                <span className="text-small text-ink-soft">new</span>
              </p>
              <p>
                <span className="block font-serif text-[2.5rem] leading-none">{c.total}</span>
                <span className="text-small text-ink-soft">in total</span>
              </p>
            </div>
            <ul className="mt-6 flex flex-col gap-1 border-t border-ink/10 pt-4 text-small">
              {c.latest.length ? (
                c.latest.map((l) => (
                  <li key={l.id}>
                    <Link href={l.href} className="flex justify-between gap-4 py-1.5 no-underline hover:text-pine">
                      <span className="truncate">{l.line}</span>
                      <span className="shrink-0 text-ink-soft">{l.when}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="py-1.5 text-ink-soft">Nothing yet.</li>
              )}
            </ul>
            <Link href={c.href} className="mt-6 inline-flex min-h-11 items-center self-start rounded-(--radius-control) bg-ink px-5 text-label font-bold text-plate no-underline hover:bg-pine hover:text-plate">
              Open {c.title.toLowerCase()}
            </Link>
          </section>
        ))}
      </main>
    </>
  );
}
