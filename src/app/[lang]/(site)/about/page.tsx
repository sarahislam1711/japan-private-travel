import type { CSSProperties } from "react";
import { about } from "@content/pages/about";
import { home } from "@content/pages/home";
import { site } from "@content/site";
import { CopyText } from "@/components/CopyText";
import { PageClose } from "@/components/PageClose";
import { Portrait } from "@/components/Portrait";
import { StoryThread } from "@/components/StoryThread";
import type { Copy } from "@content/schema";
import { copyText } from "@/lib/copy";
import { SplitWords } from "@/components/SplitWords";
import { StructuredData } from "@/components/StructuredData";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("about");

const d = (n: number) => ({ "--d": n }) as CSSProperties;
const section = "relative mt-24 desktop:mt-32 desktop:ps-24";
const h2 = "font-serif text-h1 font-[450] [font-variation-settings:'opsz'_60]";
const label = "font-gothic text-small text-ink-soft";

/** A chapter's mark: its kanji in a ring on the thread (desktop), or above its heading (phones). */
function Mark({ copy }: { copy: Copy }) {
  return (
    <span
      aria-hidden
      lang="ja"
      className="mb-4 inline-flex size-11 items-center justify-center rounded-full bg-ground font-mincho text-[1.25rem] text-pine ring-1 ring-pine/30 desktop:absolute desktop:start-0 desktop:top-[0.4em] desktop:mb-0"
    >
      <CopyText copy={copy} />
    </span>
  );
}

/**
 * About (CONTENT.md §8), redesigned 9 Oct 2026: who runs HalaJapan and exactly
 * how it is registered, so an advisor can verify it in a minute. Space and
 * type carry it, not boxes: a registration seal on pine beside the title, the
 * key facts as large statements, the founder set editorially, the registration
 * as a three-point line (You → HalaJapan · Travel World → Air World), the
 * offices under their names in Japanese, and one quiet facts table.
 */
