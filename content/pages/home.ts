/* Home (/) — docs/CONTENT.md §3. */
import type { RouteKey } from "../routes";
import { draft, locked, ph, type Copy } from "../schema";

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
  household: {
    heading: locked("What we do for a household"),
    points: [
      {
        lead: locked("In your language."),
        body: locked("We speak with you in Arabic, English or Japanese, without an interpreter in the middle."),
        link: "contact",
      },
      {
        lead: locked("Muslim needs, planned in."),
        body: locked(
          "Halal certification explained honestly, private bathing confirmed room by room, and prayer built into the day.",
        ),
        proof: draft("Japan has no national halal standard.", { claims: ["CL-07"] }),
        link: "familyServices",
      },
      {
        lead: locked("Everything checkable."),
        body: locked(
          "Our registration and both travel services managers are named at the foot of every page, and each claim we make links to its source.",
        ),
        link: "about",
      },
    ] satisfies { lead: Copy; body: Copy; proof?: Copy; link: RouteKey }[],
  },
  contactBand: {
    sentence: draft("Tell us who is travelling and when."),
    formLink: locked("Or use the enquiry form."),
    emailLabel: draft("Email"),
    email: locked([ph("EMAIL")]),
    phoneLabel: draft("Telephone"),
    phone: locked([ph("PHONE")]),
  },
};
