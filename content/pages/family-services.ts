/* Family Packages (/family-packages; route key familyServices) — docs/CONTENT.md §6. Rebuilt 10 Oct 2026, all DRAFT.
 * Packages are starting points each family tailors (Sarah: option a), drawn from the supplier's routes
 * without prices or codes. Extras are things that can be added; each to be confirmed as really offered. */
import { attachArabic, draft } from "../schema";
import { familyServicesAr } from "./family-services.ar";

export const familyServices = {
  title: draft("Family packages, shaped around yours."),
  intro: draft("Start from a trip that works for most families, then we change it around yours: who is coming, how fast you like to travel, and what you need."),
  packagesHeading: draft("Where families often start"),
  days: draft("days"),
  inOut: draft("Fly in and out"),
  start: draft("Start from this"),
  tailored: draft("Every package is planned again for your family. Nothing is fixed until you agree to it."),
  extrasHeading: draft("Can be added to any package"),
  extrasNote: draft("Tell us what your family needs and we build it in from the first draft."),
  packages: [
    { id: "tokyo-fuji", photo: "mt-fuji", name: draft("Tokyo and Mt Fuji"), days: "4–5", inOut: draft("Tokyo"), stops: [draft("Tokyo"), draft("Mt Fuji")], line: draft("The city and the mountain: Tokyo's neighbourhoods and a day by the lakes facing Fuji.") },
    { id: "kansai", photo: "nara-park", name: draft("Osaka, Kyoto and Nara"), days: "4–5", inOut: draft("Osaka"), stops: [draft("Osaka"), draft("Kyoto"), draft("Nara")], line: draft("Three cities close together: temples and gardens, the deer of Nara, and Osaka's food.") },
    { id: "classic", photo: "japan-summer", name: draft("Tokyo to Osaka, through Kyoto"), days: "6–8", inOut: draft("Tokyo / Osaka"), stops: [draft("Tokyo"), draft("Mt Fuji"), draft("Kyoto"), draft("Osaka")], line: draft("The classic first trip, by bullet train, at a pace that suits grandparents and children.") },
    { id: "west", photo: "miyajima", name: draft("Tokyo to Hiroshima"), days: "9–12", inOut: draft("Tokyo / Osaka"), stops: [draft("Tokyo"), draft("Kyoto"), draft("Nara"), draft("Osaka"), draft("Hiroshima")], line: draft("Further west, with Miyajima's shrine gate in the sea at the end.") },
  ],
  extras: [draft("Female guides"), draft("Arabic-speaking guides"), draft("Child seats"), draft("Cots and high chairs"), draft("Connecting rooms"), draft("Step-free routes"), draft("Private transport"), draft("Private bathing"), draft("Halal dining"), draft("Prayer time and space"), draft("Earlier dinners for children"), draft("Rest in the middle of the day")],
};

attachArabic(familyServices, familyServicesAr);
