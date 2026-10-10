import type { CSSProperties } from "react";
import Image from "next/image";
import { familyServices as c } from "@content/pages/family-services";
import { home } from "@content/pages/home";
import { photographs } from "@content/photography.manifest";
import { ui } from "@content/interface";
import { CopyText } from "@/components/CopyText";
import { PageClose } from "@/components/PageClose";
import { SplitWords } from "@/components/SplitWords";
import { StructuredData } from "@/components/StructuredData";
import { TripButton } from "@/components/TripButton";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("familyServices");

const d = (n: number) => ({ "--d": n }) as CSSProperties;
// Where each photo's subject sits within the card's photo band (the photos are portrait, the band landscape).
const cardFocus: Record<string, string> = { "mt-fuji": "50% 40%", miyajima: "20% 60%", "nara-park": "50% 95%" };
const h2 = "font-serif text-h1 font-[450] [font-variation-settings:'opsz'_60]";

/**
 * Family Packages (CONTENT.md §6, rebuilt 10 Oct 2026): starting points each
 * family tailors, not fixed products. Four package cards (photo fading into
 * the card, the stops on a route line, days, fly in and out, "Add to my
 * trip"), then the extras as small tags: things that can be
 * added to any package, deliberately secondary.
 */
export default function FamilyPackagesPage() {
  return (
    <main id="main">
      <StructuredData page="familyServices" />

      <section aria-labelledby="fp-title" className="mx-auto max-w-(--content-max) px-(--page-margin) pt-12 desktop:pt-20">
        <h1 id="fp-title" data-reveal="words" className="max-w-[20ch] font-serif text-h1 font-[450] [font-variation-settings:'opsz'_60] desktop:text-[clamp(3rem,3.2vw+1.4rem,4.5rem)] desktop:leading-[1.02]">
          <SplitWords copy={c.title} />
        </h1>
        <p data-reveal style={d(1)} className="mt-5 max-w-[38rem] font-gothic text-copy text-ink-soft">
          <CopyText copy={c.intro} />
        </p>
      </section>

      {/* The packages: the main part of the page. */}
      <section aria-labelledby="fp-packages" className="section-gap mx-auto max-w-(--content-max) px-(--page-margin)">
        <h2 id="fp-packages" data-reveal className={h2}>
          <CopyText copy={c.packagesHeading} />
        </h2>
        <ul className="mt-10 grid gap-4 tablet:grid-cols-2 tablet:gap-5">
          {c.packages.map((p, i) => {
            const photo = photographs.find((x) => x.id === p.photo);
            return (
              <li key={p.id} data-reveal style={d(i % 2)} className="relative flex flex-col overflow-hidden rounded-[24px] bg-plate">
                {/* The photo is its own band across the top, fading out before the text, so the text always sits on plain Snow. */}
                {photo ? (
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[10rem] [mask-image:linear-gradient(to_bottom,black_55%,transparent)] tablet:h-[13rem]">
                    <Image src={photo.src} alt="" fill sizes="(min-width: 834px) 50vw, 100vw" className="object-cover opacity-85" style={{ objectPosition: cardFocus[p.photo] ?? photo.focus }} />
                  </div>
                ) : null}
                <div className="relative flex flex-1 flex-col p-7 pt-[10.5rem] tablet:p-9 tablet:pt-[13rem]">
                  <p className="flex items-baseline gap-2 font-gothic text-small text-ink-soft">
                    <span className="font-serif text-[1.75rem] leading-none text-pine" dir="ltr">
                      {p.days}
                    </span>
                    <CopyText copy={c.days} />
                  </p>
                  <h3 className="mt-3 font-serif text-h2 font-[450] [font-variation-settings:'opsz'_36]">
                    <CopyText copy={p.name} />
                  </h3>
                  <p className="mt-3 max-w-[30rem] font-gothic text-copy text-ink-soft">
                    <CopyText copy={p.line} />
                  </p>
                  {/* The stops, on a route line. */}
                  <ol className="relative mt-6 flex flex-wrap items-center gap-x-1 gap-y-2 font-gothic text-small text-ink">
                    {p.stops.map((s, j) => (
                      <li key={j} className="flex items-center gap-1">
                        <span aria-hidden className="size-2 rounded-full bg-pine" />
                        <span className="pe-1">
                          <CopyText copy={s} />
                        </span>
                        {j < p.stops.length - 1 ? <span aria-hidden className="h-px w-5 bg-pine/40" /> : null}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                    <p className="font-gothic text-small text-ink-soft">
                      <CopyText copy={c.inOut} />: <span className="text-ink">{<CopyText copy={p.inOut} />}</span>
                    </p>
                    <TripButton id={`pkg:${p.id}`} kind="package" add={<CopyText copy={ui.trip.add} />} added={<CopyText copy={ui.trip.added} />} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <p data-reveal className="mt-6 font-gothic text-small text-ink-soft">
          <CopyText copy={c.tailored} />
        </p>
      </section>

      {/* Extras: secondary, as small tags. */}
      <section aria-labelledby="fp-extras" className="section-gap mx-auto max-w-(--content-max) px-(--page-margin)">
        <div className="grid gap-x-12 gap-y-6 desktop:grid-cols-12 desktop:items-start">
          <div className="desktop:col-span-4">
            <h2 id="fp-extras" data-reveal className="font-serif text-h2 font-[450] [font-variation-settings:'opsz'_36]">
              <CopyText copy={c.extrasHeading} />
            </h2>
            <p data-reveal className="mt-3 font-gothic text-copy text-ink-soft">
              <CopyText copy={c.extrasNote} />
            </p>
          </div>
          <ul data-reveal style={d(1)} className="flex flex-wrap gap-2 desktop:col-span-8">
            {c.extras.map((e, i) => (
              <li key={i} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-plate ps-3 pe-4 font-gothic text-small text-ink">
                <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 text-pine" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8.5l3.2 3L13 4.5" />
                </svg>
                <CopyText copy={e} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageClose heading={home.contact.heading} />
    </main>
  );
}
