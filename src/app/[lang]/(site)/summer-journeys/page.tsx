import { summerJourneys } from "@content/pages/summer-journeys";
import { MonthsSection } from "@/components/MonthsSection";
import { PageClose } from "@/components/PageClose";
import { RegionSection } from "@/components/RegionSection";
import { SummerHero } from "@/components/SummerHero";
import { pageMetadata } from "@/lib/metadata";

export const generateMetadata = () => pageMetadata("summerJourneys");

/**
 * Summer Journeys (CONTENT.md §4): the case for summer (→ Private Japan for
 * other seasons), the months, three regions (→ Family Services), and the close
 * (→ WhatsApp, Contact).
 */
export default function SummerJourneysPage() {
  return (
    <main id="main">
      <SummerHero />
      <MonthsSection />
      {summerJourneys.regions.map((region, i) => (
        <RegionSection key={i} region={region} index={i} />
      ))}
      <PageClose heading={summerJourneys.closing} />
    </main>
  );
}
