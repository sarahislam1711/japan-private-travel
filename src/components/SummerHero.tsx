import { getLocale } from "@/lib/locale";
import Image from "next/image";
import Link from "next/link";
import { photographs } from "@content/photography.manifest";
import { photoSlots } from "@content/photography.slots";
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
  const photo = photographs.find((p) => p.id === photoSlots["sj-hero"].photoId);
  // July and August stand out in the title in pine, on the line with the rest (no notes above, Sarah 10 Oct 2026).
  const accent: Record<string, string> = locale === "ar" ? { "يوليو": "", "أغسطس": "" } : { July: "", August: "" };
  return (
    <section aria-labelledby="sj-title" className="relative isolate">
      {/* A summer photo, faded behind the open side of the title (Sarah, 10 Oct 2026). Decorative. */}
      {photo ? (
        <div aria-hidden className="hero-photo pointer-events-none absolute inset-y-0 end-0 -z-10 w-full opacity-30 tablet:opacity-45 desktop:w-[65%]">
          <Image src={photo.src} alt="" fill priority sizes="(min-width: 1280px) 65vw, 100vw" className="object-cover" style={{ objectPosition: photo.focus }} />
        </div>
      ) : null}
      <div className="mx-auto max-w-(--content-max) px-(--page-margin) pt-12 pb-4 desktop:pt-16">
      <h1 id="sj-title" data-reveal="words" className="sj-title max-w-[20ch] font-serif [font-variation-settings:'opsz'_60]">
        <SplitWords copy={summerJourneys.title} accent={accent} />
      </h1>

      {/* The turn: a quiet line, then the answer in pine. */}
      {/* The turn, as one sentence at one size; the answer picked out in pine. */}
      <p data-reveal className="mt-7 max-w-[40rem] font-gothic text-copy text-ink-soft">
        <CopyText copy={s.before} />{" "}
        <span className="font-bold text-pine">
          <CopyText copy={s.turn} />
        </span>
      </p>

      {/* The three places along one line, like stops on a route. */}
      <ol data-reveal className="mt-12 grid gap-8 tablet:grid-cols-3 tablet:gap-3">
        {s.places.map((place, i) => (
          <li key={i} className="relative flex min-w-0 flex-col gap-2 tablet:gap-4">
            {/* The route runs on from each name to the next stop, so nothing needs a ground colour behind it (the hero has a photo). */}
            <span className="flex items-center gap-3">
              <span aria-hidden className="size-3 shrink-0 rounded-full bg-pine" />
              <span lang="ja" className="font-mincho text-[clamp(2rem,2.6vw,2.75rem)] leading-none text-pine">
                <CopyText copy={place.name} />
              </span>
              <span aria-hidden className="hidden h-px min-w-6 flex-1 self-end bg-pine/25 mb-[0.2em] tablet:block" />
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
      </div>
    </section>
  );
}
