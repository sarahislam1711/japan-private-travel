import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/enquiries/admin-auth";
import { formatDate, languageLabel, replyHref, replyLabel, statusLabel, travellers, when, where } from "@/lib/enquiries/format";
import { STATUSES } from "@/lib/enquiries/schema";
import { enquiryStore } from "@/lib/enquiries/store";
import { updateEnquiry } from "../../actions";
import { AdminBar } from "../../AdminBar";

export const dynamic = "force-dynamic";

/** One plan in full: what the family asked for, how to reply, and the team's status and notes. */
export default async function EnquiryPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const { saved } = await searchParams;
  const e = await enquiryStore().get(id);
  if (!e) notFound();

  const rows: [string, string][] = [
    ["Travelling", travellers(e)],
    ["When", when(e) || "—"],
    ["Added to their trip", e.picks.length ? e.picks.join("\n") : "—"],
    ["Where", where(e) || "—"],
    ["What the trip needs to do", e.needs || "—"],
    ["Reply in", languageLabel[e.language]],
    ["Send the itinerary to", e.email || "—"],
    ["Reply by", `${replyLabel[e.reply]} · ${e.contact}`],
    ["Sent from", e.locale === "ar" ? "Arabic site" : "English site"],
    ["Received", formatDate(e.createdAt)],
    ["Last updated", formatDate(e.updatedAt)],
  ];

  return (
    <>
      <AdminBar current="plans" />
      <main className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 desktop:grid-cols-12">
        <section className="rounded-[20px] bg-plate p-7 desktop:col-span-8">
          <Link href="/admin/plans" className="text-small text-ink-soft">
            ← All plans
          </Link>
          <h1 className="mt-3 font-serif text-[2rem] leading-tight">{e.name}</h1>
          <a href={replyHref(e)} target="_blank" rel="noopener" className="mt-4 inline-flex min-h-11 items-center rounded-(--radius-control) bg-ink px-5 text-label font-bold text-plate no-underline hover:bg-pine hover:text-plate">
            Reply by {replyLabel[e.reply]}
          </a>
          <dl className="mt-8 grid gap-x-8 gap-y-4 tablet:grid-cols-[12rem_1fr]">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-small text-ink-soft">{k}</dt>
                <dd className="text-label whitespace-pre-wrap" dir="auto">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <form action={updateEnquiry} className="flex flex-col gap-4 rounded-[20px] bg-plate p-7 desktop:col-span-4 desktop:self-start">
          <input type="hidden" name="id" value={e.id} />
          <label className="flex flex-col gap-2 text-small text-ink-soft">
            Status
            <select name="status" defaultValue={e.status} className="min-h-11 cursor-pointer rounded-(--radius-control) bg-ground px-3 text-label text-ink">
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {statusLabel[s]}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-small text-ink-soft">
            Team notes (never shown to the family)
            <textarea name="notes" defaultValue={e.notes} rows={8} className="rounded-(--radius-control) bg-ground p-3 text-label text-ink outline-pine" />
          </label>
          <button type="submit" className="min-h-11 cursor-pointer rounded-(--radius-control) bg-ink px-5 text-label font-bold text-plate hover:bg-pine">
            Save
          </button>
          {saved ? (
            <p role="status" className="text-small text-pine">
              Saved.
            </p>
          ) : null}
        </form>
      </main>
    </>
  );
}
