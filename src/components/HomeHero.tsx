import type { CSSProperties } from "react";
import { about } from "@content/pages/about";
import { home } from "@content/pages/home";
import { site } from "@content/site";
import { CopyText } from "./CopyText";
import { FieldTable } from "./FieldTable";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

const label = (text: string) => {
  const row = about.credentials.rows.find((r) => r.label.body[0] === text);
  if (!row) throw new Error(`No credentials label "${text}"`);
  return <CopyText copy={row.label} />;
};

/**
 * Home's first viewport: the headline as the plate's title over a double rule,
 * the welcome in the main column, and the registration plate beside it.
 */
export function HomeHero() {
  const [lede, ...rest] = home.hero.paragraphs;
  return (
    <section aria-labelledby="home-title" className="mx-auto grid max-w-(--content-max) grid-cols-12 gap-x-6 px-(--page-margin)">
      <h1
        id="home-title"
        className="ink-in col-span-12 max-w-[18ch] pt-8 pb-4 font-serif text-display [font-variation-settings:'opsz'_60] desktop:col-span-11 desktop:col-start-2 desktop:max-w-none desktop:pt-8"
        style={step(0)}
      >
        <CopyText copy={home.hero.headline} />
      </h1>
      <div aria-hidden className="draw-rule col-span-12 h-px bg-ink desktop:col-span-11 desktop:col-start-2" style={step(1)} />

      <div className="col-span-12 mt-8 max-w-(--measure-main) space-y-5 desktop:col-span-5 desktop:col-start-2">
        <p className="ink-in font-serif text-lede [font-variation-settings:'opsz'_24]" style={step(3)}>
          <CopyText copy={lede} />
        </p>
        {rest.map((p, i) => (
          <p key={i} className="ink-in" style={step(4 + i)}>
            <CopyText copy={p} />
          </p>
        ))}
      </div>

      <FieldTable
        animate
        startIndex={5}
        className="col-span-12 mt-10 desktop:col-span-6 desktop:col-start-7 desktop:mt-8"
        title={<CopyText copy={home.heroMargin.label} />}
        fields={[
          { key: "registration", label: label("Registration"), value: <CopyText copy={site.registration.lineJa} /> },
          {
            key: "authority",
            label: label("Registering authority"),
            value: <CopyText copy={about.credentials.rows.find((r) => r.label.body[0] === "Registering authority")!.value!} />,
          },
          {
            key: "entity",
            label: label("Registered entity"),
            value: (
              <>
                <CopyText copy={site.entity.nameEn} /> (<CopyText copy={site.entity.nameJa} />)
              </>
            ),
          },
          { key: "mgr-tokyo", label: label("Travel services manager, Tokyo"), value: <CopyText copy={site.managers.tokyo} /> },
          { key: "mgr-osaka", label: label("Travel services manager, Osaka"), value: <CopyText copy={site.managers.osaka} /> },
          { key: "memberships", label: label("Memberships"), value: site.memberships.map((m, i) => <CopyText key={i} copy={m} />) },
        ]}
        foot={
          <a href="/about#CL-06">
            <CopyText copy={home.heroMargin.verify} />
          </a>
        }
      />
    </section>
  );
}
