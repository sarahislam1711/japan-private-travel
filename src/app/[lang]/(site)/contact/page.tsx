import { contact } from "@content/pages/contact";
import { summerJourneys } from "@content/pages/summer-journeys";
import { routeFor } from "@content/routes";
import type { Copy } from "@content/schema";
import { site } from "@content/site";
import { CopyText } from "@/components/CopyText";
import { SplitWords } from "@/components/SplitWords";
import { StructuredData } from "@/components/StructuredData";
import { TripPlanner, type T } from "@/components/TripPlanner";
import { copyText, isResolved } from "@/lib/copy";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("contact");

const isCopy = (v: unknown): v is Copy => typeof v === "object" && v !== null && "body" in v && "status" in v;

/**
 * Contact (CONTENT.md §10): the title and the direct routes, then the trip
 * planner, the enquiry form as six steps (Sarah, 7 Oct 2026). Home's
 * "Plan your trip" lands here.
 */
export default async function ContactPage() {
  const locale = await getLocale();
  const pick = (c: Copy): T => ({ node: <CopyText copy={c} />, text: copyText(c, locale) });

  // Every planner string, keyed by its path, in this page's language.
  const t: Record<string, T> = {};
  const walk = (v: unknown, path: string) => {
    if (isCopy(v)) t[path] = pick(v);
    else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}.${i}`));
    else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, path ? `${path}.${k}` : k);
  };
  walk({ planner: contact.planner, fields: contact.form.fields, submit: contact.form.submit, privacyLine: contact.form.privacyLine }, "");

  const summer = pick(routeFor("summerJourneys").navLabel!);
  const anywhere = pick(routeFor("privateJapan").navLabel!);
  const places = [
    ...summerJourneys.regions.map((r, i) => ({ id: `summer-${i}`, label: pick(r.heading), group: summer })),
    { id: "anywhere", label: t["planner.where.anywhere"], group: anywhere },
    { id: "suggest", label: t["planner.where.suggest"], group: anywhere },
  ];

  const opts = contact.form.fields.replyChannelOptions; // WhatsApp, Email, Telephone
  const digits = (c: Copy) => (isResolved(c) ? copyText(c).replace(/[^\d+]/g, "") : "");
  const icon = (d: string) => (
    <svg viewBox="0 0 24 24" className="size-[1.375rem]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
  const routes = [
    {
      key: "whatsapp",
      label: opts[0],
      href: `https://wa.me/${digits(site.whatsapp.e164).replace("+", "")}?text=${encodeURIComponent(copyText(site.whatsapp.prefill, locale))}`,
      // A speech bubble with a handset: the conventional sign for WhatsApp, drawn in line.
      icon: icon("M4.5 19.5l1.1-3.6A8 8 0 1 1 8.4 18.6zM9.2 8.6c.2-.4.5-.4.8-.4h.4c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .5-.1.6l-.5.6c.5 1 1.3 1.8 2.3 2.3l.6-.5c.2-.1.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.4c0 .3-.1.6-.4.8-.5.3-1.1.5-1.8.3-2.2-.6-3.9-2.3-4.5-4.5-.2-.7 0-1.3.3-1.8z"),
    },
    {
      key: "phone",
      label: opts[2],
      href: digits(site.phone) ? `tel:${digits(site.phone)}` : "#",
      icon: icon("M6.6 3.5h2.6l1.3 4-2 1.3a11 11 0 0 0 6.7 6.7l1.3-2 4 1.3v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z"),
    },
    {
      key: "email",
      label: opts[1],
      href: isResolved(site.email) ? `mailto:${copyText(site.email)}` : "#",
      icon: icon("M3.5 6.5h17v11h-17zM3.8 7l8.2 6.5L20.2 7"),
    },
  ];

  const number = isResolved(site.whatsapp.e164) ? copyText(site.whatsapp.e164).replace(/\D/g, "") : "";

  return (
    <main id="main">
      <StructuredData page="contact" />
      <section aria-labelledby="contact-page-title" className="mx-auto grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-8 px-(--page-margin) pt-10 desktop:pt-16">
        <div className="col-span-12 desktop:col-span-8">
          <h1 id="contact-page-title" data-reveal="words" className="max-w-[24ch] font-serif text-h1 font-[450] [font-variation-settings:'opsz'_60]">
            <SplitWords copy={contact.title} />
          </h1>
        </div>
        {/* The direct routes as three tap-to-act buttons (Sarah, 7 Oct 2026). */}
        <div data-reveal className="col-span-12 self-end desktop:col-span-4">
          <ul className="grid grid-cols-3 gap-2">
            {routes.map((r) => (
              <li key={r.key}>
                <a
                  href={r.href}
                  {...(r.key === "whatsapp" ? { target: "_blank", rel: "noopener" } : {})}
                  className="group flex min-h-28 flex-col items-center justify-center gap-3 rounded-[20px] bg-plate px-2 py-5 text-ink no-underline transition-colors hover:bg-pine hover:text-plate"
                >
                  <span aria-hidden className="inline-flex size-12 items-center justify-center rounded-full bg-ground text-pine transition-colors group-hover:bg-plate/15 group-hover:text-plate">
                    {r.icon}
                  </span>
                  <span className="font-gothic text-small">
                    <CopyText copy={r.label} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label={t["planner.steps.review"].text} className="mx-auto mt-12 mb-24 max-w-(--content-max) px-(--page-margin) desktop:mb-32">
        <TripPlanner t={t} locale={locale} places={places} whatsappNumber={number} />
      </section>
    </main>
  );
}
