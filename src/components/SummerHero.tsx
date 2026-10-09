import { getLocale } from "@/lib/locale";
import Link from "next/link";
import { summerJourneys } from "@content/pages/summer-journeys";
import { routeFor, localePath } from "@content/routes";
import { CopyText } from "./CopyText";
import { SplitWords } from "./SplitWords";

/**
 * Summer Journeys' first screen as one flowing story, with no panels
 * (Sarah, 10 Oct 2026): the title; the crowded cities, then the turn ("The
 * north is not."); the three places strung along one line like a route, each
 * under its name in large Japanese; and the promise to close.
 */
export async function SummerHero() {
  const locale = await getLocale();
  const pj = routeFor("privateJapan");
  const s = summerJourneys.story;
  // July and August stand out in the title: pine, with 七月 and 八月 set above them.
  const accent: Record<string, string> = locale === "ar" ? { "يوليو": "七月", "أغسطس": "八月" } : { July: "七月", August: "八月" };
  return (
    <section aria-labelledby="sj-title" className="mx-auto max-w-(--content-max) px-(--page-margin) pt-12 pb-4 desktop:pt-16">
      <h1 id="sj-title" data-reveal="words" className="sj-title max-w-[20ch] font-serif [font-variation-settings:'opsz'_60]">
        <SplitWords copy={summerJourneys.title} accent={accent} />
      </h1>

      {/* The turn: a quiet line, then the answer in pine. */}
      <p data-reveal className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-gothic text-copy text-ink-soft">
          <CopyText copy={s.before} />
        </span>
        <span className="font-serif text-[clamp(1.625rem,1vw+1.1rem,2.125rem)] leading-[1.15] font-[480] text-pine [font-variation-settings:'opsz'_36]">
          <CopyText copy={s.turn} />
        </span>
      </p>

      {/* The three places along one line, like stops on a route. */}
      <ol data-reveal className="relative mt-12 grid gap-8 tablet:grid-cols-3 tablet:gap-6">
        <span aria-hidden className="absolute start-0 end-0 top-[2.1rem] hidden h-px bg-pine/25 tablet:block" />
        {s.places.map((place, i) => (
          <li key={i} className="relative flex min-w-0 flex-col gap-2 tablet:gap-4">
            <span className="relative flex items-center gap-3">
              <span aria-hidden className="relative z-10 size-3 shrink-0 rounded-full bg-pine ring-4 ring-ground" />
              <span lang="ja" className="relative z-10 bg-ground pe-3 font-mincho text-[clamp(2rem,2.6vw,2.75rem)] leading-none text-pine">
                <CopyText copy={place.name} />
              </span>
            </span>
            <span className="font-serif text-[clamp(1.25rem,0.8vw+1rem,1.625rem)] leading-snug text-ink [font-variation-settings:'opsz'_24] tablet:ps-6">
              <CopyText copy={place.line} />
            </span>
          </li>
        ))}
      </ol>

      {/* The promise, then the other seasons. */}
      <div data-reveal className="mt-14 flex flex-col gap-4 tablet:flex-row tablet:items-baseline tablet:justify-between">
        <p className="flex items-baseline gap-4 font-serif text-[clamp(1.5rem,1vw+1.1rem,2rem)] leading-tight font-[480] text-ink [font-variation-settings:'opsz'_36]">
          <span aria-hidden className="h-px w-10 shrink-0 translate-y-[-0.35em] bg-pine" />
          <CopyText copy={s.payoff} />
        </p>
        <p className="font-gothic text-label text-ink-soft">
          <CopyText copy={summerJourneys.otherSeasons} />{" "}
          <Link href={localePath(pj.key, locale)} className="tap text-ink">
            <CopyText copy={pj.navLabel!} />
          </Link>
        </p>
      </div>
    </section>
  );
}
