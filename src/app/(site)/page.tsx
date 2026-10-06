import { ContactBand } from "@/components/ContactBand";
import { EntryPoints } from "@/components/EntryPoints";
import { HomeHero } from "@/components/HomeHero";
import { HowWeWork } from "@/components/HowWeWork";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("home");

/**
 * Home (CONTENT.md §3): hero with the registration plate (→ About), two ways
 * in (→ Summer Journeys, Private Japan), how we work (→ Private Japan, About,
 * Family Services), and the contact close on pine (→ WhatsApp, email, phone).
 */
export default function HomePage() {
  return (
    <main id="main">
      <HomeHero />
      <EntryPoints />
      <HowWeWork />
      <ContactBand />
    </main>
  );
}
