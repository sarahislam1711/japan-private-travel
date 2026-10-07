/* Navigation labels — Arabic for routes.ts navLabel. DRAFT, awaiting native review. */
import type { RouteKey } from "./routes";
import { ard, type ArText } from "./schema";

export const navLabelsAr: Record<RouteKey, ArText | undefined> = {
  home: undefined,
  summerJourneys: ard("رحلات الصيف"),
  privateJapan: ard("رحلات خاصة"),
  familyServices: ard("خدمات العائلات"),
  experiences: ard("التجارب"),
  about: ard("من نحن"),
  forTravelAdvisors: ard("لمستشاري السفر"),
  contact: ard("تواصل معنا"),
  privacy: undefined,
  terms: undefined,
};
