/* Interface strings — Arabic mirror of interface.ts. DRAFT, awaiting native review. */
import type { ui } from "./interface";
import { ard, type Translation } from "./schema";

export const uiAr: Translation<typeof ui> = {
  skipLink: ard("انتقل إلى المحتوى"),
  menu: ard("القائمة"),
  sourceLink: ard("المصدر"),
  whatsappButton: ard("راسلنا عبر واتساب"),
  footer: {
    privacy: ard("الخصوصية"),
    terms: ard("شروط التعامل"),
    legal: ard("قانوني"),
    talkToUs: ard("تواصلوا معنا"),
  },
  seasonBandPending: ard("ستُضاف درجات الحرارة من المصدر المذكور."),
};
