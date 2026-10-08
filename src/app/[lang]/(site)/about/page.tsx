import type { CSSProperties } from "react";
import { about } from "@content/pages/about";
import { home } from "@content/pages/home";
import { CopyText } from "@/components/CopyText";
import { PageClose } from "@/components/PageClose";
import { SplitWords } from "@/components/SplitWords";
import { StructuredData } from "@/components/StructuredData";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("about");

const d = (n: number) => ({ "--d": n }) as CSSProperties;
const section = "mx-auto mt-20 max-w-(--content-max) px-(--page-margin) desktop:mt-28";
const h2 = "font-serif text-h2 font-[450] [font-variation-settings:'opsz'_36]";

/**
 * About (CONTENT.md §8, approved 8 Oct 2026): who runs HalaJapan and exactly
 * how it is registered, laid out so an advisor can verify it in a minute:
 * key facts, the people, the registration chain (You → HalaJapan · Travel
 * World → Air World), the offices, and the company facts table.
 */
export default function AboutPage() {
  const { people, registration, offices, facts } = about;
  return (
    <main id="main">
      <StructuredData page="about" />

      {/* Hero: title, intro and three key facts. */}
      <section aria-labelledby="about-title" className="mx-auto max-w-(--content-max) px-(--page-margin) pt-10 desktop:pt-16">
        <h1 id="about-title" data-reveal="words" className="font-serif text-h1 font-[450] [font-variation-settings:'opsz'_60]">
          <SplitWords copy={about.title} />
        </h1>
        <p data-reveal style={d(1)} className="mt-5 max-w-[40rem] font-gothic text-copy text-ink-soft">
          <CopyText copy={about.intro} />
        </p>
        <ul data-reveal style={d(2)} className="mt-10 grid gap-3 tablet:grid-cols-3">
          {about.keyFacts.map((f, i) => (
            <li key={i} className="rounded-[16px] bg-plate px-6 py-5 font-serif text-[1.375rem] leading-tight text-ink [font-variation-settings:'opsz'_24]">
              <CopyText copy={f} />
            </li>
          ))}
        </ul>
      </section>

      {/* The people. */}
      <section aria-labelledby="people-title" className={section}>
        <h2 id="people-title" data-reveal className={h2}>
          <CopyText copy={people.heading} />
        </h2>
        <div className="mt-8 grid gap-x-12 gap-y-10 desktop:grid-cols-12">
          <div data-reveal className="desktop:col-span-7">
            <p className="font-serif text-[1.625rem] leading-tight [font-variation-settings:'opsz'_36]">
              <CopyText copy={people.director.name} />
            </p>
            <p className="mt-2 font-gothic text-small text-ink-soft">
              <CopyText copy={people.director.role} /> · <CopyText copy={people.director.nameJa} />
            </p>
            <p className="mt-5 max-w-[38rem] font-gothic text-copy text-ink-soft">
              <CopyText copy={people.director.bio} />
            </p>
          </div>
          <div data-reveal style={d(1)} className="desktop:col-span-5">
            <p className="font-gothic text-small text-ink-soft">
              <CopyText copy={people.managersLabel} />
            </p>
            <p className="mt-2 font-serif text-[1.625rem] leading-tight [font-variation-settings:'opsz'_36]">
              <CopyText copy={people.managers} />
            </p>
            <p className="mt-5 font-gothic text-copy text-ink-soft">
              <CopyText copy={people.managersNote} />
            </p>
          </div>
        </div>
      </section>

      {/* How we are registered: the chain from you to the licensed operator. */}
      <section aria-labelledby="registration-title" className={section}>
        <h2 id="registration-title" data-reveal className={h2}>
          <CopyText copy={registration.heading} />
        </h2>
        <p data-reveal className="mt-4 max-w-[40rem] font-gothic text-copy text-ink-soft">
          <CopyText copy={registration.intro} />
        </p>
        <ol data-reveal style={d(1)} className="mt-10 grid items-stretch gap-3 desktop:grid-cols-[1fr_auto_1.3fr_auto_1.6fr]">
          {registration.steps.map((step, i) => {
            const last = i === registration.steps.length - 1;
            return (
              <li key={i} className="contents">
                <div className={`flex flex-col gap-3 rounded-[20px] p-7 ${last ? "on-pine" : "bg-plate"}`}>
                  <span className={`font-gothic text-small tabular-nums ${last ? "text-pine-soft" : "text-ink-soft"}`} dir="ltr">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-serif text-[1.375rem] leading-tight [font-variation-settings:'opsz'_24]">
                    <CopyText copy={step.title} />
                  </p>
                  <p className={`font-gothic text-small leading-relaxed ${last ? "text-pine-soft" : "text-ink-soft"}`}>
                    <CopyText copy={step.text} />
                  </p>
                </div>
                {last ? null : (
                  <span aria-hidden className="flex items-center justify-center py-1 text-pine desktop:px-1 desktop:py-0">
                    <svg viewBox="0 0 24 24" className="size-6 rotate-90 desktop:rotate-0 rtl:desktop:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12h15M14 6l6 6-6 6" />
                    </svg>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        <p data-reveal className="mt-5 font-gothic text-small text-ink-soft">
          <CopyText copy={registration.check} />
        </p>
      </section>

      {/* Offices. */}
      <section aria-labelledby="offices-title" className={section}>
        <h2 id="offices-title" data-reveal className={h2}>
          <CopyText copy={offices.heading} />
        </h2>
        <div data-reveal className="mt-8 grid gap-3 tablet:grid-cols-2">
          {offices.list.map((o, i) => (
            <div key={i} className="rounded-[20px] bg-plate p-7">
              <p className="font-serif text-[1.375rem] leading-tight [font-variation-settings:'opsz'_24]">
                <CopyText copy={o.name} />
              </p>
              <p className="mt-3 font-gothic text-copy text-ink-soft">
                <CopyText copy={o.address} />
              </p>
              <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-gothic text-label">
                <span>
                  <span className="text-ink-soft">
                    <CopyText copy={offices.telLabel} />
                  </span>{" "}
                  <a href={`tel:+81${o.tel.replace(/\D/g, "").replace(/^0/, "")}`} className="tap" dir="ltr">
                    {o.tel}
                  </a>
                </span>
                <span>
                  <span className="text-ink-soft">
                    <CopyText copy={offices.faxLabel} />
                  </span>{" "}
                  <span dir="ltr">{o.fax}</span>
                </span>
              </p>
            </div>
          ))}
        </div>
        <p data-reveal className="mt-5 font-gothic text-small text-ink-soft">
          <CopyText copy={offices.hours} />
        </p>
      </section>

      {/* Company facts, in the 会社概要 form advisors expect. */}
      <section aria-labelledby="facts-title" className={section}>
        <h2 id="facts-title" data-reveal className={h2}>
          <CopyText copy={facts.heading} />
        </h2>
        <dl data-reveal className="mt-8 grid rounded-[20px] bg-plate px-7 py-3 tablet:grid-cols-[minmax(12rem,auto)_1fr] tablet:gap-x-10">
          {facts.rows.map((row, i) => (
            <div key={i} className="contents">
              <dt className="pt-4 font-gothic text-small text-ink-soft tablet:py-4">
                <CopyText copy={row.label} />
              </dt>
              <dd className="pb-4 font-gothic text-label text-ink tablet:py-4">
                <CopyText copy={row.value} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <PageClose heading={home.contact.heading} />
    </main>
  );
}
