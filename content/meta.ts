/*
 * Page titles and meta descriptions, both languages — docs/CONTENT.md §1b.
 * Titles stay within ~48 characters so " | HalaJapan" keeps them at 50–60;
 * descriptions 150–160 (search snippet length). Drafted for search intent in each language
 * (not word-for-word), restating approved facts only.
 */
import type { RouteKey } from "./routes";
import { ard, attachArabic, draft, type Copy } from "./schema";

type Meta = { title: Copy; description: Copy };

const en: Record<RouteKey, Meta> = {
  home: {
    title: draft("Private family trips to Japan for every age"),
    description: draft("Private trips to Japan for families who travel together, from grandparents to young children, planned in Arabic, English or Japanese from Tokyo and Osaka."),
  },
  summerJourneys: {
    title: draft("Summer in Japan: Hokkaido, Okinawa and the Alps"),
    description: draft("Summer in Japan for families: Hokkaido and the Japan Alps stay cool and Okinawa is by the sea. Private trips for July and August, planned around your family."),
  },
  privateJapan: {
    title: draft("Private Japan trips in spring, autumn and winter"),
    description: draft(
      "Private trips across Japan outside summer, planned for the whole family: connecting rooms, days paced for every age, transport that keeps you together.",
    ),
  },
  familyServices: {
    title: draft("Japan for Muslim families: halal and prayer"),
    description: draft("Halal certification explained honestly, private bathing confirmed room by room, prayer built into the day, and guides who work in Arabic, for the whole family."),
  },
  experiences: {
    title: draft("Experiences in Japan, arranged with named people"),
    description: draft("Experiences in Japan for families, each arranged with a named person, in a stated season and with a stated lead time, and planned around the rest of your trip."),
  },
  about: {
    title: draft("About HalaJapan and how we are registered"),
    description: draft(
      "HalaJapan is run by Travel World Co., Ltd., a registered travel agency agent in Tokyo and Osaka, selling trips operated by Air World Co., Ltd., a JATA member.",
    ),
  },
  forTravelAdvisors: {
    title: draft("For travel advisors: private Japan for families"),
    description: draft(
      "For clients who travel as a household. You hold the client relationship; we arrange the trip, and Air World, our licensed principal, operates it in Japan.",
    ),
  },
  contact: {
    title: draft("Plan your private family trip to Japan"),
    description: draft("Plan a private family trip to Japan in six short steps: who is coming, when, where and what the trip should do. We reply in Arabic, English or Japanese."),
  },
  privacy: {
    title: draft("Privacy notice"),
    description: draft("How HalaJapan collects, uses, shares and protects the details families send when planning a trip, under Japan's APPI and the EU and UK GDPR where they apply."),
  },
  terms: {
    title: draft("Terms of business"),
    description: draft("How HalaJapan works with you from first enquiry to journey home: plans, bookings, your travel contract with Air World, changes, cancellations, responsibility."),
  },
};

export const pageMeta = attachArabic(en, {
  home: {
    title: ard("رحلات عائلية خاصة إلى اليابان لكل الأعمار"),
    description: ard("رحلات خاصة إلى اليابان للعائلات التي تسافر معًا، نخطّطها بالعربية والإنجليزية واليابانية، من مكتبينا في طوكيو وأوساكا."),
  },
  summerJourneys: {
    title: ard("صيف اليابان: هوكايدو وأوكيناوا وجبال الألب"),
    description: ard("صيف اليابان للعائلات: هوكايدو وجبال الألب اليابانية معتدلة، وأوكيناوا على البحر. رحلات خاصة نخطّطها لشهري يوليو وأغسطس."),
  },
  privateJapan: {
    title: ard("رحلات خاصة في اليابان في الربيع والخريف والشتاء"),
    description: ard("رحلات خاصة في أنحاء اليابان خارج الصيف، مخطّطة للعائلة كلها: غرف متصلة، وأيام بإيقاع يناسب كل الأعمار، وتنقّل يُبقي الجميع معًا."),
  },
  familyServices: {
    title: ard("اليابان للعائلات المسلمة: الحلال والصلاة"),
    description: ard("نشرح شهادات الحلال بوضوح، ونؤكّد الاستحمام الخاص غرفةً غرفة، ونُدرج أوقات الصلاة في اليوم، مع مرشدين يعملون بالعربية."),
  },
  experiences: {
    title: ard("تجارب في اليابان مع أشخاص بأسمائهم"),
    description: ard("تجارب في اليابان للعائلات، نرتّب كلًّا منها مع شخص محدّد بالاسم، في موسم محدّد وبمهلة حجز محدّدة، ونخطّطها حول بقية رحلتكم."),
  },
  about: {
    title: ard("عن HalaJapan وكيف نحن مسجّلون"),
    description: ard("تديرها شركة Travel World المحدودة، وكيل وكالة سفر مسجّل في طوكيو وأوساكا، تبيع رحلات تنفّذها شركة Air World المحدودة، العضو في JATA."),
  },
  forTravelAdvisors: {
    title: ard("لمستشاري السفر: رحلات خاصة إلى اليابان للعائلات"),
    description: ard("لعملائكم الذين يسافرون كعائلة. تحتفظون بعلاقتكم مع العميل، ونحن نرتّب الرحلة، وتنفّذها في اليابان Air World، شركتنا الأصيلة المرخَّصة."),
  },
  contact: {
    title: ard("خطّطوا رحلة عائلية خاصة إلى اليابان"),
    description: ard("خطّطوا رحلة عائلية خاصة إلى اليابان في ست خطوات قصيرة: مَن سيسافر، ومتى، وإلى أين، وما الذي تريدونه من الرحلة. نردّ بالعربية أو الإنجليزية أو اليابانية."),
  },
  privacy: { title: ard("سياسة الخصوصية"), description: ard("كيف تجمع HalaJapan البيانات التي ترسلها العائلات عند التخطيط لرحلة، وكيف تستخدمها وتشاركها وتحميها، وفق القانون الياباني ولائحة حماية البيانات الأوروبية.") },
  terms: { title: ard("شروط التعامل"), description: ard("كيف نعمل معكم من أول استفسار حتى العودة: الخطط والحجوزات، وعقد السفر مع Air World، والتعديلات والإلغاء، والمسؤولية.") },
});
