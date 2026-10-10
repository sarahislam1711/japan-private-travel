import type { CSSProperties } from "react";
import Link from "next/link";
import { forTravelAdvisors as c } from "@content/pages/for-travel-advisors";
import { home } from "@content/pages/home";
import { localePath } from "@content/routes";
import type { Copy } from "@content/schema";
import { AdvisorForm, type T } from "@/components/AdvisorForm";
import { CopyText } from "@/components/CopyText";
import { PageClose } from "@/components/PageClose";
import { SplitWords } from "@/components/SplitWords";
import { StructuredData } from "@/components/StructuredData";
import { copyText } from "@/lib/copy";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("forTravelAdvisors");

const d = (n: number) => ({ "--d": n }) as CSSProperties;
const h2 = "font-serif text-h1 font-[450] [font-variation-settings:'opsz'_60]";

/**
 * For travel advisors (CONTENT.md §9, rebuilt 10 Oct 2026): an open hero with
 * 協力 set vertically; how it works as three stops on one line; why advisors
 * work with us; the registration in one line (→ About); then agent terms
 * beside the access form, the page's one panel.
 */
export default async function ForTravelAdvisorsPage() {
  const locale = await getLocale();
  const pick = (x: Copy): T => ({ node: <CopyText copy={x} />, text: copyText(x, locale) });
  return (
    <main id="main">
      <StructuredData page="forTravelAdvisors" />

      {/* Hero: title, intro and the one action, with 協力 beside them. */}
      <section aria-labelledby="adv-title" className="mx-auto grid max-w-(--content-max) items-center gap-x-12 gap-y-8 px-(--page-margin) pt-12 tablet:grid-cols-[1fr_auto] desktop:pt-20">
        <div>
          <h1 id="adv-title" data-reveal="words" className="font-serif text-h1 font-[450] [font-variation-settings:'opsz'_60] desktop:text-[clamp(3rem,3.2vw+1.4rem,4.5rem)] desktop:leading-[1.02]">
            <SplitWords copy={c.title} />
          </h1>
          <p data-reveal style={d(1)} className="mt-5 max-w-[36rem] font-gothic text-copy text-ink-soft">
            <CopyText copy={c.intro} />
          </p>
          <a
            data-reveal
            style={d(2)}
            href="#request"
            className="mt-8 inline-flex min-h-12 items-center rounded-(--radius-control) bg-ink px-6 font-gothic text-label font-bold text-plate no-underline transition-colors hover:bg-pine hover:text-plate"
          >
            <CopyText copy={c.requestCta} />
          </a>
        </div>
        <span data-reveal style={d(1)} aria-hidden lang="ja" className="hidden font-mincho text-[clamp(5rem,8vw,8rem)] leading-[1.02] text-pine [writing-mode:vertical-rl] tablet:block">
          <CopyText copy={c.mark} />
        </span>
      </section>

      {/* How it works: three stops on one line. */}
      <section aria-labelledby="adv-steps" className="section-gap mx-auto max-w-(--content-max) px-(--page-margin)">
        <h2 id="adv-steps" data-reveal className={h2}>
          <CopyText copy={c.stepsHeading} />
        </h2>
        <ol data-reveal className="relative mt-12 grid gap-10 tablet:grid-cols-3 tablet:gap-8">
          <span aria-hidden className="absolute start-0 end-0 top-[1.375rem] hidden h-px bg-pine/25 tablet:block" />
          {c.steps.map((s, i) => (
            <li key={i} className="relative flex flex-col gap-4">
              <span className="relative flex items-center gap-3">
                <span aria-hidden className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-pine font-gothic text-small text-plate ring-4 ring-ground tabular-nums" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span lang="ja" aria-hidden className="relative z-10 bg-ground pe-3 font-mincho text-[1.75rem] leading-none text-pine">
                  <CopyText copy={c.steps[i].symbol} />
                </span>
              </span>
              <h3 className="font-serif text-[clamp(1.375rem,0.8vw+1.1rem,1.75rem)] leading-tight font-[450] [font-variation-settings:'opsz'_24]">
                <CopyText copy={s.lead} />
              </h3>
              <p className="max-w-[24rem] font-gothic text-copy text-ink-soft">
                <CopyText copy={s.body} />
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Why advisors work with us: three points, then the registration in one line. */}
      <section aria-labelledby="adv-why" className="section-gap mx-auto max-w-(--content-max) px-(--page-margin)">
        <h2 id="adv-why" data-reveal className={h2}>
          <CopyText copy={c.whyHeading} />
        </h2>
        <ul data-reveal className="mt-12 grid gap-10 tablet:grid-cols-3 tablet:gap-8">
          {c.why.map((w, i) => (
            <li key={i} className="flex flex-col gap-3">
              <span aria-hidden className="h-[3px] w-10 rounded-full bg-pine" />
              <p className="font-serif text-[clamp(1.375rem,0.8vw+1.1rem,1.75rem)] leading-tight font-[450] [font-variation-settings:'opsz'_24]">
                <CopyText copy={w.lead} />
              </p>
              <p className="max-w-[24rem] font-gothic text-copy text-ink-soft">
                <CopyText copy={w.body} />
              </p>
            </li>
          ))}
        </ul>
        <p data-reveal className="mt-14 flex flex-col gap-2 border-t border-ink/10 pt-6 font-gothic text-small text-ink-soft tablet:flex-row tablet:items-baseline tablet:gap-4">
          <span className="shrink-0 text-ink">
            <CopyText copy={c.registered} />
          </span>
          <span>
            <CopyText copy={c.registeredLine} />{" "}
            <Link href={localePath("about", locale)} className="tap text-ink">
              <CopyText copy={c.registeredLink} />
            </Link>
          </span>
        </p>
      </section>

      {/* Agent terms beside the access form: the page's one panel. */}
      <section id="request" aria-labelledby="adv-form" className="section-gap mx-auto grid max-w-(--content-max) scroll-mt-8 gap-10 px-(--page-margin) desktop:grid-cols-12 desktop:gap-14">
        <div data-reveal className="desktop:col-span-5">
          <h2 className={h2}>
            <CopyText copy={c.termsHeading} />
          </h2>
          <p className="mt-6 max-w-[30rem] font-serif text-[clamp(1.1875rem,0.5vw+1.05rem,1.375rem)] leading-[1.6] text-ink [font-variation-settings:'opsz'_20]">
            <CopyText copy={c.termsBody} />
          </p>
        </div>
        <div data-reveal style={d(1)} className="rounded-[24px] bg-plate p-7 tablet:p-10 desktop:col-span-7">
          <h2 id="adv-form" className="font-serif text-h2 font-[450] [font-variation-settings:'opsz'_36]">
            <CopyText copy={c.formHeading} />
          </h2>
          <p className="mt-2 mb-7 font-gothic text-copy text-ink-soft">
            <CopyText copy={c.formIntro} />
          </p>
          <AdvisorForm
            locale={locale}
            t={Object.fromEntries((["submit", "sending", "confirmation", "error", "networkLabel"] as const).map((k) => [k, pick(c[k])]))}
            fields={Object.fromEntries(Object.entries(c.fields).map(([k, v]) => [k, pick(v)]))}
            networks={c.networks.map(pick)}
          />
        </div>
      </section>

      <PageClose heading={home.contact.heading} />
    </main>
  );
}
