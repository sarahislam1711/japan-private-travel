/* Site-wide content — Arabic mirror of site.ts. DRAFT, awaiting native review. */
import { ard, ja, ph, type Translation } from "./schema";
import type { site } from "./site";

export const siteAr: Translation<typeof site> = {
  registration: {
    lineEn: ard(["وكيل وكالة سفر، مسجّل لدى حاكم طوكيو برقم ", ph("REG_NUMBER")]),
  },
  principal: ard(["شركة Air World المحدودة (", ja("観光庁長官登録旅行業第961号"), ")، عضو في JATA"]),
  tradeNameLine: ard([ph("BRAND"), " اسم تجاري لشركة ", ph("ENTITY_NAME_EN")]),
  whatsapp: {
    prefill: ard("مرحبًا، أودّ التخطيط لرحلة إلى اليابان لعائلتي."),
  },
};
