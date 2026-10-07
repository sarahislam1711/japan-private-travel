/* Experiences — Arabic mirror of experiences.ts. DRAFT, awaiting native review. Title is a placeholder only. */
import { ard, type Translation } from "../schema";
import type { experiences } from "./experiences";

export const experiencesAr: Translation<typeof experiences> = {
  intro: ard(
    "تُرتَّب كلٌّ من هذه التجارب مع شخص معروف بالاسم، في موسم محدّد، وبمهلة مسبقة محدّدة. إذا ذكرت التجربة ستة أسابيع، فهي تحتاج إلى ستة أسابيع.",
  ),
};
