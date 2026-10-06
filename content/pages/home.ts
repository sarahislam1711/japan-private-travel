/* Home (/) — docs/CONTENT.md §3. */
import { draft, locked, ph } from "../schema";

export const home = {
  hero: {
    headline: locked("Japan, planned for the whole household.", { flags: ["D2"] }),
    paragraphs: [
      locked(
        "Families travel together — three generations, staff, children of different ages, one itinerary. We plan for that unit.",
        { flags: ["D2"] },
      ),
      locked(
        "We work directly from Tokyo and Osaka, in English, Arabic and Japanese, and we specialise in the months most operators avoid: Hokkaido and Okinawa in summer, when Japan is cool, quiet and at its best for a family.",
        { flags: ["D2"] },
      ),
      locked("Enquiry only. No packages, no resellers.", { flags: ["D2"] }),
    ],
  },
  heroMargin: {
    label: draft("Registered travel agency"),
    // The registration line itself renders from site.registration.lineJa.
    verify: draft("Verify our registration with the Japan Tourism Agency.", { claims: ["CL-06"] }),
  },
  entryPoints: {
    summerJourneys: {
      heading: locked("Summer Journeys"),
      sentence: draft("Hokkaido, Okinawa and the Japan Alps in July and August."),
    },
    privateJapan: {
      heading: locked("Private Japan"),
      sentence: draft("Year-round journeys for families and small groups who travel together."),
    },
  },
  contactBand: {
    sentence: draft("Tell us who is travelling and when."),
    emailLabel: draft("Email"),
    email: locked([ph("EMAIL")]),
    phoneLabel: draft("Telephone"),
    phone: locked([ph("PHONE")]),
  },
};
