/* Utility pages — docs/CONTENT.md §11. */
import { attachArabic, draft, locked, missing, ph } from "../schema";
import { notFoundAr, privacyAr, termsAr } from "./utility.ar";

export const privacy = {
  title: missing("PRIVACY_TITLE"),
  body: locked([ph("PRIVACY_NOTICE")], { flags: ["D11"] }),
};

export const terms = {
  title: missing("TERMS_TITLE"),
  body: locked([ph("TERMS_OF_BUSINESS")], { flags: ["D11"] }),
};

export const notFound = {
  title: draft("There is no page at this address."),
};

attachArabic(privacy, privacyAr);
attachArabic(terms, termsAr);
attachArabic(notFound, notFoundAr);
