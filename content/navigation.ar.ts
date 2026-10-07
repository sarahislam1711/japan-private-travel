/* Header navigation — Arabic mirror of navigation.ts, by index. DRAFT, awaiting native review. */
import type { mainNav } from "./navigation";
import { ard, type Translation } from "./schema";

export const mainNavAr: Translation<typeof mainNav> = [
  {
    label: ard("الرحلات"),
    items: [
      { description: ard("هوكايدو وأوكيناوا وجبال الألب اليابانية في يوليو وأغسطس.") },
      { description: ard("رحلات على مدار العام للعائلات والمجموعات الصغيرة التي تسافر معًا.") },
    ],
  },
  {},
  {},
  {},
  { label: ard("المستشارون") },
  {},
];
