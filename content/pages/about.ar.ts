/* About — Arabic mirror of about.ts. DRAFT, awaiting native review. Title is a placeholder only. */
import { ard, ja, ph, type Translation } from "../schema";
import type { about } from "./about";

export const aboutAr: Translation<typeof about> = {
  whoWeAre: {
    heading: ard("من نحن"),
    paragraphs: [
      ard(
        "نحن وكالة سفر يابانية مسجّلة نعمل من طوكيو وأوساكا. تظهر بيانات تسجيلنا واسم مدير خدمات السفر المعتمد لدينا أسفل كل صفحة — ويمكنكم التحقق من كليهما لدى وكالة السياحة اليابانية.",
      ),
      ard(
        "يقود الشركة مؤسس مصري يعمل باللغة اليابانية، مع فريق لغاته الأم العربية واليابانية والإنجليزية. تجري المحادثات مع العملاء بلغتهم، من دون مترجم وسيط.",
      ),
      ard("نعمل بناءً على الاستفسارات فقط. ومعظم ما نرتّبه، نرتّبه مرة واحدة."),
    ],
  },
  credentials: {
    heading: ard("بيانات الاعتماد"),
    rows: [
      { label: ard("التسجيل") },
      { label: ard("جهة التسجيل") },
      { label: ard("الكيان المسجّل") },
      { label: ard("مكتب طوكيو") },
      { label: ard("مكتب أوساكا") },
      {
        label: ard("مدير خدمات السفر، طوكيو"),
        value: ard([ph("MANAGER_TOKYO"), "، ", ja("旅行業務取扱管理者"), " (", ph("MANAGER_TOKYO_GRADE"), ")"]),
      },
      {
        label: ard("مدير خدمات السفر، أوساكا"),
        value: ard([ph("MANAGER_OSAKA"), "، ", ja("旅行業務取扱管理者"), " (", ph("MANAGER_OSAKA_GRADE"), ")"]),
      },
      { label: ard("العضويات") },
      {
        label: ard("تأمين المسؤولية العامة"),
        value: ard([ph("INSURER"), "، بتغطية ", ph("COVER_LEVEL")]),
      },
      {
        label: ard("اللغات"),
        value: ard(["العربية والإنجليزية واليابانية — ", ph("LANGUAGE_STAFF_NOTE")]),
      },
      {
        label: ard("طريقة التسعير"),
        value: ard("أسعار الموردين الصافية، مضافًا إليها هامش خدمة مُعلَن."),
      },
      {
        label: ard("المؤسس"),
        value: ard(["يعمل مؤسسنا في مجال السياحة الوافدة إلى اليابان منذ ", ph("FOUNDER_YEAR"), "."]),
      },
    ],
  },
  sources: {
    heading: ard("المصادر"),
  },
};