export default function AboutPage() {
  const { people, registration, offices, facts } = about;
  return (
    <main id="main">
      <StructuredData page="about" />

      {/* Hero: title and intro beside the registration seal. */}
      <section aria-labelledby="about-title" className="mx-auto grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-10 px-(--page-margin) pt-10 desktop:pt-14">
        <div className="col-span-12 flex flex-col justify-center desktop:col-span-7">
          <h1 id="about-title" data-reveal="words" className="font-serif text-h1 font-[450] [font-variation-settings:'opsz'_60] desktop:text-[clamp(3rem,3.2vw+1.4rem,4.75rem)] desktop:leading-[1.02]">
            <SplitWords copy={about.title} />
          </h1>
          <p data-reveal style={d(1)} className="mt-6 max-w-[36rem] font-gothic text-copy text-ink-soft">
            <CopyText copy={about.intro} />
          </p>
        </div>
        <div data-reveal style={d(1)} className="on-pine relative col-span-12 flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-[24px] p-8 tablet:p-10 desktop:col-span-5 desktop:min-h-[30rem]">
          <span lang="ja" aria-hidden className="font-mincho text-[clamp(6rem,10vw,9.5rem)] leading-none text-pine-soft/80 [writing-mode:vertical-rl] self-end">
            <CopyText copy={registration.seal} />
          </span>
          {/* The key facts on the seal, then the registration as it is written in Japanese. */}
          <div className="relative">
            <ul className="flex flex-col gap-2">
              {about.keyFacts.map((f, i) => (
                <li key={i} className="font-serif text-[clamp(1.375rem,0.8vw+1.1rem,1.75rem)] leading-tight text-plate [font-variation-settings:'opsz'_24]">
                  <CopyText copy={f} />
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mincho text-small leading-snug text-pine-soft">
              <CopyText copy={site.registration.lineJa} />
            </p>
          </div>
        </div>
      </section>

      {/* The rest of the page is one story on one thread: people → registration → offices → facts. */}
      <div className="mx-auto max-w-(--content-max) px-(--page-margin)">
        <StoryThread>
      {/* The people. */}
      <section aria-labelledby="people-title" className={section}>
        <Mark copy={about.chapters.people} />
        <h2 id="people-title" data-reveal className={h2}>
          <CopyText copy={people.heading} />
        </h2>
        {/* The founder: a large portrait beside his story. */}
        <article data-reveal className="mt-12 grid items-center gap-x-14 gap-y-8 tablet:grid-cols-12">
          <Portrait
            slot="about-founder"
            name={copyText(people.director.name)}
            sizes="(min-width: 834px) 40vw, 100vw"
            className="aspect-[4/5] w-full max-w-[17rem] rounded-[24px] tablet:col-span-5 tablet:max-w-none"
          />
          <div className="tablet:col-span-7">
            <p className={label}>
              <CopyText copy={people.director.role} />
            </p>
            <h3 className="mt-2 font-serif text-[clamp(2rem,1.8vw+1.3rem,3rem)] leading-[1.05] font-[450] [font-variation-settings:'opsz'_48]">
              <CopyText copy={people.director.name} />
            </h3>
            <p className="mt-2 font-mincho text-small text-pine">
              <CopyText copy={people.director.nameJa} />
            </p>
            <p className="mt-7 max-w-[34rem] font-serif text-[clamp(1.1875rem,0.5vw+1.05rem,1.4375rem)] leading-[1.6] text-ink [font-variation-settings:'opsz'_20]">
              <CopyText copy={people.director.bio} />
            </p>
          </div>
        </article>
        {/* The licensed managers, each on a portrait card. */}
        <div data-reveal className="mt-14">
          <p className={label}>
            <CopyText copy={people.managersLabel} />
          </p>
          <ul className="mt-5 grid gap-4 tablet:grid-cols-2">
            {people.managerNames.map((n, i) => (
              <li key={i} className="flex items-center gap-5 rounded-[20px] bg-plate p-4 pe-6">
                <Portrait slot={i === 0 ? "about-manager-1" : "about-manager-2"} name={copyText(n)} sizes="96px" className="size-24 shrink-0 rounded-[16px]" />
                <div>
                  <p className="font-serif text-[1.375rem] leading-tight [font-variation-settings:'opsz'_24]">
                    <CopyText copy={n} />
                  </p>
                  <p className="mt-1 font-gothic text-small text-ink-soft">
                    <CopyText copy={people.managerRole} />
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-5 font-gothic text-small text-ink-soft">
            <CopyText copy={people.managersNote} />
          </p>
        </div>
      </section>

      {/* How we are registered: three points on one line, from you to the licensed operator. */}
      <section aria-labelledby="registration-title" className={section}>
        <Mark copy={about.chapters.registration} />
        <div className="grid gap-x-12 gap-y-4 desktop:grid-cols-12 desktop:items-end">
          <h2 id="registration-title" data-reveal className={`${h2} desktop:col-span-6`}>
            <CopyText copy={registration.heading} />
          </h2>
          <p data-reveal className="max-w-[34rem] font-gothic text-copy text-ink-soft desktop:col-span-6 desktop:pb-2">
            <CopyText copy={registration.intro} />
          </p>
        </div>
        <ol data-reveal style={d(1)} className="relative mt-14 grid gap-10 desktop:grid-cols-3 desktop:gap-8">
          {/* The line that joins the three points (vertical on phones, horizontal on desktop). */}
          <span aria-hidden className="absolute start-[0.9375rem] top-2 bottom-2 w-px bg-ink/15 desktop:start-2 desktop:end-2 desktop:top-[0.9375rem] desktop:bottom-auto desktop:h-px desktop:w-auto" />
          {registration.steps.map((step, i) => {
            const last = i === registration.steps.length - 1;
            return (
              <li key={i} className="relative flex gap-5 desktop:flex-col desktop:gap-6">
                <span
                  aria-hidden
                  className={`relative z-10 flex size-[1.875rem] shrink-0 items-center justify-center rounded-full font-gothic text-[0.8125rem] tabular-nums ring-4 ring-ground ${last ? "bg-pine text-plate" : "bg-plate text-ink"}`}
                  dir="ltr"
                >
                  {i + 1}
                </span>
                <div className={last ? "on-pine -m-2 rounded-[20px] p-6 desktop:-mx-4" : ""}>
                  <h3 className="font-serif text-[1.375rem] leading-tight [font-variation-settings:'opsz'_24]">
                    <CopyText copy={step.title} />
                  </h3>
                  <p className={`mt-3 font-gothic text-small leading-relaxed ${last ? "text-pine-soft" : "text-ink-soft"}`}>
                    <CopyText copy={step.text} />
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
        <p data-reveal className="mt-10 font-gothic text-small text-ink-soft">
          <CopyText copy={registration.check} />
        </p>
      </section>

      {/* Offices, each under its city's name in Japanese. */}
      <section aria-labelledby="offices-title" className={section}>
        <Mark copy={about.chapters.offices} />
        <h2 id="offices-title" data-reveal className={h2}>
          <CopyText copy={offices.heading} />
        </h2>
        <div className="mt-12 grid gap-12 tablet:grid-cols-2 desktop:gap-16">
          {offices.list.map((o, i) => (
            <address key={i} data-reveal style={d(i)} className="flex gap-6 not-italic">
              <span lang="ja" aria-hidden className="font-mincho text-[clamp(2.75rem,3.4vw,3.75rem)] leading-[1.02] text-pine [writing-mode:vertical-rl]">
                <CopyText copy={o.city} />
              </span>
              <div className="flex flex-col">
                <p className="font-serif text-[1.5rem] leading-tight [font-variation-settings:'opsz'_24]">
                  <CopyText copy={o.name} />
                </p>
                <p className="mt-3 max-w-[22rem] font-gothic text-copy text-ink-soft">
                  <CopyText copy={o.address} />
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 font-gothic text-label">
                  <a
                    href={`tel:+81${o.tel.replace(/\D/g, "").replace(/^0/, "")}`}
                    className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-plate ps-2 pe-5 no-underline transition-colors hover:bg-pine hover:text-plate"
                  >
                    <span aria-hidden className="inline-flex size-8 items-center justify-center rounded-full bg-ground text-pine">
                      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6.6 3.5h2.6l1.3 4-2 1.3a11 11 0 0 0 6.7 6.7l1.3-2 4 1.3v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" />
                      </svg>
                    </span>
                    <span className="sr-only">
                      <CopyText copy={offices.telLabel} />{" "}
                    </span>
                    <span dir="ltr">{o.tel}</span>
                  </a>
                  <span className="text-small text-ink-soft">
                    <CopyText copy={offices.faxLabel} /> <span dir="ltr">{o.fax}</span>
                  </span>
                </div>
              </div>
            </address>
          ))}
        </div>
        <p data-reveal className="mt-10 font-gothic text-small text-ink-soft">
          <CopyText copy={offices.hours} />
        </p>
      </section>

      {/* Company facts, in the 会社概要 form advisors expect: the one panel on the page. */}
      <section aria-labelledby="facts-title" className={section}>
        <Mark copy={about.chapters.facts} />
        <h2 id="facts-title" data-reveal className={h2}>
          <CopyText copy={facts.heading} />
        </h2>
        <dl data-reveal className="mt-10 grid rounded-[24px] bg-plate px-7 py-4 tablet:grid-cols-[minmax(13rem,auto)_1fr] tablet:gap-x-12 tablet:px-10 tablet:py-6">
          {facts.rows.map((row, i) => (
            <div key={i} className="contents">
              <dt className={`pt-4 ${label} tablet:py-4`}>
                <CopyText copy={row.label} />
              </dt>
              <dd className="pb-4 font-gothic text-label text-ink tablet:py-4">
                <CopyText copy={row.value} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

        </StoryThread>
      </div>

      <PageClose heading={home.contact.heading} />
    </main>
  );
}
