/* Home (/) — docs/CONTENT.md §3. All copy written and approved by Sarah, 6 Oct 2026. */
import type { RouteKey } from "../routes";
import { attachArabic, draft, locked, ph, type Copy } from "../schema";
import { homeAr } from "./home.ar";

export const home = {
  hero: {
    headline: locked("Japan, planned for the whole family."),
    // Shorter rewrite approved by Sarah, 7 Oct 2026.
    planButton: locked("Plan your trip"),
    paragraph: locked("Private trips for every generation, from grandparents to young children. Each one planned from scratch with you, in Arabic, English or Japanese."),
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
    // Value-led rewrite at Sarah's request (8 Oct 2026), DRAFT until approved.
    heading: draft("Start with a conversation. We plan the rest."),
    reply: locked("We will reply in your language."),
    emailLabel: locked("Email"),
    email: locked([ph("EMAIL")]),
    phoneLabel: locked("Telephone"),
    phone: locked([ph("PHONE")]),
  },
  // FAQ (Sarah, 7 Oct 2026): questions and answers written by Sarah; the heading is a draft.
  faq: {
    heading: draft("Frequently asked questions"),
    items: [
      {
        question: locked(["Is ", ph("BRAND"), " a registered travel agency in Japan?"]),
        answer: locked(
          [
            "Yes. We are registered as ",
            ph("REG_AUTHORITY_EN"),
            " Registered Travel Agency No. ",
            ph("REG_NUMBER"),
            ", with offices in Tokyo and Osaka. You can verify our registration with ",
            ph("REG_AUTHORITY_EN"),
            ".",
          ],
          { claims: ["CL-06"] },
        ),
      },
      {
        question: locked(["What kind of trips does ", ph("BRAND"), " plan?"]),
        answer: locked(
          "Private trips for families and small groups who travel together. Each one is planned from scratch after an enquiry. We do not sell fixed packages.",
        ),
      },
      {
        question: locked("What are the best months to travel to Japan?"),
        answer: locked(
          "July and August, in Hokkaido, the Japan Alps and Okinawa, when these regions are cool or coastal and the cities are not. We also plan private trips year-round.",
        ),
      },
      {
        question: locked(["Does ", ph("BRAND"), " arrange halal dining and prayer?"]),
        answer: locked(
          "Yes. We tell you which certification a restaurant holds and whether your authority recognises it, and we arrange prayer time and space within the day. We say plainly what is certified and what is prepared to your requirements.",
        ),
      },
      {
        question: locked("We are a travel advisor. Can we work with you?"),
        answer: locked("Yes. You keep the client relationship; we plan and run the trip in Japan."),
        link: { text: locked("Learn more about how we can partner"), route: "forTravelAdvisors" as RouteKey },
      },
    ] satisfies { question: Copy; answer: Copy; link?: { text: Copy; route: RouteKey } }[],
  },
};

attachArabic(home, homeAr);
