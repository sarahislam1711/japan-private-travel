/* About — Arabic mirror of about.ts. DRAFT, awaiting native review. */
import { ard, ja, ph, type Translation } from "../schema";
import type { about } from "./about";

export const aboutAr: Translation<typeof about> = {
  title: ard(["عن ", ph("BRAND")]),
  intro: ard([ph("BRAND"), " تديرها شركة ", ph("ENTITY_NAME_EN"), "، التي تأسّست في طوكيو في 23 سبتمبر 2016، ولها مكتبان في طوكيو وأوساكا."]),
  keyFacts: [ard("منذ 2016"), ard("طوكيو وأوساكا"), ard(["تسجيل حاكم طوكيو رقم ", ph("REG_NUMBER")])],
  people: {
    heading: ard("فريقنا"),
    director: {
      name: ard("فتحي محمد محمد إسماعيل أحمد"),
      role: ard("المدير التمثيلي"),
      bio: ard(
        "تخرّج في قسم اللغة اليابانية بجامعة القاهرة، وعمل مرشدًا سياحيًا ناطقًا باليابانية في مصر لأكثر من عشرين عامًا قبل أن يؤسّس الشركة في طوكيو، حيث يقيم.",
      ),
    },
    managersLabel: ard(["مديرا خدمات السفر المرخَّصان (", ja("総合旅行業務取扱管理者"), ")"]),
    managers: ard("ماريكو كاجيوارا وتاكاشي مينو"),
    managersNote: ard("يشترط قانون وكالات السفر في اليابان وجود مدير مرخَّص في كل مكتب."),
  },
  registration: {
    heading: ard("كيف نحن مسجّلون"),
    intro: ard("تُرخِّص اليابان شركات السفر على مستويات. هذا هو موقعنا بالضبط، ومَن يقف وراء حجزكم."),
    steps: [
      { title: ard("أنتم"), text: ard("تخطّطون رحلتكم معنا.") },
      {
        title: ard([ph("BRAND"), " · ", ph("ENTITY_NAME_EN")]),
        text: ard([
          "وكيل وكالة سفر، مسجّل لدى حاكم طوكيو برقم ",
          ph("REG_NUMBER"),
          " (",
          ja("東京都知事登録旅行業者代理業 第"),
          ph("REG_NUMBER"),
          ja("号"),
          "). نبيع نيابةً عن شركة سفر مرخَّصة واحدة.",
        ]),
      },
      {
        title: ard(["شركة Air World المحدودة (", ja("エアーワールド株式会社"), ")"]),
        text: ard([
          "وكالة سفر مسجّلة برقم 961 لدى مفوّض وكالة السياحة اليابانية (",
          ja("観光庁長官登録旅行業第961号"),
          ")، وعضو كامل في JATA، رابطة وكلاء السفر اليابانية. تنظّم Air World الرحلات التي نبيعها وتنفّذها، وعقد السفر الخاص بكم يكون مع Air World.",
        ]),
      },
    ],
    check: ard("يمكنكم التحقق من التسجيلين لدى حكومة طوكيو الحضرية ووكالة السياحة اليابانية."),
  },
  offices: {
    heading: ard("المكاتب"),
    list: [{ name: ard("طوكيو (المكتب الرئيسي)") }, { name: ard("أوساكا") }],
    telLabel: ard("هاتف"),
    faxLabel: ard("فاكس"),
    hours: ard("من الاثنين إلى الجمعة، من 10:00 إلى 17:00 بتوقيت اليابان. مغلق في عطلات نهاية الأسبوع والعطلات الرسمية."),
  },
  facts: {
    heading: ard("بيانات الشركة"),
    rows: [
      { label: ard("الشركة"), value: ard([ph("ENTITY_NAME_EN"), " (", ph("ENTITY_NAME_JA"), ")"]) },
      { label: ard("تاريخ التأسيس"), value: ard("23 سبتمبر 2016، طوكيو") },
      { label: ard("رأس المال"), value: ard("5,000,000 ين") },
      { label: ard("المدير التمثيلي"), value: ard("فتحي محمد محمد إسماعيل أحمد") },
      { label: ard("مديرا خدمات السفر المرخَّصان"), value: ard("ماريكو كاجيوارا، تاكاشي مينو") },
      { label: ard("التسجيل"), value: ard(["حاكم طوكيو، وكيل وكالة سفر رقم ", ph("REG_NUMBER")]) },
      { label: ard("شركة السفر الأصيلة"), value: ard("شركة Air World المحدودة، وكالة سفر مسجّلة لدى وكالة السياحة اليابانية برقم 961 (عضو في JATA)") },
    ],
  },
  footer: {
    entity: ard("الكيان المسجّل"),
    registration: ard("التسجيل"),
    tokyo: ard("مكتب طوكيو"),
    osaka: ard("مكتب أوساكا"),
    managers: ard("مديرا خدمات السفر المرخَّصان"),
    principal: ard("شركة السفر الأصيلة"),
  },
};
