import type { CSSProperties } from "react";
import { familyServices } from "@content/pages/family-services";
import { home } from "@content/pages/home";
import { privateJapan as c } from "@content/pages/private-japan";
import { CopyText } from "@/components/CopyText";
import { MarginNote } from "@/components/MarginNote";
import { OnwardPanels } from "@/components/OnwardPanels";
import { PageClose } from "@/components/PageClose";
import { SplitWords } from "@/components/SplitWords";
import { StructuredData } from "@/components/StructuredData";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("privateJapan");

const d = (n: number) => ({ "--d": n }) as CSSProperties;

/**
 * Private Japan (CONTENT.md §5, rebuilt 10 Oct 2026 in the open style of
 * Summer Journeys and For travel advisors): the title with the three seasons
 * in pine and 春秋冬 set in one vertical column beside it; the four principles for the
 * household as stops on one line, each with its kanji (→ proof on transport);
 * onward to Summer Journeys and Family Packages; and the close.
 */
export default async function PrivateJapanPage() {
  const locale = await getLocale();
  // The seasons stand out in the title in pine, on the line with the rest, as July and August do on Summer Journeys.
  const accent: Record<string, string> =
    locale === "ar" ? { "الربيع": "", "الخريف": "", "الشتاء": "" } : { spring: "", autumn: "", winter: "" };
  return (
    <main id="main">
      <StructuredData page="privateJapan" />

      {/* Hero: title and lede, with the seasons set vertically beside them. */}
      <section aria-labelledby="pj-title" className="mx-auto grid max-w-(--content-max) items-center gap-x-12 gap-y-8 px-(--page-margin) pt-12 tablet:grid-cols-[1fr_auto] desktop:pt-16">
        <div>
          <h1 id="pj-title" data-reveal="words" className="sj-title max-w-[20ch] font-serif [font-variation-settings:'opsz'_60]">
            <SplitWords copy={c.title} accent={accent} />
          </h1>
          <p data-reveal style={d(1)} className="mt-7 max-w-[40rem] font-gothic text-copy text-ink-soft">
            <CopyText copy={c.lede} />
          </p>
        </div>
        <span data-reveal style={d(1)} aria-hidden lang="ja" dir="ltr" className="hidden font-mincho text-[clamp(4.5rem,7vw,7rem)] leading-[1.02] text-pine [writing-mode:vertical-rl] tablet:block">
          {c.heroImage.map((k, i) => (
            <CopyText key={i} copy={k} />
          ))}
        </span>
      </section>

      {/* The four principles: stops on one line, each with its kanji. */}
      <section aria-labelledby="pj-principles" className="section-gap mx-auto max-w-(--content-max) px-(--page-margin)">
        <h2 id="pj-principles" data-reveal className="font-serif text-h1 font-[450] [font-variation-settings:'opsz'_60]">
          <CopyText copy={c.sectionsHeading} />
        </h2>
        <ol data-reveal className="relative mt-12 grid gap-10 tablet:grid-cols-2 tablet:gap-x-8 tablet:gap-y-12 desktop:grid-cols-4">
          <span aria-hidden className="absolute start-0 end-0 top-[1.375rem] hidden h-px bg-pine/25 desktop:block" />
          {c.sections.map((s, i) => (
            <li key={i} className="relative flex flex-col gap-4">
              <span className="relative flex items-center gap-3">
                <span aria-hidden className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-pine font-gothic text-small text-plate ring-4 ring-ground tabular-nums" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span lang="ja" aria-hidden className="relative z-10 bg-ground pe-3 font-mincho text-[1.75rem] leading-none text-pine">
                  <CopyText copy={s.symbol} />
                </span>
              </span>
              <h3 className="font-serif text-[clamp(1.375rem,0.8vw+1.1rem,1.75rem)] leading-tight font-[450] [font-variation-settings:'opsz'_24]">
                <CopyText copy={s.lead} />
              </h3>
              <p className="max-w-[24rem] font-gothic text-copy text-ink-soft">
                <CopyText copy={s.body} />
              </p>
              {"margin" in s && s.margin ? (
                <div className="border-t border-ink/10 pt-3">
                  <MarginNote>
                    <CopyText copy={s.margin} />
                  </MarginNote>
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <OnwardPanels
        items={[
          { route: "summerJourneys", heading: home.entryPoints.summerJourneys.heading, text: home.entryPoints.summerJourneys.text, tone: "snow" },
          { route: "familyServices", heading: familyServices.title, text: familyServices.intro, tone: "pine" },
        ]}
      />
      <PageClose heading={home.contact.heading} />
    </main>
  );
}
