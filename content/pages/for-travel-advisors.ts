/* For Travel Advisors (/for-travel-advisors) — docs/CONTENT.md §9. Rebuilt 10 Oct 2026. All DRAFT, flagged D9 where it touches terms. */
import { attachArabic, draft, ph } from "../schema";
import { forTravelAdvisorsAr } from "./for-travel-advisors.ar";

export const forTravelAdvisors = {
  /** Decorative: 協力, "working together", set vertically in the hero. */
  mark: draft("協力", { lang: "ja" }),
  title: draft("For travel advisors"),
  intro: draft("Japan for your clients who travel as a family. You keep the relationship; we plan the trip with you, in Arabic, English or Japanese."),
  requestCta: draft("Request agent access"),
  signInCta: draft("Already approved? Sign in"),
  stepsHeading: draft("How it works"),
  whyHeading: draft("Why advisors work with us"),
  registered: draft("Registered and verifiable"),
  registeredLine: draft(["Travel World Co., Ltd., Tokyo Governor Registration No. ", ph("REG_NUMBER"), ", selling for Air World Co., Ltd. (Japan Tourism Agency No. 961, JATA member)."]),
  registeredLink: draft("How we are registered"),
  termsHeading: draft("Agent terms"),
  termsBody: draft("Registered advisors receive agent terms, with further terms for series departures, regular monthly bookings and early confirmation. We share the current tiers once we have verified your agency."),
  formHeading: draft("Request agent access"),
  formIntro: draft("We check every agency by hand and reply by email."),
  submit: draft("Send request"),
  sending: draft("Sending…"),
  confirmation: draft("Request received. We verify every agency by hand and reply by email."),
  error: draft("Your request could not be sent just now. Please try again."),
  networkLabel: draft("Consortium or network"),
  steps: [
    { lead: draft("You send the brief."), body: draft("Who is travelling, when, and what the trip needs to do."), symbol: draft("依", { lang: "ja" }) },
    { lead: draft("We plan it with you."), body: draft("A day-by-day plan, rooms checked one by one, and a quote you can present as your own."), symbol: draft("計", { lang: "ja" }) },
    { lead: draft("We look after them in Japan."), body: draft("Your clients are met, guided and supported on the ground, and you stay in the loop."), symbol: draft("迎", { lang: "ja" }) },
  ],
  why: [
    { lead: draft("Your client stays yours."), body: draft("We never market to them directly.") },
    { lead: draft("Families are our specialism."), body: draft("Grandparents to young children, private and paced.") },
    { lead: draft("We speak their language."), body: draft("Arabic, English and Japanese, with no interpreter in the middle.") },
  ],
  fields: {
    name: draft("Your name"),
    agency: draft("Agency"),
    country: draft("Country"),
    registration: draft("Agency registration or IATA number"),
    email: draft("Work email"),
  },
  networks: [draft("Virtuoso"), draft("Traveller Made"), draft("Signature"), draft("Ensemble"), draft("Independent"), draft("Other")],
};

attachArabic(forTravelAdvisors, forTravelAdvisorsAr);
