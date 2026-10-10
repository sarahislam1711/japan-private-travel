/* For Travel Advisors — Arabic mirror of for-travel-advisors.ts. DRAFT, awaiting native review. */
import { ard, ph, type Translation } from "../schema";
import type { forTravelAdvisors } from "./for-travel-advisors";

export const forTravelAdvisorsAr: Translation<typeof forTravelAdvisors> = {
  title: ard("لمستشاري السفر"),
  intro: ard("اليابان لعملائكم الذين يسافرون كعائلة. تحتفظون بعلاقتكم مع العميل، ونخطّط الرحلة معكم بالعربية أو الإنجليزية أو اليابانية."),
  requestCta: ard("اطلبوا حساب وكيل"),
  signInCta: ard("لديكم حساب؟ سجّلوا الدخول"),
  stepsHeading: ard("كيف نعمل معًا"),
  whyHeading: ard("لماذا يعمل المستشارون معنا"),
  registered: ard("مسجّلون ويمكن التحقق منّا"),
  registeredLine: ard(["شركة Travel World المحدودة، تسجيل حاكم طوكيو رقم ", ph("REG_NUMBER"), "، تبيع لصالح شركة Air World المحدودة (وكالة السياحة اليابانية رقم 961، عضو في JATA)."]),
  registeredLink: ard("كيف نحن مسجّلون"),
  termsHeading: ard("شروط الوكلاء"),
  termsBody: ard("يحصل المستشارون المسجّلون على شروط الوكلاء، مع شروط إضافية للرحلات المتكرّرة والحجوزات الشهرية المنتظمة والتأكيد المبكر. ونشارك المستويات الحالية بعد التحقق من وكالتكم."),
  formHeading: ard("طلب حساب وكيل"),
  formIntro: ard("نتحقّق من كل وكالة يدويًا ونردّ عبر البريد الإلكتروني."),
  submit: ard("إرسال الطلب"),
  sending: ard("جارٍ الإرسال…"),
  confirmation: ard("تمّ استلام طلبكم. نتحقّق من كل وكالة يدويًا ونردّ عبر البريد الإلكتروني."),
  error: ard("تعذّر إرسال طلبكم الآن. يُرجى المحاولة مرة أخرى."),
  networkLabel: ard("الشبكة أو التحالف"),
  steps: [
    { lead: ard("أرسلوا لنا التفاصيل."), body: ard("مَن سيسافر، ومتى، وما الذي تريدونه من الرحلة.") },
    { lead: ard("نخطّطها معكم."), body: ard("خطة يومًا بيوم، وغرف نتحقّق منها واحدة واحدة، وعرض سعر تقدّمونه باسمكم.") },
    { lead: ard("نعتني بهم في اليابان."), body: ard("نستقبل عملاءكم ونرشدهم وندعمهم على أرض الواقع، وتبقون على اطّلاع دائم.") },
  ],
  why: [
    { lead: ard("عميلكم يبقى عميلكم."), body: ard("لا نتواصل معهم تسويقيًا أبدًا.") },
    { lead: ard("العائلات تخصّصنا."), body: ard("من الأجداد إلى الأطفال الصغار، بخصوصية وإيقاع مريح.") },
    { lead: ard("نتحدّث لغتهم."), body: ard("العربية والإنجليزية واليابانية، دون مترجم وسيط.") },
  ],
  fields: {
    name: ard("الاسم"),
    agency: ard("الوكالة"),
    country: ard("الدولة"),
    registration: ard("رقم تسجيل الوكالة أو رقم IATA"),
    email: ard("البريد الإلكتروني للعمل"),
  },
  networks: [ard("Virtuoso"), ard("Traveller Made"), ard("Signature"), ard("Ensemble"), ard("مستقلّة"), ard("أخرى")],
};
