import { getLocale } from "@/lib/locale";
import Link from "next/link";
import type { CSSProperties } from "react";
import { home } from "@content/pages/home";
import { summerJourneys } from "@content/pages/summer-journeys";
import { routeFor, localePath } from "@content/routes";
import { site } from "@content/site";
import { CopyText } from "./CopyText";
import { PanelPhoto } from "./PanelPhoto";
import { SplitWords } from "./SplitWords";
import { WhatsAppLink } from "./WhatsAppLink";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

/**
 * Home's first screen: the welcome and actions on one side; on the other a
 * pine field carrying the summer place names, with the registration set into
 * its foot as a seal (main column says, margin proves).
 */
export async function HomeHero() {
  const locale = await getLocale();
  const contact = routeFor("contact");
  return (
    <section aria-labelledby="home-title" className="mx-auto flex max-w-(--content-max) flex-col px-(--page-margin) desktop:min-h-[calc(100svh-5.5rem)] desktop:pb-6">
      <div className="grid flex-1 grid-cols-12 gap-x-6 gap-y-10 pt-6 desktop:pt-2">
        <div className="col-span-12 flex flex-col justify-end desktop:col-span-6 desktop:pb-10">
          <h1 id="home-title" data-reveal="words" className="hero-display max-w-[12ch] font-serif [font-variation-settings:'opsz'_60]">
            <SplitWords copy={home.hero.headline} />
          </h1>
          <p data-reveal style={d(3)} className="mt-7 max-w-[34rem] font-gothic text-[1.1875rem] leading-[1.6] text-ink-soft">
            <CopyText copy={home.hero.paragraph} />
          </p>
          <div data-reveal style={d(4)} className="mt-9 flex flex-col gap-3 tablet:flex-row tablet:items-center">
            {/* Two equal ways to begin: the enquiry, or a chat (Sarah, 7 Oct 2026). */}
            <Link
              href={localePath(contact.key, locale)}
              className="inline-flex min-h-12 items-center justify-center rounded-(--radius-control) bg-ink px-6 font-gothic text-label font-bold text-plate no-underline transition-colors hover:bg-pine hover:text-plate"
            >
              <CopyText copy={home.hero.planButton} />
            </Link>
            <WhatsAppLink tone="outline" className="tablet:w-auto" />
          </div>
        </div>

        {/* The image and the seal: summer place names in vertical Japanese on a pine field, with the
            registration set into its foot like an official stamp (main says, margin proves). */}
        <div
          data-reveal
          style={d(1)}
          className="on-pine relative col-span-12 flex min-h-[34rem] flex-col overflow-hidden rounded-[20px] p-8 tablet:min-h-[30rem] desktop:col-span-6 desktop:p-12"
        >
          {/* Depth: the family summer photo, tinted into the pine behind the place names (Sarah, 7 Oct 2026). */}
          <PanelPhoto slot="home-hero" tone="pine" position="50% 100%" strength="soft" />
          <div aria-hidden className="relative min-h-0 flex-1">
            <span dir="ltr" className="absolute inset-0 flex flex-row-reverse gap-[0.22em] font-mincho leading-[1.04] text-pine-soft text-[clamp(2.5rem,5.2vw,6rem)]">
              {summerJourneys.regions.map((r, i) => (
                <span key={i} lang="ja" className="h-full [writing-mode:vertical-rl]">
                  <CopyText copy={r.verticalName} />
                </span>
              ))}
            </span>
          </div>
          <div className="relative mt-8 max-w-[26rem] self-start rounded-[16px] bg-pine/85 p-5 -m-5">
            <p className="font-mincho text-[1.125rem] leading-snug text-plate">
              <CopyText copy={site.registration.lineJa} />
            </p>
            <p className="mt-2 font-gothic text-label text-ink-soft">
              <CopyText copy={home.margin.statement} />
            </p>
            <p className="mt-3 font-gothic text-label">
              <a href={`${localePath("about", locale)}#CL-06`} className="tap">
                <CopyText copy={home.margin.check} />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
