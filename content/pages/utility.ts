/* Utility pages — docs/CONTENT.md §11. */
import type { RouteKey } from "../routes";
import { attachArabic, draft, ph } from "../schema";
import { notFoundAr, privacyAr, termsAr } from "./utility.ar";

// Privacy notice and terms of business: DRAFT for legal review before launch (D11).
export const privacy = {
  title: draft("Privacy notice"),
  contents: draft("On this page"),
  intro: draft(["This notice explains how ", ph("BRAND"), " handles the personal information you share with us when you plan a trip. It is written for Japan's Act on the Protection of Personal Information, and for the EU and UK GDPR where they apply to you."]),
  sections: [
    {
      id: "who",
      heading: draft("Who we are"),
      body: [
        draft([ph("BRAND"), " is a trading name of ", ph("ENTITY_NAME_EN"), ", a registered travel agency in Japan: ", ph("REG_AUTHORITY_EN"), " Registered Travel Agency No. ", ph("REG_NUMBER"), ". Our offices are at ", ph("ENTITY_ADDRESS"), " (Tokyo) and ", ph("OSAKA_ADDRESS"), " (Osaka)."]),
        draft(["For anything in this notice, write to ", ph("EMAIL"), "."]),
      ],
    },
    {
      id: "collect",
      heading: draft("What we collect"),
      body: [
        draft("Only what you choose to tell us: your name; how to reach you (WhatsApp, telephone or email); who is travelling and their ages; the dates and places you are considering; what the trip needs to do; and the language you would like us to reply in."),
        draft("If you tell us about dietary, religious, medical or mobility needs, we use that information only to plan your trip, and only with your consent."),
      ],
    },
    {
      id: "use",
      heading: draft("How we use it"),
      body: [
        draft("To reply to you, plan and quote your trip, make the bookings you ask for, and look after you while you travel. We do not sell your information, and we do not use it for advertising."),
      ],
    },
    {
      id: "planner",
      heading: draft("The trip planner"),
      body: [
        draft("Your answers in the trip planner stay in your browser, on your device, until you send them. Sending opens WhatsApp with your plan written out; once you send it, WhatsApp's own privacy terms also apply."),
      ],
    },
    {
      id: "share",
      heading: draft("Who we share it with"),
      body: [
        draft("Only the people who make your trip happen: the hotels, ryokan, restaurants, drivers, guides and other suppliers you have agreed to, and the services that run this website and our messages (hosting, email and spam protection). Each receives only what it needs."),
        draft("Where a supplier or service holds information outside Japan, we use it only with the safeguards the law requires."),
      ],
    },
    {
      id: "cookies",
      heading: draft("Cookies and visit counts"),
      body: [
        draft("This website sets no advertising or tracking cookies. We count visits with Plausible, which uses no cookies and collects no personal information."),
      ],
    },
    {
      id: "keep",
      heading: draft("How long we keep it"),
      body: [
        draft(["We keep enquiry details for ", ph("RETENTION_PERIOD"), " after our last contact with you, and booking records for as long as the law requires. Then we delete them."]),
      ],
    },
    {
      id: "rights",
      heading: draft("Your rights"),
      body: [
        draft(["You can ask to see the information we hold about you, to correct it, to stop us using it, or to delete it. Write to ", ph("EMAIL"), " and we will reply within the time the law allows."]),
        draft("If you live in the EU or the UK, you can also complain to your local data protection authority."),
      ],
    },
    {
      id: "changes",
      heading: draft("Changes to this notice"),
      body: [
        draft("If we change this notice, we will publish the new version on this page."),
      ],
    },
  ],
};

export const terms = {
  title: draft("Terms of business"),
  contents: draft("On this page"),
  intro: draft("How we work with you, from your first enquiry to your journey home."),
  sections: [
    {
      id: "enquiries",
      heading: draft("Enquiries and plans"),
      body: [
        draft("An enquiry, and the plans we send in reply, do not commit you to anything. A plan becomes a booking only when you accept our written quotation."),
      ],
    },
    {
      id: "conditions",
      heading: draft("Your booking and conditions of travel"),
      body: [
        draft("Before you book, we give you our written conditions of travel, as Japan's Travel Agency Act requires. They set out the price, what it includes, how and when to pay, and the charges if you change or cancel. They form part of your contract with us, alongside these terms."),
      ],
    },
    {
      id: "prices",
      heading: draft("Prices and payment"),
      body: [
        draft("Each quotation states its price, what is included and the payment schedule. Prices are confirmed only when we confirm your booking in writing."),
      ],
    },
    {
      id: "changes",
      heading: draft("Changes and cancellations"),
      body: [
        draft("If you need to change or cancel your trip, please tell us in writing. Any charges are those set out in your conditions of travel."),
        draft("If we or a supplier must change your trip, we will tell you as soon as we can and offer you alternatives."),
      ],
    },
    {
      id: "advisors",
      heading: draft("Booking through a travel advisor"),
      body: [
        draft("When you book through a travel advisor, the advisor keeps the relationship with you; we plan and run the trip in Japan under these terms."),
      ],
    },
    {
      id: "yours",
      heading: draft("What we ask of you"),
      body: [
        draft("Please make sure that everyone travelling has a valid passport, any visa they need, and meets any health requirements, and that the names, ages and needs you give us are accurate."),
        draft("We strongly recommend travel insurance that covers cancellation, medical care and repatriation for everyone travelling."),
      ],
    },
    {
      id: "needs",
      heading: draft("Dietary and religious requirements"),
      body: [
        draft("We tell you plainly which certification a restaurant holds and what is prepared to your requirements without certification. We cannot guarantee any supplier's preparation beyond what it is certified for."),
      ],
    },
    {
      id: "ours",
      heading: draft("Our responsibility"),
      body: [
        draft("We plan and arrange your trip with reasonable care, and our responsibility to you is as set out in the Travel Agency Act and your conditions of travel."),
      ],
    },
    {
      id: "personal",
      heading: draft("Your personal information"),
      body: [
        draft("We handle the information you share with us as our privacy notice describes."),
      ],
      link: "privacy" as RouteKey,
    },
    {
      id: "law",
      heading: draft("The law that applies"),
      body: [
        draft("These terms are governed by the laws of Japan."),
      ],
    },
    {
      id: "contact",
      heading: draft("Questions"),
      body: [
        draft(["For any question about these terms, write to ", ph("EMAIL"), "."]),
      ],
    },
  ],
};

export const notFound = {
  title: draft("There is no page at this address."),
};

attachArabic(privacy, privacyAr);
attachArabic(terms, termsAr);
attachArabic(notFound, notFoundAr);
