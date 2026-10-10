import { ContactBand } from "@/components/ContactBand";
import { EntryPoints } from "@/components/EntryPoints";
import { Faq } from "@/components/Faq";
import { HomeHero } from "@/components/HomeHero";
import { HowWeWork } from "@/components/HowWeWork";
import { pageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/StructuredData";

export const generateMetadata = () => pageMetadata("home");

/**
 * Home (CONTENT.md §3): hero with the registration plate (→ About), two ways
 * in (→ Summer Journeys, Private Japan), how we work (→ Private Japan, About,
 * Family Packages), the FAQ (→ For travel advisors), and the contact close on pine (→ WhatsApp, email, phone).
 */
export default function HomePage() {
  return (
    <main id="main" className="home-scale">
      <StructuredData page="home" />
      <HomeHero />
      <EntryPoints />
      <HowWeWork />
      <Faq />
      <ContactBand />
    </main>
  );
}
