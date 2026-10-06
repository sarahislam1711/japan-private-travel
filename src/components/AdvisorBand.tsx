import Link from "next/link";
import { forTravelAdvisors } from "@content/pages/for-travel-advisors";
import { routeFor } from "@content/routes";
import { CopyText } from "./CopyText";

/** Home's band for the primary audience: a full navy field, the advisor promise, one link. */
export function AdvisorBand() {
  const route = routeFor("forTravelAdvisors");
  return (
    <section aria-labelledby="advisors-title" className="on-navy mt-28">
      <div className="mx-auto grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-8 px-(--page-margin) py-24">
        <h2
          id="advisors-title"
          className="col-span-12 font-serif text-h1 [font-variation-settings:'opsz'_60] desktop:col-span-4 desktop:col-start-2"
        >
          <CopyText copy={forTravelAdvisors.title} />
        </h2>
        <div className="col-span-12 max-w-(--measure-main) desktop:col-span-6 desktop:col-start-7 desktop:pt-2">
          <p className="font-serif text-lede">
            <CopyText copy={forTravelAdvisors.paragraphs[0]} />
          </p>
          <p className="mt-8 font-gothic text-label">
            <Link href={route.path} className="inline-flex min-h-12 items-center rounded-(--radius-control) px-5 no-underline ring-1 ring-plate transition-colors hover:bg-plate hover:text-navy">
              <CopyText copy={route.navLabel!} />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
