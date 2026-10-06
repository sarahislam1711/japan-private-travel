import Link from "next/link";
import { forTravelAdvisors } from "@content/pages/for-travel-advisors";
import { routeFor } from "@content/routes";
import { CopyText } from "./CopyText";

/** Home's band for the primary audience: a tinted section, the advisor promise, one link. */
export function AdvisorBand() {
  const route = routeFor("forTravelAdvisors");
  return (
    <section aria-labelledby="advisors-title" className="mt-32 bg-mist">
      <div className="mx-auto grid max-w-(--content-max) grid-cols-12 gap-x-6 gap-y-6 px-(--page-margin) py-20">
        <h2 id="advisors-title" className="col-span-12 font-serif text-h2 [font-variation-settings:'opsz'_36] desktop:col-span-4 desktop:col-start-2">
          <CopyText copy={forTravelAdvisors.title} />
        </h2>
        <div className="col-span-12 max-w-(--measure-main) desktop:col-span-6 desktop:col-start-7">
          <p className="font-serif text-lede">
            <CopyText copy={forTravelAdvisors.paragraphs[0]} />
          </p>
          <p className="mt-6 font-gothic text-label">
            <Link href={route.path}>
              <CopyText copy={route.navLabel!} />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
