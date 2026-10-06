import { AdvisorBand } from "@/components/AdvisorBand";
import { ContactBand } from "@/components/ContactBand";
import { EntryPoints } from "@/components/EntryPoints";
import { HomeHero } from "@/components/HomeHero";
import { HouseholdPoints } from "@/components/HouseholdPoints";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("home");

/**
 * Home maps the site: hero (→ About), two ways in plus Experiences,
 * advisors on navy (→ For travel advisors), three points (→ Contact, Family
 * Services, About), and the contact close on navy (→ WhatsApp, Contact).
 */
export default function HomePage() {
  return (
    <main id="main">
      <HomeHero />
      <EntryPoints />
      <AdvisorBand />
      <HouseholdPoints />
      <ContactBand />
    </main>
  );
}
