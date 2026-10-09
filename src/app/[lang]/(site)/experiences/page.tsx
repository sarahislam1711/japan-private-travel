import { experiences } from "@content/pages/experiences";
import { home } from "@content/pages/home";
import { localePath } from "@content/routes";
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

  return (
    <main id="main">
      <StructuredData page="experiences" />
      <section aria-labelledby="exp-title" className="mx-auto max-w-(--content-max) px-(--page-margin) pt-10 desktop:pt-16">
        <div className="grid gap-x-12 gap-y-6 desktop:grid-cols-12 desktop:items-end">
          <h1 id="exp-title" data-reveal="words" className="font-serif text-h1 font-[450] [font-variation-settings:'opsz'_60] desktop:col-span-7">
            <SplitWords copy={experiences.title} />
          </h1>
          <p data-reveal className="max-w-[34rem] font-gothic text-copy text-ink-soft desktop:col-span-5 desktop:pb-2">
            <CopyText copy={experiences.intro} />
          </p>
        </div>
      </section>

      <section aria-labelledby="exp-title" className="mx-auto mt-8 max-w-(--content-max) px-(--page-margin)">
        <ExperiencesBrowser
          locale={locale}
          contactPath={localePath("contact", locale)}
          ui={ui}
          categories={experiences.categories.map((c, i) => ({ id: experiences.categories[i].id, label: pick(c.label), symbol: pick(c.symbol) }))}
          entries={experiences.entries.map((e) => ({
            id: e.id,
            category: e.category,
            months: e.months,
            leadTimeWeeks: e.leadTimeWeeks,
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
