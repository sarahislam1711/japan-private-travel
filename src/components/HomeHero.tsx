import type { CSSProperties } from "react";
import { about } from "@content/pages/about";
import { home } from "@content/pages/home";
import { site } from "@content/site";
import { CopyText } from "./CopyText";
import { FieldTable } from "./FieldTable";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

const registrationLabel = about.credentials.rows.find((r) => r.label.body[0] === "Registration")!.label;

/**
 * Home's first viewport: the headline, the welcome in the main column, and
 * the registration panel beside it (main column says, margin proves).
 */
export function HomeHero() {
  return (
    <section aria-labelledby="home-title" className="mx-auto grid max-w-(--content-max) grid-cols-12 gap-x-6 px-(--page-margin)">
      <h1
        id="home-title"
        className="ink-in col-span-12 max-w-[18ch] pt-8 pb-4 font-serif text-display [font-variation-settings:'opsz'_60] desktop:col-span-11 desktop:col-start-2 desktop:max-w-none"
        style={step(0)}
      >
        <CopyText copy={home.hero.headline} />
      </h1>
      <p
        className="ink-in col-span-12 mt-6 max-w-(--measure-main) font-serif text-lede [font-variation-settings:'opsz'_24] desktop:col-span-5 desktop:col-start-2"
        style={step(3)}
      >
        <CopyText copy={home.hero.paragraph} />
      </p>

      <FieldTable
        animate
        startIndex={4}
        className="col-span-12 mt-10 self-start desktop:col-span-6 desktop:col-start-7 desktop:mt-6"
        title={<CopyText copy={home.margin.statement} />}
        fields={[{ key: "registration", label: <CopyText copy={registrationLabel} />, value: <CopyText copy={site.registration.lineJa} /> }]}
        foot={
          <a href="/about#CL-06">
            <CopyText copy={home.margin.check} />
          </a>
        }
      />
    </section>
  );
}
