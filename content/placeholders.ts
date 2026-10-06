/*
 * Every value only the team, the operator, the 行政書士 or a photographer can supply.
 * A placeholder with `value: null` renders as <Placeholder> in dev and fails the
 * guard (C7) in production. Fill a value here; never in a page module.
 *
 * kind "fact": a fact that must not be invented.
 * kind "copy": a string docs/CONTENT.md does not yet define.
 */

export const placeholderKeys = [
  // Legal — from the registration documents, form confirmed by the 行政書士
  "ENTITY_NAME_EN",
  "ENTITY_NAME_JA",
  "ENTITY_ADDRESS",
  "OSAKA_ADDRESS",
  "REG_AUTHORITY_JA",
  "REG_AUTHORITY_EN",
  "REG_NUMBER",
  "PRIVACY_NOTICE",
  "TERMS_OF_BUSINESS",

  // Operator — contact routes
  "WHATSAPP_E164",
  "WHATSAPP_DISPLAY",
  "PHONE",
  "EMAIL",
  "DESK_EMAIL",

  // Operator — credentials
  "MANAGER_TOKYO",
  "MANAGER_TOKYO_GRADE",
  "MANAGER_OSAKA",
  "MANAGER_OSAKA_GRADE",
  "ASSOCIATION",
  "INSURER",
  "COVER_LEVEL",
  "LANGUAGE_STAFF_NOTE",
  "FOUNDER_YEAR",
  "TRANSPORT_OPERATOR",

  // Operator — Summer Journeys region brief (CONTENT.md §4)
  "HOKKAIDO_BODY",
  "HOKKAIDO_BEST_WEEKS",
  "HOKKAIDO_LENGTH",
  "HOKKAIDO_FROM_TOKYO",
  "HOKKAIDO_PRIVATE_BATH_COUNT",
  "OKINAWA_BODY",
  "OKINAWA_BEST_WEEKS",
  "OKINAWA_LENGTH",
  "OKINAWA_FROM_TOKYO",
  "OKINAWA_PRIVATE_BATH_COUNT",
  "ALPS_BODY",
  "ALPS_BEST_WEEKS",
  "ALPS_LENGTH",
  "ALPS_FROM_TOKYO",
  "ALPS_PRIVATE_BATH_COUNT",

  // Operator — Experiences entry fields (CONTENT.md §7), used by dev placeholder entries
  "VENUE",
  "CITY",
  "WHAT_HAPPENS",
  "NAMED_PRACTITIONER",
  "SEASON_OR_MONTHS",
  "DURATION",
  "GROUP_LIMIT",

  // Team — decisions
  "BRAND",
  "DOMAIN",
  "DESK_ZONE",
  "DESK_HOURS",
  "ALPS_STATION",

  // Team — copy not yet in docs/CONTENT.md
  "PRIVATE_JAPAN_TITLE",
  "EXPERIENCES_TITLE",
  "ABOUT_TITLE",
  "PRIVACY_TITLE",
  "TERMS_TITLE",
  "MENU_LABEL",
  "SKIP_LINK_LABEL",
] as const;

export type PlaceholderKey = (typeof placeholderKeys)[number];

export type PlaceholderOwner = "legal" | "operator" | "photography" | "team";

export type Placeholder = {
  owner: PlaceholderOwner;
  kind: "fact" | "copy";
  note: string;
  value: string | null;
};

const fact = (owner: PlaceholderOwner, note: string): Placeholder => ({
  owner,
  kind: "fact",
  note,
  value: null,
});
const copy = (note: string): Placeholder => ({ owner: "team", kind: "copy", note, value: null });

