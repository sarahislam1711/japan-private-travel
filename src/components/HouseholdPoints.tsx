import Link from "next/link";
import { home } from "@content/pages/home";
import { about } from "@content/pages/about";
import { routeFor } from "@content/routes";
import { site } from "@content/site";
import { CopyText } from "./CopyText";
import { MarginNote } from "./MarginNote";

const languagesRow = about.credentials.rows.find((r) => r.label.body[0] === "Languages")!;

/**
 * Home's positioning in three points. Each says one thing, shows its proof
 * beneath, and links to the page that carries the detail.
 */
export function HouseholdPoints() {
  const { heading, points } = home.household;
  const proofs = [
    <MarginNote key="lang">
      <CopyText copy={languagesRow.label} />: <CopyText copy={languagesRow.value!} />
    </MarginNote>,
    <MarginNote key="halal" claims={points[1].proof?.claims}>
      <CopyText copy={points[1].proof!} />
    </MarginNote>,
    <MarginNote key="reg">
      <CopyText copy={site.registration.lineJa} />
    </MarginNote>,
  ];

  return (
    <section aria-labelledby="household-title" className="mx-auto mt-32 grid max-w-(--content-max) grid-cols-12 gap-x-6 px-(--page-margin)">
      <h2 id="household-title" className="col-span-12 font-serif text-h2 [font-variation-settings:'opsz'_36] desktop:col-span-10 desktop:col-start-2">
        <CopyText copy={heading} />
      </h2>
      <ul className="col-span-12 mt-10 grid gap-x-10 gap-y-14 tablet:grid-cols-3 desktop:col-span-11 desktop:col-start-2">
        {points.map((point, i) => {
          const route = routeFor(point.link);
          return (
            <li key={i} className="flex flex-col">
              <h3 className="font-serif text-h3 [font-variation-settings:'opsz'_24]">
                <CopyText copy={point.lead} />
              </h3>
              <p className="mt-2">
                <CopyText copy={point.body} />
              </p>
              <div className="mt-5">{proofs[i]}</div>
              <p className="mt-auto pt-6 font-gothic text-label">
                <Link href={route.path}>
                  <CopyText copy={route.navLabel!} />
                </Link>
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
