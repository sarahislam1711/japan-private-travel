/* For Travel Advisors (/for-travel-advisors) — docs/CONTENT.md §9. All copy DRAFT, flagged D9. */
import { draft } from "../schema";

const d9 = { flags: ["D9" as const] };

export const forTravelAdvisors = {
  title: draft("For travel advisors", d9),
  paragraphs: [
    draft(
      "We work with advisors whose clients travel to Japan as a household. You hold the client relationship; we plan and operate the trip in Japan, and we speak with your clients in Arabic, English or Japanese when you ask us to.",
      d9,
    ),
    draft(
      "Everything a due-diligence check needs is public: our registration, our named travel services managers, our memberships and our insurance are on the About page. Only net rates sit behind a sign-in, issued to advisors we have verified.",
      d9,
    ),
  ],
  sections: {
    netRates: {
      lead: draft("Net rates.", d9),
      body: draft("Quoted in yen, net of our margin, so your commission is yours to set.", d9),
    },
    response: {
      lead: draft("Response.", d9),
      body: draft("The same desk that answers clients answers advisors, on the same response commitment.", d9),
    },
    requestAccess: {
      lead: draft("Request access.", d9),
      fields: {
        name: draft("your name", d9),
        agency: draft("agency", d9),
        country: draft("country", d9),
        consortium: draft("consortium or network", d9),
        registration: draft("agency registration or IATA number", d9),
        email: draft("work email", d9),
      },
      consortiumOptions: [
        draft("Virtuoso", d9),
        draft("Traveller Made", d9),
        draft("Signature", d9),
        draft("Ensemble", d9),
        draft("independent", d9),
        draft("other", d9),
      ],
      submit: draft("Request access", d9),
      confirmation: draft("Request received. We verify every agency by hand and reply by email.", d9),
    },
    signIn: {
      lead: draft("Already approved?", d9),
      link: draft("Sign in to net rates", d9),
    },
  },
};
