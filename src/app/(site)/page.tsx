import { AdvisorBand } from "@/components/AdvisorBand";
import { ContactBand } from "@/components/ContactBand";
import { EntryPoints } from "@/components/EntryPoints";
import { HomeHero } from "@/components/HomeHero";
import { HouseholdPoints } from "@/components/HouseholdPoints";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("home");

/**
 * Home maps the site: hero (→ About), two ways in plus Experiences,
 * three points (→ Contact, Family Services, About), advisors (→ For travel
 * advisors), and the contact close (→ WhatsApp, Contact).
 */
export default function HomePage() {
  return (
    <main id="main">
      <HomeHero />
      <EntryPoints />
      <HouseholdPoints />
      <AdvisorBand />
      <ContactBand />
    </main>
  );
}
