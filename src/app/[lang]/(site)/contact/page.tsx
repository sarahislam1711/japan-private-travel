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

  const number = isResolved(site.whatsapp.e164) ? copyText(site.whatsapp.e164).replace(/\D/g, "") : "";

  return (
    <main id="main">
      <StructuredData page="contact" />
      <section aria-labelledby="contact-page-title" className="mx-auto grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-8 px-(--page-margin) pt-10 desktop:pt-16">
        <div className="col-span-12 desktop:col-span-8">
          <h1 id="contact-page-title" data-reveal="words" className="max-w-[24ch] font-serif text-h1 [font-variation-settings:'opsz'_60]">
            <SplitWords copy={contact.title} />
          </h1>
          <p data-reveal className="mt-5 max-w-[36rem] font-gothic text-copy text-ink-soft">
            <CopyText copy={contact.formIntro} />
          </p>
        </div>
        <ul data-reveal className="col-span-12 flex flex-col gap-2 self-end font-gothic text-small text-ink-soft desktop:col-span-4 desktop:pb-1">
          {contact.routes.map((r, i) => (
            <li key={i}>
              <CopyText copy={r} />
            </li>
          ))}
          {locale === "en" ? (
            <li className="pt-2 text-ink" lang="ar" dir="rtl">
              <CopyText copy={contact.arabicLine} />
            </li>
          ) : null}
        </ul>
      </section>

      <section aria-label={t["planner.steps.review"].text} className="mx-auto mt-12 mb-24 max-w-(--content-max) px-(--page-margin) desktop:mb-32">
        <TripPlanner t={t} locale={locale} places={places} whatsappNumber={number} />
      </section>
    </main>
  );
}
