import { experiences } from "@content/pages/experiences";
import { home } from "@content/pages/home";
import { ui as siteUi } from "@content/interface";
import { photographs } from "@content/photography.manifest";
import { photoSlots, type PhotoSlotId } from "@content/photography.slots";
import type { Copy } from "@content/schema";
import { CopyText } from "@/components/CopyText";
import { ExperiencesBrowser, type T } from "@/components/ExperiencesBrowser";
import { PageClose } from "@/components/PageClose";
import { SplitWords } from "@/components/SplitWords";
import { StructuredData } from "@/components/StructuredData";
import { copyText } from "@/lib/copy";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("experiences");

/**
 * Experiences (CONTENT.md §7): the title and intro, then the library: filter
 * by type and season, open any experience for its detail and add it to a plan.
 */
export default async function ExperiencesPage() {
  const locale = await getLocale();
  const pick = (c: Copy): T => ({ node: <CopyText copy={c} />, text: copyText(c, locale) });
  const ui = Object.fromEntries(Object.entries(experiences.ui).map(([k, v]) => [k, pick(v)]));
  // The detail panel's button adds the experience to My trip (Sarah, 10 Oct 2026).
  ui.addToTrip = pick(siteUi.trip.add);
  ui.addedToTrip = pick(siteUi.trip.added);

  return (
    <main id="main">
      <StructuredData page="experiences" />
      <section aria-labelledby="exp-title" className="mx-auto max-w-(--content-max) px-(--page-margin)">
        <ExperiencesBrowser
          header={
            <>
              <h1 id="exp-title" data-reveal="words" className="font-serif text-h1 font-[450] [font-variation-settings:'opsz'_60]">
                <SplitWords copy={experiences.title} />
              </h1>
              <p data-reveal className="mt-5 max-w-[36rem] font-gothic text-copy text-ink-soft">
                <CopyText copy={experiences.intro} />
              </p>
            </>
          }
          locale={locale}
          ui={ui}
          categories={experiences.categories.map((c, i) => ({ id: experiences.categories[i].id, label: pick(c.label), symbol: pick(c.symbol) }))}
          entries={experiences.entries.map((e) => ({
            id: e.id,
            category: e.category,
            months: e.months,
            leadTimeWeeks: e.leadTimeWeeks,
            photo: (() => {
              const id = photoSlots[`exp-${e.id}` as PhotoSlotId]?.photoId;
              const p = id ? photographs.find((x) => x.id === id) : undefined;
              return p ? { src: p.src, focus: p.focus } : undefined;
            })(),
            title: pick(e.title),
            city: pick(e.city),
            venue: pick(e.venue),
            practitioner: pick(e.practitioner),
            what: pick(e.what),
            duration: pick(e.duration),
            groupLimit: pick(e.groupLimit),
          }))}
        />
      </section>

      <PageClose heading={home.contact.heading} />
    </main>
  );
}
