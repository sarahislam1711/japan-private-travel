/*
 * Dev-only styleguide: the Registration Plate world, rendered with real copy.
 * Never built for production and never listed in content/routes.ts.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { contact } from "@content/pages/contact";
import { familyServices } from "@content/pages/family-services";
import { home } from "@content/pages/home";
import { summerJourneys } from "@content/pages/summer-journeys";
import { CopyText } from "@/components/CopyText";
import { EntryPoints } from "@/components/EntryPoints";
import { HomeHero } from "@/components/HomeHero";
import { MarginNote } from "@/components/MarginNote";
import { SeasonBand } from "@/components/SeasonBand";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = { title: "Styleguide", robots: { index: false, follow: false } };

const palette = [
  ["ground", "#EEF1F2", "bg-ground"],
  ["mist", "#E2E7EA", "bg-mist"],
  ["plate", "#FBFCFC", "bg-plate"],
  ["ink", "#14181D", "bg-ink"],
  ["ink-soft", "#4A5159", "bg-ink-soft"],
  ["hairline", "#C3C9CE", "bg-hairline"],
  ["navy", "#1F3A5F", "bg-navy"],
] as const;

function Spec({ name, children }: { name: string; children: ReactNode }) {
  return (
    <section className="mx-auto mt-24 grid max-w-(--content-max) grid-cols-12 gap-x-6 px-(--page-margin)">
      <h2 className="col-span-12 mb-6 border-b border-dashed border-stone pb-2 font-gothic text-small text-stone desktop:col-span-11 desktop:col-start-2">
        Styleguide · {name}
      </h2>
      <div className="col-span-12 desktop:col-span-11 desktop:col-start-2">{children}</div>
    </section>
  );
}

export default function StyleguidePage() {
  if (process.env.NODE_ENV === "production") notFound();
  const guiding = familyServices.sections[3];

  return (
    <>
      <SiteHeader />
      <main id="main" className="pb-24">
        <HomeHero />
        <EntryPoints />

        <Spec name="palette">
          <ul className="grid grid-cols-2 gap-6 tablet:grid-cols-3 desktop:grid-cols-7">
            {palette.map(([name, hex, cls]) => (
              <li key={name} className="font-gothic text-small">
                <span className={`block aspect-[3/2] border border-hairline ${cls}`} />
                <span className="mt-2 block text-ink">{name}</span>
                <span className="block text-ink-soft [font-variant-numeric:lining-nums]">{hex}</span>
              </li>
            ))}
          </ul>
        </Spec>

        <Spec name="type">
          <div className="space-y-8">
            <p className="font-serif text-h1 [font-variation-settings:'opsz'_60]">
              <CopyText copy={summerJourneys.title} />
            </p>
            <p className="font-serif text-h2 [font-variation-settings:'opsz'_36]">
              <CopyText copy={familyServices.title} />
            </p>
            <p className="max-w-(--measure-main) font-serif text-lede">
              <CopyText copy={familyServices.intro} />
            </p>
            <p className="max-w-(--measure-main)">
              <CopyText copy={summerJourneys.lede[0]} />
            </p>
            <p className="font-gothic text-label text-ink-soft">
              <CopyText copy={contact.form.fields.household} />
            </p>
            <p className="flex gap-8 font-mincho text-h2">
              {summerJourneys.regions.map((r, i) => (
                <CopyText key={i} copy={r.verticalName} />
              ))}
            </p>
          </div>
        </Spec>

        <Spec name="links, focus, button">
          <div className="flex flex-wrap items-center gap-8">
            <a href="/about#CL-06">
              <CopyText copy={home.heroMargin.verify} />
            </a>
            <button
              type="button"
              className="min-h-12 rounded-(--radius-control) bg-ink px-6 font-gothic text-label font-bold text-plate transition-colors hover:bg-navy"
            >
              <CopyText copy={contact.form.submit} />
            </button>
            <label className="grid gap-1.5 font-gothic text-label text-ink-soft">
              <CopyText copy={contact.form.fields.name} />
              <input className="min-h-12 w-72 rounded-(--radius-control) border border-ink-soft bg-plate px-3 font-serif text-body text-ink" />
            </label>
          </div>
        </Spec>

        <Spec name="claim and its proof">
          <div className="grid gap-x-6 gap-y-4 desktop:grid-cols-11">
            <p className="max-w-(--measure-main) desktop:col-span-6">
              <span className="font-semibold">
                <CopyText copy={guiding.lead} />
              </span>{" "}
              <CopyText copy={guiding.body} />
            </p>
            <div className="desktop:col-span-3 desktop:col-start-8">
              <MarginNote claims={guiding.margin!.claims}>
                <CopyText copy={guiding.margin!} />
              </MarginNote>
            </div>
          </div>
        </Spec>

        <Spec name="season band">
          <SeasonBand />
        </Spec>
      </main>
      <SiteFooter />
    </>
  );
}
