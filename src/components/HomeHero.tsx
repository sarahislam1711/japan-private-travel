import Link from "next/link";
import type { CSSProperties } from "react";
import { about } from "@content/pages/about";
import { home } from "@content/pages/home";
import { summerJourneys } from "@content/pages/summer-journeys";
import { routeFor } from "@content/routes";
import { site } from "@content/site";
import { CopyText } from "./CopyText";
import { SplitWords } from "./SplitWords";
import { WhatsAppLink } from "./WhatsAppLink";

const d = (n: number) => ({ "--d": n }) as CSSProperties;
const registrationLabel = about.credentials.rows.find((r) => r.label.body[0] === "Registration")!.label;

/**
 * Home's first screen: the welcome and actions on one side, a pine field
 * carrying the summer place names on the other, and the registration proof
 * as a strip beneath (main column says, margin proves).
 */
export function HomeHero() {
  const contact = routeFor("contact");
  return (
    <section aria-labelledby="home-title" className="mx-auto flex max-w-(--content-max) flex-col px-(--page-margin) desktop:min-h-[calc(100svh-5.5rem)]">
      <div className="grid flex-1 grid-cols-12 gap-x-6 gap-y-10 pt-6 desktop:pt-2">
        <div className="col-span-12 flex flex-col justify-end desktop:col-span-6 desktop:pb-10">
          <h1 id="home-title" data-reveal="words" className="max-w-[12ch] font-serif text-display [font-variation-settings:'opsz'_60]">
            <SplitWords copy={home.hero.headline} />
          </h1>
          <p data-reveal style={d(3)} className="mt-7 max-w-[34rem] font-gothic text-[1.1875rem] leading-[1.6] text-ink-soft">
            <CopyText copy={home.hero.paragraph} />
          </p>
          <div data-reveal style={d(4)} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <WhatsAppLink />
            <Link href={contact.path} className="font-gothic text-label">
              <CopyText copy={contact.navLabel!} />
            </Link>
          </div>
        </div>

        {/* The image: the summer place names in vertical Japanese on a pine field (decorative). */}
        <div
          aria-hidden
          data-reveal
          style={d(1)}
          className="on-pine relative col-span-12 h-80 overflow-hidden rounded-[20px] tablet:h-[26rem] desktop:col-span-6 desktop:h-auto desktop:min-h-[30rem]"
        >
          {/* Pinned inside the panel, so the names wrap to the panel's height instead of setting it. */}
          <span className="absolute inset-8 flex flex-row-reverse gap-[0.22em] font-mincho leading-[1.04] text-pine-soft text-[clamp(3rem,5.6vw,6.5rem)] desktop:inset-12">
            {summerJourneys.regions.map((r, i) => (
              <span key={i} lang="ja" className="h-full [writing-mode:vertical-rl]">
                <CopyText copy={r.verticalName} />
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Proof strip: the registration margin, at a glance. */}
      <div data-reveal style={d(5)} className="mt-6 grid gap-x-10 gap-y-5 rounded-[20px] bg-plate px-7 py-6 tablet:grid-cols-3 desktop:px-10">
        <p className="font-serif text-field leading-[1.45]">
          <CopyText copy={home.margin.statement} />
        </p>
        <p className="font-gothic text-label text-ink-soft">
          <span className="block">
            <CopyText copy={registrationLabel} />
          </span>
          <span className="mt-1 block text-ink">
            <CopyText copy={site.registration.lineJa} />
          </span>
        </p>
        <p className="font-gothic text-label tablet:self-center">
          <a href="/about#CL-06">
            <CopyText copy={home.margin.check} />
          </a>
        </p>
      </div>
    </section>
  );
}
