import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { photographs } from "@content/photography.manifest";
import { photoSlots, type PhotoSlotId } from "@content/photography.slots";
import { localePath, routeFor, type RouteKey } from "@content/routes";
import { home } from "@content/pages/home";
import { privateJapan as c } from "@content/pages/private-japan";
import { CopyText } from "@/components/CopyText";
import { MarginNote } from "@/components/MarginNote";
import { PageClose } from "@/components/PageClose";
import { SplitWords } from "@/components/SplitWords";
import { StructuredData } from "@/components/StructuredData";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("privateJapan");

const d = (n: number) => ({ "--d": n }) as CSSProperties;
const onward: { key: RouteKey; slot: PhotoSlotId }[] = [
  { key: "summerJourneys", slot: "pj-onward-summer" },
  { key: "familyServices", slot: "pj-onward-packages" },
];

/**
 * Private Japan (CONTENT.md §5, rebuilt 10 Oct 2026 in the open style of
 * Summer Journeys and For travel advisors): the title with the three seasons
 * in pine and 春秋冬 set in one vertical column beside it; the four principles for the
 * household as stops on one line, each with its kanji (→ proof on transport);
 * onward to Summer Journeys and Family Packages as
 * two photo tiles; and the close.
 */
export default async function PrivateJapanPage() {
  const locale = await getLocale();
  const hero = photographs.find((p) => p.id === photoSlots["private-japan-hero"].photoId);
  // The seasons stand out in the title in pine, on the line with the rest, as July and August do on Summer Journeys.
  const accent: Record<string, string> =
    locale === "ar" ? { "الربيع": "", "الخريف": "", "الشتاء": "" } : { spring: "", autumn: "", winter: "" };
  return (
    <main id="main">
      <StructuredData page="privateJapan" />

      {/* Hero: title and lede, with the seasons set vertically beside them. */}
      <section aria-labelledby="pj-title" className="relative isolate">
        {/* A spring garden, faded behind the open side of the title (Sarah, 10 Oct 2026). Decorative. */}
        {hero ? (
          <div aria-hidden className="hero-photo pointer-events-none absolute inset-y-0 end-0 -z-10 w-full opacity-30 tablet:opacity-45 desktop:w-[65%]">
            <Image src={hero.src} alt="" fill priority sizes="(min-width: 1280px) 65vw, 100vw" className="object-cover" style={{ objectPosition: hero.focus }} />
          </div>
        ) : null}
        <div className="mx-auto grid max-w-(--content-max) items-center gap-x-12 gap-y-8 px-(--page-margin) pt-12 pb-16 tablet:grid-cols-[1fr_auto] desktop:pt-16 desktop:pb-20">
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
        </div>
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

      {/* Onward: two photo tiles carrying only the page name (Sarah, 10 Oct 2026: the text panels were too much). */}
      <div className="section-gap mx-auto grid max-w-(--content-max) gap-4 px-(--page-margin) tablet:grid-cols-2 tablet:gap-5">
        {onward.map(({ key, slot }, i) => {
          const photoId = photoSlots[slot].photoId;
          const photo = photographs.find((p) => p.id === photoId);
          return (
            <Link
              key={key}
              href={localePath(key, locale)}
              data-reveal
              style={d(i)}
              className="group relative isolate flex aspect-[16/10] items-end overflow-hidden rounded-[24px] bg-pine p-7 no-underline tablet:aspect-[4/3] tablet:p-9 desktop:aspect-[16/10]"
            >
              {photo ? (
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 834px) 50vw, 100vw"
                  className="-z-10 object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.04]"
                  style={{ objectPosition: photo.focus }}
                />
              ) : null}
              <span aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-ink/70 via-ink/15 to-transparent" />
              <span className="flex w-full items-center justify-between gap-4 text-plate">
                <span className="font-serif text-h2 font-[450] [font-variation-settings:'opsz'_36]">
                  <CopyText copy={routeFor(key).navLabel!} />
                </span>
                <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-full bg-plate text-ink transition-colors duration-300 group-hover:bg-pine group-hover:text-plate">
                  <svg viewBox="0 0 16 16" className="size-4 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </span>
            </Link>
          );
        })}
      </div>
      <PageClose heading={home.contact.heading} />
    </main>
  );
}
