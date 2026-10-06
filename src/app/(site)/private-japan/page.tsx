import { familyServices } from "@content/pages/family-services";
import { home } from "@content/pages/home";
import { privateJapan } from "@content/pages/private-japan";
import { CopyText } from "@/components/CopyText";
import { MarginNote } from "@/components/MarginNote";
import { OnwardPanels } from "@/components/OnwardPanels";
import { PageClose } from "@/components/PageClose";
import { PrinciplesSection } from "@/components/PrinciplesSection";
import { SplitHero } from "@/components/SplitHero";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("privateJapan");

/**
 * Private Japan (CONTENT.md §5): the year-round offer, four principles for
 * the household (→ proof on transport), onward to Summer Journeys and Family
 * Services, and the close (→ WhatsApp, Contact).
 */
export default function PrivateJapanPage() {
  return (
    <main id="main">
      <SplitHero id="pj-title" title={privateJapan.title} verticals={privateJapan.heroImage} slot="private-japan-hero">
        <p className="font-gothic text-copy text-ink-soft">
          <CopyText copy={privateJapan.lede} />
        </p>
      </SplitHero>
      <PrinciplesSection
        id="pj-principles"
        heading={privateJapan.sectionsHeading}
        items={privateJapan.sections.map((s) => ({
          lead: s.lead,
          body: s.body,
          proof: "margin" in s && s.margin ? <MarginNote>{<CopyText copy={s.margin} />}</MarginNote> : undefined,
        }))}
      />
      <OnwardPanels
        items={[
          { route: "summerJourneys", heading: home.entryPoints.summerJourneys.heading, text: home.entryPoints.summerJourneys.text, tone: "pine" },
          { route: "familyServices", heading: familyServices.title, text: familyServices.intro, tone: "snow" },
        ]}
      />
      <PageClose heading={home.contact.heading} />
    </main>
  );
}
