/* Contact — Arabic mirror of contact.ts. DRAFT, awaiting native review. */
import { ard, ph, type Translation } from "../schema";
import type { contact } from "./contact";

export const contactAr: Translation<typeof contact> = {
  title: ard("أخبرونا عن أفراد العائلة، والتواريخ التي تفكّرون فيها، وما تريدون أن تحقّقه الرحلة."),
  routes: [
    ard([
      "واتساب: ",
      ph("WHATSAPP_DISPLAY"),
      " — نردّ بالعربية أو الإنجليزية خلال ساعتين في أوقات العمل في اليابان.",
    ]),
    ard(["الهاتف: ", ph("PHONE")]),
    ard(["البريد الإلكتروني: ", ph("EMAIL")]),
  ],
  formIntro: ard("أو استخدموا النموذج: مَن سيسافر (وأعمارهم)، والتواريخ التي تفكّرون فيها، واللغة المفضّلة."),
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
};
