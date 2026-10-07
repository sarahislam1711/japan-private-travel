/* Site-wide content — Arabic mirror of site.ts. DRAFT, awaiting native review. */
import { ard, ph, type Translation } from "./schema";
import type { site } from "./site";

export const siteAr: Translation<typeof site> = {
  registration: {
    lineEn: ard(["وكالة سفر مسجّلة لدى ", ph("REG_AUTHORITY_EN"), " برقم ", ph("REG_NUMBER")]),
  },
  tradeNameLine: ard([ph("BRAND"), " اسم تجاري لشركة ", ph("ENTITY_NAME_EN"), "."]),
  memberships: [ard(["عضو في ", ph("ASSOCIATION")])],
  whatsapp: {
    prefill: ard("مرحبًا، أودّ التخطيط لرحلة إلى اليابان لعائلتي."),
  },
};
