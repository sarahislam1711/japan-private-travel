/* Contact — Arabic mirror of contact.ts. DRAFT, awaiting native review. */
import { ard, ph, type Translation } from "../schema";
import type { contact } from "./contact";

export const contactAr: Translation<typeof contact> = {
  title: ard("أخبرونا مَن سيسافر، ومتى، وما الذي تريدونه من الرحلة."),
  routes: [
    ard(["الهاتف: ", ph("PHONE")]),
    ard(["البريد الإلكتروني: ", ph("EMAIL")]),
  ],
  arabicLine: ard("يسعدنا التواصل معكم باللغة العربية عبر واتساب."),
  form: {
    fields: {
      name: ard("الاسم"),
      replyChannel: ard("كيف تفضّلون أن نردّ عليكم؟"),
      replyChannelOptions: [ard("واتساب"), ard("البريد الإلكتروني"), ard("الهاتف")],
      phone: ard("رقم واتساب أو الهاتف"),
      email: ard("البريد الإلكتروني"),
      household: ard("مَن سيسافر، وأعمارهم"),
      dates: ard("التواريخ التي تفكّرون فيها"),
      purpose: ard("ما تريدون أن تحقّقه الرحلة"),
      replyLanguage: ard("لغة الردّ"),
      replyLanguageOptions: [ard("العربية"), ard("الإنجليزية"), ard("اليابانية")],
    },
    submit: ard("إرسال الاستفسار"),
    confirmation: ard("تمّ استلام استفساركم. سنردّ عليكم باللغة والوسيلة اللتين اخترتموهما."),
    privacyLine: ard("نستخدم هذه البيانات فقط للردّ عليكم وتخطيط رحلتكم. اطّلعوا على إشعار الخصوصية."),
  },
  planner: {
    steps: {
      who: ard("المسافرون"),
      when: ard("الموعد"),
      where: ard("الوجهة"),
      needs: ard("الرحلة"),
      reply: ard("الردّ"),
      review: ard("خطّتكم"),
    },
    questions: {
      who: ard("مَن سيسافر؟"),
      when: ard("متى تفكّرون في السفر؟"),
      where: ard("إلى أين تودّون الذهاب؟"),
      needs: ard("ما الذي تريدون أن تحقّقه الرحلة؟"),
    },
    hints: {
      who: ard("كل المسافرين، من الأجداد إلى أصغر الأطفال."),
      when: ard("اختاروا الأشهر التي تفكّرون فيها. تكفي فكرة تقريبية."),
      where: ard("اختاروا ما تشاؤون، أو دعونا نقترح عليكم."),
      needs: ard("مناسبة خاصة، أو زيارة أولى، أو أيام أهدأ لكبار السن: كل ما يهمّكم. اختياري."),
      reply: ard("نردّ بلغتكم، وبالوسيلة التي تختارونها."),
      review: ard("راجعوا خطّتكم، ثم أرسلوها إلينا."),
    },
    people: {
      adults: ard("البالغون"),
      grandparents: ard("الأجداد"),
      children: ard("الأطفال"),
      age: ard("العمر"),
      under1: ard("أقل من سنة"),
      add: ard("إضافة"),
      remove: ard("إزالة"),
    },
    when: {
      notSure: ard("لم نحدّد بعد"),
      datesNote: ard("أي تفاصيل أخرى عن التواريخ؟ (اختياري)"),
    },
    where: {
      anywhere: ard("أماكن أخرى في اليابان، في أي موسم"),
      suggest: ard("لم نحدّد بعد: اقترحوا علينا"),
    },
    buttons: {
      next: ard("متابعة"),
      back: ard("رجوع"),
      edit: ard("تعديل"),
      startOver: ard("البدء من جديد"),
      sendWhatsApp: ard("إرسال عبر واتساب"),
    },
    enquirySoon: ard("الإرسال عبر البريد الإلكتروني متاح قريبًا. يمكنكم الآن إرسال خطّتكم عبر واتساب."),
    summary: {
      title: ard("خطّتكم حتى الآن"),
      empty: ard("تظهر إجاباتكم هنا خطوة بخطوة."),
      travelling: ard("المسافرون"),
      months: ard("الأشهر"),
      places: ard("الأماكن"),
    },
    whatsappIntro: ard("مرحبًا، هذه خطّة رحلتنا:"),
    errors: {
      needTraveller: ard("أضيفوا بالغًا واحدًا أو أحد الأجداد على الأقل."),
      needWhen: ard("اختاروا شهرًا، أو «لم نحدّد بعد»."),
      needName: ard("يُرجى كتابة الاسم."),
      needContact: ard("يُرجى إضافة رقم أو بريد إلكتروني لنتمكّن من الردّ."),
    },
    saved: ard("تُحفظ إجاباتكم على هذا الجهاز حتى ترسلوها."),
  },
};
