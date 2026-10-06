/* Every content module, for the guard and for route-level lookups. */
import { about } from "./pages/about";
import { contact } from "./pages/contact";
import { experiences } from "./pages/experiences";
import { familyServices } from "./pages/family-services";
import { forTravelAdvisors } from "./pages/for-travel-advisors";
import { home } from "./pages/home";
import { privateJapan } from "./pages/private-japan";
import { summerJourneys } from "./pages/summer-journeys";
import { notFound, privacy, terms } from "./pages/utility";
import type { RouteKey } from "./routes";
import type { Copy } from "./schema";

export { site } from "./site";
export { routes, routeFor, privatePathPrefixes } from "./routes";
export { claims } from "./claims";
export { photographs } from "./photography.manifest";
export { approvals } from "./approvals";
export { placeholders } from "./placeholders";

/** Page modules by route key, plus the 404. File paths are for guard reports. */
export const pages = {
  home: { file: "content/pages/home.ts", content: home },
  summerJourneys: { file: "content/pages/summer-journeys.ts", content: summerJourneys },
  privateJapan: { file: "content/pages/private-japan.ts", content: privateJapan },
  familyServices: { file: "content/pages/family-services.ts", content: familyServices },
  experiences: { file: "content/pages/experiences.ts", content: experiences },
  about: { file: "content/pages/about.ts", content: about },
  forTravelAdvisors: { file: "content/pages/for-travel-advisors.ts", content: forTravelAdvisors },
  contact: { file: "content/pages/contact.ts", content: contact },
  privacy: { file: "content/pages/utility.ts", content: privacy },
  terms: { file: "content/pages/utility.ts", content: terms },
} as const;

export const notFoundPage = { file: "content/pages/utility.ts", content: notFound };

/** The visible page title (h1) for each route. Home's is its hero headline. */
export const pageTitles: Record<RouteKey, Copy> = {
  home: home.hero.headline,
  summerJourneys: summerJourneys.title,
  privateJapan: privateJapan.title,
  familyServices: familyServices.title,
  experiences: experiences.title,
  about: about.title,
  forTravelAdvisors: forTravelAdvisors.title,
  contact: contact.title,
  privacy: privacy.title,
  terms: terms.title,
};
