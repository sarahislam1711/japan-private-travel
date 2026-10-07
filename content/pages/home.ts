/* Home (/) — docs/CONTENT.md §3. All copy written and approved by Sarah, 6 Oct 2026. */
import type { RouteKey } from "../routes";
import { attachArabic, draft, locked, ph, type Copy } from "../schema";
import { homeAr } from "./home.ar";

export const home = {
  hero: {
    headline: locked("Japan, planned for the whole household."),
    paragraph: locked(
      "We plan private trips to Japan for families who travel together, from grandparents to young children. Every trip starts with a conversation and is planned from scratch for your family, in Arabic, English or Japanese.",
    ),
  },
  margin: {
    statement: locked("We are a registered travel agency with offices in Tokyo and Osaka."),
    // The registration line itself renders from site.registration.lineJa.
    check: locked(["You can check our registration with ", ph("REG_AUTHORITY_EN"), "."], { claims: ["CL-06"] }),
  },
  entryPoints: {
    summerJourneys: {
      heading: locked("Summer Journeys"),
      text: locked(
        "In July and August, Tokyo is hot and crowded. Hokkaido and the Japan Alps stay cool, and Okinawa is by the sea. These are the places we plan for families in summer.",
      ),
    },
    privateJapan: {
      heading: locked("Private Japan"),
      text: locked(
        "We also plan private trips across Japan in every other season, with rooms that connect, days paced for every age, and transport that keeps everyone together.",
      ),
    },
  },
  howWeWork: {
    heading: locked("How we work"),
    points: [
      {
        lead: locked("We confirm before you commit."),
        body: locked(
          "We check every room one by one, not just the room type, and we tell you exactly what is confirmed before you agree to anything.",
        ),
        link: "privateJapan",
        symbol: draft("確", { lang: "ja" }),
      },
      {
        lead: locked("You know who is looking after you."),
        body: locked(
          "We tell you your guide's name before you travel, and the managers responsible for our agency are named at the bottom of every page.",
        ),
        link: "about",
        symbol: draft("名", { lang: "ja" }),
      },
      {
        lead: locked("Your family's needs are planned in from the start."),
        body: locked(
          "Dining, private bathing, prayer times, guiding and transport for Muslim families are part of the first plan we send you, not extras added at the end.",
        ),
        link: "familyServices",
        symbol: draft("家", { lang: "ja" }),
      },
    ] satisfies { lead: Copy; body: Copy; link: RouteKey; symbol: Copy }[],
  },
  contact: {
    heading: locked("Tell us who is travelling and when you would like to go."),
    reply: locked("We will reply in your language."),
    emailLabel: locked("Email"),
    email: locked([ph("EMAIL")]),
    phoneLabel: locked("Telephone"),
    phone: locked([ph("PHONE")]),
  },
};

attachArabic(home, homeAr);
