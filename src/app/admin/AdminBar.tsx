import Link from "next/link";
import { listAdvisorRequests } from "@/lib/enquiries/advisors";
import { enquiryStore, storeKind } from "@/lib/enquiries/store";
import { signOut } from "./actions";

/**
 * The admin area's top bar, on every admin page: the dashboard, the two
 * sections with their count of new items, where data is stored, and sign-out.
 *   /admin            dashboard
 *   /admin/plans      trip plans from the Contact page planner
 *   /admin/advisors   agent access requests from the For travel advisors page
 */
export async function AdminBar({ current }: { current: "dashboard" | "plans" | "advisors" }) {
  const [plans, advisors] = await Promise.all([enquiryStore().list(), listAdvisorRequests()]);
  const newPlans = plans.filter((p) => p.status === "new").length;
  const newAdvisors = advisors.filter((a) => a.status === "new").length;
  const tab = (key: typeof current, href: string, label: string, count?: number) => (
    <Link
      href={href}
      aria-current={current === key ? "page" : undefined}
      className={`inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-small no-underline transition-colors ${current === key ? "bg-ink text-plate" : "bg-plate text-ink hover:bg-mist"}`}
    >
      {label}
      {count ? <span className={`rounded-full px-2 text-[0.75rem] ${current === key ? "bg-plate/20" : "bg-pine text-plate"}`}>{count}</span> : null}
    </Link>
  );
  return (
    <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 pt-6 pb-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/admin" className="me-3 no-underline">
          <span className="font-serif text-[1.5rem]">
            <span className="text-pine">Hala</span>Japan
          </span>
          <span className="ms-2 text-small text-ink-soft">Admin</span>
        </Link>
        {tab("dashboard", "/admin", "Dashboard")}
        {tab("plans", "/admin/plans", "Trip plans", newPlans)}
        {tab("advisors", "/admin/advisors", "Advisor requests", newAdvisors)}
      </div>
      <div className="flex items-center gap-3 text-small">
        <span className="rounded-full bg-plate px-3 py-1 text-ink-soft">{storeKind() === "supabase" ? "Database: Supabase" : "Database: local file (development)"}</span>
        <form action={signOut}>
          <button type="submit" className="tap cursor-pointer text-ink-soft underline hover:text-pine">
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
