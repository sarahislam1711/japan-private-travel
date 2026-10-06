import Link from "next/link";
import { home } from "@content/pages/home";
import { routeFor } from "@content/routes";
import { CopyText } from "./CopyText";

/** Home's two routes in. The whole block is the link; no card, no border. */
export function EntryPoints() {
  const items = [
    { route: routeFor("summerJourneys"), ...home.entryPoints.summerJourneys },
    { route: routeFor("privateJapan"), ...home.entryPoints.privateJapan },
  ];
  return (
    <section className="mx-auto mt-16 grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-10 px-(--page-margin) desktop:mt-12">
      {items.map(({ route, heading, sentence }, i) => (
        <Link
          key={route.key}
          href={route.path}
          className={`group col-span-12 border-t border-hairline pt-5 no-underline tablet:col-span-6 ${i === 0 ? "desktop:col-span-5 desktop:col-start-2" : "desktop:col-span-6 desktop:col-start-7"}`}
        >
          <h2 className="font-serif text-h2 [font-variation-settings:'opsz'_36] group-hover:text-navy group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[0.18em]">
            <CopyText copy={heading} />
          </h2>
          <p className="mt-2 max-w-(--measure-main)">
            <CopyText copy={sentence} />
          </p>
        </Link>
      ))}
    </section>
  );
}
