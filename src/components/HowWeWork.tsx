import Link from "next/link";
import { home } from "@content/pages/home";
import { localePath, routeFor } from "@content/routes";
import { getLocale } from "@/lib/locale";
import { CopyText } from "./CopyText";
import { Showcase } from "./Showcase";
import { SplitWords } from "./SplitWords";

/** Home's three working promises as a pinned, scroll-driven showcase; each links to the page with the detail. */
export async function HowWeWork() {
  const locale = await getLocale();
  const { heading, points } = home.howWeWork;
  return (
    <Showcase
      id="how-title"
      heading={<SplitWords copy={heading} />}
      items={points.map((point) => ({
        lead: <SplitWords copy={point.lead} />,
        body: <CopyText copy={point.body} />,
        link: (
          <Link href={localePath(point.link, locale)} className="tap">
            <CopyText copy={routeFor(point.link).navLabel!} />
          </Link>
        ),
      }))}
    />
  );
}
