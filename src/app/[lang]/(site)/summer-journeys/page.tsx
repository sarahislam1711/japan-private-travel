import { summerJourneys } from "@content/pages/summer-journeys";
import { MonthsSection } from "@/components/MonthsSection";
import { PageClose } from "@/components/PageClose";
import { RegionsTrio } from "@/components/RegionsTrio";
import { SummerHero } from "@/components/SummerHero";
import { pageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/StructuredData";

export const generateMetadata = () => pageMetadata("summerJourneys");

/**
 * Summer Journeys (CONTENT.md §4): the case for summer (→ Private Japan for
 * other seasons), the months, three regions, and the close
 * (→ WhatsApp, Contact).
 */
export default function SummerJourneysPage() {
  return (
    <main id="main">
      <StructuredData page="summerJourneys" />
      <SummerHero />
      <RegionsTrio />
      <MonthsSection />
      <PageClose heading={summerJourneys.closing} />
    </main>
  );
}