export const placeholders: Record<PlaceholderKey, Placeholder> = {
  ENTITY_NAME_EN: fact("legal", "Registered entity name in English"),
  ENTITY_NAME_JA: fact("legal", "Registered entity name in Japanese"),
  ENTITY_ADDRESS: fact("legal", "Tokyo office address as registered"),
  OSAKA_ADDRESS: fact("legal", "Osaka office address"),
  REG_AUTHORITY_JA: fact("legal", "Registering authority, prescribed Japanese form"),
  REG_AUTHORITY_EN: fact("legal", "Registering authority in English"),
  REG_NUMBER: fact("legal", "Registration number"),
  PRIVACY_NOTICE: fact("legal", "APPI-compliant privacy notice (D11)"),
  TERMS_OF_BUSINESS: fact("legal", "旅行業約款 / 取引条件 as advised (D11)"),

  WHATSAPP_E164: fact("operator", "WhatsApp number, E.164 digits only, for wa.me links"),
  WHATSAPP_DISPLAY: fact("operator", "WhatsApp number as displayed"),
  PHONE: fact("operator", "Telephone number"),
  EMAIL: fact("operator", "Public email address"),
  DESK_EMAIL: fact("operator", "Address that receives enquiry notifications"),

  MANAGER_TOKYO: fact("operator", "Travel services manager, Tokyo — full name"),
  MANAGER_TOKYO_GRADE: fact("operator", "Tokyo manager's 旅行業務取扱管理者 grade"),
  MANAGER_OSAKA: fact("operator", "Travel services manager, Osaka — full name"),
  MANAGER_OSAKA_GRADE: fact("operator", "Osaka manager's 旅行業務取扱管理者 grade"),
  ASSOCIATION: fact("operator", "Association membership, one per line"),
  INSURER: fact("operator", "Public liability insurer"),
  COVER_LEVEL: fact("operator", "Public liability cover level"),
  LANGUAGE_STAFF_NOTE: fact("operator", "Who speaks each language natively"),
  FOUNDER_YEAR: fact("operator", "Year the founder began in Japanese inbound travel"),
  TRANSPORT_OPERATOR: fact("operator", "Licensed hire operator supplying vehicles and drivers"),

  HOKKAIDO_BODY: fact("operator", "Hokkaido, 80–120 words: what a household does in July–August, named places"),
  HOKKAIDO_BEST_WEEKS: fact("operator", "Hokkaido margin: best weeks"),
  HOKKAIDO_LENGTH: fact("operator", "Hokkaido margin: suggested length"),
  HOKKAIDO_FROM_TOKYO: fact("operator", "Hokkaido margin: getting there from Tokyo"),
  HOKKAIDO_PRIVATE_BATH_COUNT: fact("operator", "Hokkaido margin: properties with private bathing we use (count)"),
  OKINAWA_BODY: fact("operator", "Okinawa, 80–120 words: what a household does in July–August, named places"),
  OKINAWA_BEST_WEEKS: fact("operator", "Okinawa margin: best weeks"),
  OKINAWA_LENGTH: fact("operator", "Okinawa margin: suggested length"),
  OKINAWA_FROM_TOKYO: fact("operator", "Okinawa margin: getting there from Tokyo"),
  OKINAWA_PRIVATE_BATH_COUNT: fact("operator", "Okinawa margin: properties with private bathing we use"),
  ALPS_BODY: fact("operator", "Hokuriku and the Japan Alps, 80–120 words, framed around altitude (D6)"),
  ALPS_BEST_WEEKS: fact("operator", "Japan Alps margin: best weeks"),
  ALPS_LENGTH: fact("operator", "Japan Alps margin: suggested length"),
  ALPS_FROM_TOKYO: fact("operator", "Japan Alps margin: getting there from Tokyo"),
  ALPS_PRIVATE_BATH_COUNT: fact("operator", "Japan Alps margin: properties with private bathing we use"),

  VENUE: fact("operator", "Experience: venue"),
  CITY: fact("operator", "Experience: city"),
  WHAT_HAPPENS: fact("operator", "Experience: what happens"),
  NAMED_PRACTITIONER: fact("operator", "Experience: named practitioner — a real name"),
  SEASON_OR_MONTHS: fact("operator", "Experience: season or months"),
  DURATION: fact("operator", "Experience: duration"),
  GROUP_LIMIT: fact("operator", "Experience: group limit"),

  BRAND: { ...fact("team", "Brand name (D1). Final written form, trademark and native checks still open — PROJECT-GUIDE §4."), value: "HalaJapan" },
  DOMAIN: fact("team", "Production domain (D13)"),
  DESK_ZONE: fact("team", "Desk reference time zone, IANA name (D3)"),
  DESK_HOURS: fact("team", "Desk hours in the reference zone (D3)"),
  ALPS_STATION: fact("team", "JMA station for the Japan Alps row of the season band (CL-05)"),

  PRIVATE_JAPAN_TITLE: copy("Page title for /private-japan — not defined in CONTENT.md"),
  EXPERIENCES_TITLE: copy("Page title for /experiences — not defined in CONTENT.md"),
  ABOUT_TITLE: copy("Page title for /about — not defined in CONTENT.md"),
  PRIVACY_TITLE: copy("Page title for /privacy — not defined in CONTENT.md"),
  TERMS_TITLE: copy("Page title for /terms — not defined in CONTENT.md"),
  MENU_LABEL: copy("Label of the mobile navigation button (DESIGN.md says \"Menu\") — not in CONTENT.md"),
  SKIP_LINK_LABEL: copy("Skip-to-content link text — not in CONTENT.md"),
};
