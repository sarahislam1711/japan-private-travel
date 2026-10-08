/* Summer Journeys — Arabic mirror of summer-journeys.ts. DRAFT, awaiting native review. */
import { ard, type Translation } from "../schema";
import type { summerJourneys } from "./summer-journeys";

export const summerJourneysAr: Translation<typeof summerJourneys> = {
  title: ard("يوليو وأغسطس هما أفضل شهرين لزيارة العائلة لليابان"),
  story: {
    before: ard("في الصيف تكون المدن الكبرى حارّة ومزدحمة."),
    turn: ard("أما الشمال فلا."),
    places: [
      { line: ard("هوكايدو معتدلة الحرارة") },
      { line: ard("جبال الألب اليابانية معتدلة على ارتفاعاتها") },
      { line: ard("أوكيناوا على البحر") },
    ],
    payoff: ard("ونحن نبني رحلتكم حول ذلك."),
  },
  seasonBand: {
    caption: ard(
      "متوسط درجة الحرارة العظمى اليومية حسب الشهر. المصدر: وكالة الأرصاد الجوية اليابانية، المعدلات المناخية للفترة 1991–2020.",
    ),
    // The third row is a placeholder only and is reused as is.
    rows: [ard("طوكيو"), ard("سابورو")],
  },
  regions: [
    {
      heading: ard("هوكايدو"),
      body: ard(
        "في يوليو وأغسطس، هوكايدو هي المكان الذي تهدأ فيه العائلة. صباحات في حقول اللافندر حول فورانو، وعصريات عند بحيرات شيكوتسو-تويا، وعشاء يستطيع المطبخ تحضيره دون توابل تحتوي على الكحول عندما تطلبون ذلك. المسافات قصيرة، والهواء منعش، ويمكن للجدّ والطفل أن يتشاركا اليوم الهادئ نفسه.",
      ),
      bestWeeks: ard("من منتصف يوليو إلى أواخر أغسطس"),
      length: ard("4–5 ليالٍ"),
      fromTokyo: ard("90 دقيقة بالطائرة إلى سابورو"),
      privateBathCount: ard("6"),
    },
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
    bestWeeks: ard("أفضل الأسابيع"),
    length: ard("المدة المقترحة"),
    fromTokyo: ard("الوصول من طوكيو"),
    privateBathCount: ard("أماكن إقامة بحمّامات خاصة"),
  },
  familyLink: ard("التخطيط للعائلات المسلمة:"),
};
