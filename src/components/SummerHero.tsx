import { getLocale } from "@/lib/locale";
import Link from "next/link";
import { summerJourneys } from "@content/pages/summer-journeys";
import { routeFor, localePath } from "@content/routes";
import { CopyText } from "./CopyText";
import { SplitHero } from "./SplitHero";

/**
 * Summer Journeys' first screen, the case for summer told as a short story
 * (Sarah, 8 Oct 2026). The claim at inline-start: the title, the crowded
 * cities and the turn ("The north is not."). The evidence on the pine panel:
 * the three places with their Japanese names, then the payoff.
 */
export async function SummerHero() {
  const locale = await getLocale();
  const pj = routeFor("privateJapan");
  const s = summerJourneys.story;
  // July and August stand out in the title: pine, with 七月 and 八月 set above them.
  const accent: Record<string, string> = locale === "ar" ? { "يوليو": "七月", "أغسطس": "八月" } : { July: "七月", August: "八月" };
  // One system on both sides: serif for statements, gothic for supporting lines;
  // on paper ink and pine, on the pine panel white and pine soft.
  // The pine panel holds only the three places and sizes to them (Sarah, 8 Oct 2026).
  const panel = (
    <ul className="flex h-full flex-col justify-center gap-7 p-8 tablet:p-10 desktop:p-12">
      {s.places.map((place, i) => (
        <li key={i}>
          <span lang="ja" className="block font-mincho text-[1.0625rem] leading-none tracking-[0.12em] text-pine-soft">
            <CopyText copy={place.name} />
          </span>
          <span className="mt-2.5 block font-serif text-[clamp(1.625rem,1vw+1.1rem,2.125rem)] leading-[1.15] text-plate [font-variation-settings:'opsz'_36]">
            <CopyText copy={place.line} />
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <SplitHero id="sj-title" title={summerJourneys.title} verticals={summerJourneys.heroImage} titleClass="sj-title" align="top" panel={panel} titleAccent={accent}>
      <div>
        <p className="font-gothic text-copy text-ink-soft">
          <CopyText copy={s.before} />
        </p>
        <p className="mt-2 font-serif text-[clamp(1.625rem,1vw+1.1rem,2.125rem)] leading-[1.15] font-[480] text-pine [font-variation-settings:'opsz'_36]">
          <CopyText copy={s.turn} />
        </p>
      </div>
      {/* The payoff on a soft pine highlight, so it reads as the promise. */}
      <p className="mt-8 inline-block rounded-[14px] bg-pine/10 px-5 py-3 font-serif text-[clamp(1.375rem,0.8vw+1rem,1.75rem)] leading-[1.2] font-[480] text-ink [font-variation-settings:'opsz'_36]">
        <CopyText copy={s.payoff} />
      </p>
      <p className="mt-8 font-gothic text-label text-ink-soft">
        <CopyText copy={summerJourneys.otherSeasons} />{" "}
        <Link href={localePath(pj.key, locale)} className="tap text-ink">
          <CopyText copy={pj.navLabel!} />
        </Link>
      </p>
    </SplitHero>
  );
}
