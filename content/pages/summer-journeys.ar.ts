/* Summer Journeys — Arabic mirror of summer-journeys.ts. DRAFT, awaiting native review. */
import { ard, type Translation } from "../schema";
import type { summerJourneys } from "./summer-journeys";

export const summerJourneysAr: Translation<typeof summerJourneys> = {
  title: ard("يوليو وأغسطس هما أفضل شهرين لاصطحاب العائلة إلى اليابان — في الأماكن المناسبة."),
  lede: [
    ard(
      "هونشو في ذروة الصيف حارّة ومزدحمة. أما هوكايدو فلا. وأوكيناوا ساحلية. وجبال الألب اليابانية معتدلة الحرارة على ارتفاعاتها. في هذين الشهرين تكون أرقى أماكن الإقامة في اليابان في أهدأ أوقاتها وأكثرها توفّرًا، وهما أيضًا الشهران اللذان تكون فيهما العائلات من الخليج وجنوب أوروبا في أمسّ الحاجة إلى السفر.",
    ),
    ard("وقد أسّسنا هذه الشركة على هذا التلاقي."),
  ],
  seasonBand: {
    caption: ard(
      "متوسط درجة الحرارة العظمى اليومية حسب الشهر. المصدر: وكالة الأرصاد الجوية اليابانية، المعدلات المناخية للفترة 1991–2020.",
    ),
    // The third row is a placeholder only and is reused as is.
    rows: [ard("طوكيو"), ard("سابورو")],
  },
  regions: [
    { heading: ard("هوكايدو") },
    { heading: ard("أوكيناوا") },
    { heading: ard("هوكوريكو وجبال الألب اليابانية") },
  ],
  closing: ard("مواعيد الصيف تُحجز أولًا. أخبرونا عن أفراد العائلة والأسابيع التي تفكّرون فيها."),
  otherSeasons: ard("هل تسافرون في وقت آخر من السنة؟"),
  months: {
    heading: ard("شهران، وثلاثة أماكن."),
    text: ard(
      "صيف طوكيو حارّ ومزدحم. أما الأماكن التي نخطّط لها للعائلات في يوليو وأغسطس فتقع أبعد شمالًا، أو أعلى ارتفاعًا، أو على البحر.",
    ),
  },
  factLabels: {
    bestWeeks: ard("الأسابيع التي نوصي بها"),
    length: ard("المدة المقترحة"),
    fromTokyo: ard("الوصول من طوكيو"),
    privateBathCount: ard("أماكن الإقامة ذات الاستحمام الخاص التي نعتمدها"),
  },
  familyLink: ard("التخطيط للعائلات المسلمة:"),
};
