import Link from "next/link";
import { home } from "@content/pages/home";
import { routeFor } from "@content/routes";
import { CopyText } from "./CopyText";

/** Home's three working promises, each linked to the page that carries the detail. */
export function HowWeWork() {
  const { heading, points } = home.howWeWork;
  return (
    <section aria-labelledby="how-title" className="mx-auto mt-32 grid max-w-(--content-max) grid-cols-12 gap-x-6 px-(--page-margin)">
      <h2 id="how-title" className="col-span-12 font-serif text-h1 [font-variation-settings:'opsz'_60] desktop:col-span-10 desktop:col-start-2">
        <CopyText copy={heading} />
      </h2>
      <ul className="col-span-12 mt-12 grid gap-x-10 gap-y-14 tablet:grid-cols-3 desktop:col-span-11 desktop:col-start-2">
        {points.map((point, i) => {
          const route = routeFor(point.link);
          return (
            <li key={i} className="flex flex-col border-t border-ink pt-5">
              <h3 className="font-serif text-h3 [font-variation-settings:'opsz'_24]">
                <CopyText copy={point.lead} />
              </h3>
              <p className="mt-3">
                <CopyText copy={point.body} />
              </p>
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
