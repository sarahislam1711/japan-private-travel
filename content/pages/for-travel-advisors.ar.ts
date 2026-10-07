/* For Travel Advisors — Arabic mirror of for-travel-advisors.ts. DRAFT, awaiting native review. */
import { ard, type Translation } from "../schema";
import type { forTravelAdvisors } from "./for-travel-advisors";

export const forTravelAdvisorsAr: Translation<typeof forTravelAdvisors> = {
  title: ard("لمستشاري السفر"),
  paragraphs: [
    ard(
      "نعمل مع المستشارين الذين يسافر عملاؤهم إلى اليابان كعائلة واحدة. أنتم تحتفظون بالعلاقة مع العميل؛ ونحن نخطّط الرحلة وننفّذها في اليابان، ونتحدّث مع عملائكم بالعربية أو الإنجليزية أو اليابانية متى طلبتم ذلك.",
    ),
    ard(
      "كل ما يتطلّبه التحقق من العناية الواجبة منشور للعموم: تسجيلنا، وأسماء مديري خدمات السفر لدينا، وعضوياتنا، وتأميننا، كلها في صفحة «من نحن». ولا يقع خلف تسجيل الدخول سوى الأسعار الصافية، وتُمنح للمستشارين الذين تحقّقنا منهم.",
    ),
  ],
  sections: {
    netRates: {
      lead: ard("الأسعار الصافية."),
      body: ard("مسعّرة بالين الياباني، صافية من هامشنا، فتحدّدون عمولتكم بأنفسكم."),
    },
    response: {
      lead: ard("الاستجابة."),
      body: ard("المكتب نفسه الذي يردّ على العملاء يردّ على المستشارين، وبالتزام الاستجابة نفسه."),
    },
    requestAccess: {
      lead: ard("طلب الوصول."),
      fields: {
        name: ard("الاسم"),
        agency: ard("الوكالة"),
        country: ard("الدولة"),
        consortium: ard("التحالف أو الشبكة"),
        registration: ard("رقم تسجيل الوكالة أو رقم IATA"),
        email: ard("البريد الإلكتروني للعمل"),
      },
      // Consortium names are proper names and stay in Latin script.
      consortiumOptions: [
        ard("Virtuoso"),
        ard("Traveller Made"),
        ard("Signature"),
        ard("Ensemble"),
        ard("مستقل"),
        ard("أخرى"),
      ],
      submit: ard("طلب الوصول"),
      confirmation: ard("تمّ استلام طلبكم. نتحقّق من كل وكالة يدويًا ونردّ عبر البريد الإلكتروني."),
    },
    signIn: {
      lead: ard("حصلتم على الموافقة مسبقًا؟"),
      link: ard("تسجيل الدخول إلى الأسعار الصافية"),
    },
  },
};
