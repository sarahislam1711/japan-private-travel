import Link from "next/link";
import { summerJourneys } from "@content/pages/summer-journeys";
import { routeFor } from "@content/routes";
import { CopyText } from "./CopyText";
import { SplitHero } from "./SplitHero";

/** Summer Journeys' first screen: the case for summer beside a pine field set with 七月 八月. */
export function SummerHero() {
  const pj = routeFor("privateJapan");
  return (
    <SplitHero id="sj-title" title={summerJourneys.title} verticals={summerJourneys.heroImage}>
      <div className="space-y-4 font-gothic text-copy text-ink-soft">
        {summerJourneys.lede.map((p, i) => (
          <p key={i}>
            <CopyText copy={p} />
          </p>
        ))}
      </div>
      <p className="mt-8 font-gothic text-label text-ink-soft">
        <CopyText copy={summerJourneys.otherSeasons} />{" "}
        <Link href={pj.path} className="text-ink">
          <CopyText copy={pj.navLabel!} />
        </Link>
      </p>
    </SplitHero>
  );
}
