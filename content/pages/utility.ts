/* Utility pages — docs/CONTENT.md §11. */
import { draft, locked, missing, ph } from "../schema";

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
