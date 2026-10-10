/* Interface strings — Arabic mirror of interface.ts. DRAFT, awaiting native review. */
import type { ui } from "./interface";
import { ard, type Translation } from "./schema";

export const uiAr: Translation<typeof ui> = {
  skipLink: ard("انتقل إلى المحتوى"),
  menu: ard("القائمة"),
  close: ard("إغلاق"),
  sourceLink: ard("المصدر"),
  whatsappButton: ard("راسلنا عبر واتساب"),
  footer: {
    privacy: ard("الخصوصية"),
    terms: ard("شروط التعامل"),
    legal: ard("قانوني"),
    talkToUs: ard("تواصلوا معنا"),
  },
  seasonBandPending: ard("ستُضاف درجات الحرارة من المصدر المذكور."),
  trip: {
    add: ard("أضف إلى رحلتي"),
    added: ard("أُضيفت إلى رحلتي"),
    title: ard("رحلتي"),
    plan: ard("خطّط رحلتي"),
    remove: ard("إزالة"),
    empty: ard("لا شيء هنا بعد. اختر «أضف إلى رحلتي» في تجربة أو باقة أو منطقة صيفية."),
  },
};
