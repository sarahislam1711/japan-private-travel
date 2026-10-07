/*
 * Page titles and meta descriptions, both languages — docs/CONTENT.md §1b.
 * Titles stay within ~48 characters so " — HalaJapan" keeps them under 60;
 * descriptions within ~155. Drafted for search intent in each language
 * (not word-for-word), restating approved facts only.
 */
import type { RouteKey } from "./routes";
import { ard, attachArabic, draft, type Copy } from "./schema";

type Meta = { title: Copy; description: Copy };

const en: Record<RouteKey, Meta> = {
  home: {
    title: draft("Private family trips to Japan"),
    description: draft(
      "A registered Japanese travel agency in Tokyo and Osaka, planning private trips for families who travel together, in Arabic, English or Japanese.",
    ),
  },
  summerJourneys: {
    title: draft("Summer in Japan: Hokkaido, Okinawa and the Alps"),
    description: draft(
      "Summer in Japan for families: Hokkaido and the Japan Alps stay cool and Okinawa is by the sea. Private trips planned for July and August.",
    ),
  },
  privateJapan: {
    title: draft("Private Japan trips in spring, autumn and winter"),
    description: draft(
      "Private trips across Japan outside summer, planned for the whole family: connecting rooms, days paced for every age, transport that keeps you together.",
    ),
  },
  familyServices: {
    title: draft("Japan for Muslim families: halal and prayer"),
    description: draft(
      "Halal certification explained honestly, private bathing confirmed room by room, prayer built into the day, and guides who work in Arabic.",
    ),
  },
  experiences: {
    title: draft("Experiences in Japan, arranged with named people"),
    description: draft("Each experience is arranged with a named person, in a stated season, with a stated lead time."),
  },
  about: {
    title: draft("About us: a registered travel agency in Japan"),
    description: draft(
      "A registered Japanese travel agency working from Tokyo and Osaka. Our registration and travel services managers are named on every page.",
    ),
  },
  forTravelAdvisors: {
    title: draft("For travel advisors: private Japan for families"),
    description: draft(
      "A registered Japanese agency for clients who travel as a household. You hold the client relationship; we plan and operate the trip in Japan.",
    ),
  },
  contact: {
    title: draft("Plan a private family trip to Japan"),
    description: draft("Tell us who is travelling and when. Message us on WhatsApp, email or call, and we will reply in your language."),
  },
  privacy: {
    title: draft("Privacy notice"),
    description: draft("How HalaJapan uses the details you send us."),
  },
  terms: {
    title: draft("Terms of business"),
    description: draft("Terms of business for trips arranged by HalaJapan."),
  },
};

export const pageMeta = attachArabic(en, {
  home: {
    title: ard("رحلات خاصة إلى اليابان للعائلات"),
    description: ard("وكالة سفر يابانية مسجّلة في طوكيو وأوساكا، نخطّط رحلات خاصة للعائلات التي تسافر معًا، بالعربية والإنجليزية واليابانية."),
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
    description: ard("كل تجربة نرتّبها مع شخص محدّد بالاسم، في موسم محدّد، وبمهلة حجز محدّدة."),
  },
  about: {
    title: ard("من نحن: وكالة سفر مسجّلة في اليابان"),
    description: ard("وكالة سفر يابانية مسجّلة تعمل من طوكيو وأوساكا. تسجيلنا وأسماء مديري خدمات السفر لدينا مذكورة في كل صفحة."),
  },
  forTravelAdvisors: {
    title: ard("لمستشاري السفر: رحلات خاصة إلى اليابان للعائلات"),
    description: ard("وكالة يابانية مسجّلة لعملائكم الذين يسافرون كعائلة. تحتفظون بعلاقتكم مع العميل، ونخطّط الرحلة وننفّذها في اليابان."),
  },
  contact: {
    title: ard("خطّطوا رحلة عائلية خاصة إلى اليابان"),
    description: ard("أخبرونا مَن سيسافر ومتى. راسلونا عبر واتساب أو البريد الإلكتروني أو الهاتف، وسنردّ عليكم بلغتكم."),
  },
  privacy: { title: ard("سياسة الخصوصية"), description: ard("كيف تستخدم HalaJapan البيانات التي ترسلونها إلينا.") },
  terms: { title: ard("شروط التعامل"), description: ard("شروط التعامل للرحلات التي ترتّبها HalaJapan.") },
});
