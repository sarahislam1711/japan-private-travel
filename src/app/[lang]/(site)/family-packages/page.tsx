import type { CSSProperties } from "react";
import Image from "next/image";
import { familyServices as c } from "@content/pages/family-services";
import { home } from "@content/pages/home";
import { photographs } from "@content/photography.manifest";
import { localePath } from "@content/routes";
import { CopyText } from "@/components/CopyText";
import { PageClose } from "@/components/PageClose";
import { SplitWords } from "@/components/SplitWords";
import { StructuredData } from "@/components/StructuredData";
import { copyText } from "@/lib/copy";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("familyServices");

const d = (n: number) => ({ "--d": n }) as CSSProperties;
// Where each photo's subject sits within the card's top band (the photos are portrait, the cards landscape).
const cardFocus: Record<string, string> = { "mt-fuji": "50% 40%", miyajima: "25% 88%", "nara-park": "50% 30%" };
const h2 = "font-serif text-h1 font-[450] [font-variation-settings:'opsz'_60]";

/**
 * Family Packages (CONTENT.md §6, rebuilt 10 Oct 2026): starting points each
 * family tailors, not fixed products. Four package cards (photo fading into
 * the card, the stops on a route line, days, fly in and out, "Start from
 * this" into the planner), then the extras as small tags: things that can be
 * added to any package, deliberately secondary.
 */
export default async function FamilyPackagesPage() {
  const locale = await getLocale();
  const contact = localePath("contact", locale);
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
                {photo ? (
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 834px) 50vw, 100vw"
                    className="pointer-events-none object-cover opacity-60 [mask-image:linear-gradient(to_bottom,black_0%,black_15%,transparent_45%)]"
                    style={{ objectPosition: cardFocus[p.photo] ?? photo.focus }}
                  />
                ) : null}
                <div className="relative flex flex-1 flex-col p-7 pt-28 tablet:p-9 tablet:pt-36">
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
                    <a
                      href={`${contact}?add=${encodeURIComponent(copyText(p.name, locale))}`}
                      className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-ink px-5 font-gothic text-label font-bold text-plate no-underline transition-colors hover:bg-pine hover:text-plate"
                    >
                      <CopyText copy={c.start} />
                    </a>
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
