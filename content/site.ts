/* Site-wide content — docs/CONTENT.md §1. */
import { attachArabic, draft, locked, ph } from "./schema";
import { siteAr } from "./site.ar";

export const site = {
  /** Production domain, apex form (no www). www redirects to it. */
  domain: locked([ph("DOMAIN")]),
  canonicalHost: "apex",
  brand: {
    name: locked([ph("BRAND")], { flags: ["D1"] }),
  },
  entity: {
    nameEn: locked([ph("ENTITY_NAME_EN")]),
    nameJa: locked([ph("ENTITY_NAME_JA")], { lang: "ja" }),
    address: locked([ph("ENTITY_ADDRESS")]),
    osakaAddress: locked([ph("OSAKA_ADDRESS")]),
  },
  registration: {
    lineJa: locked([ph("REG_AUTHORITY_JA"), "登録旅行業 第", ph("REG_NUMBER"), "号"], {
      lang: "ja",
    }),
    lineEn: draft([ph("REG_AUTHORITY_EN"), " Registered Travel Agency No. ", ph("REG_NUMBER")]),
  },
  tradeNameLine: draft([ph("BRAND"), " is a trading name of ", ph("ENTITY_NAME_EN"), "."]),
  memberships: [locked(["Member, ", ph("ASSOCIATION")])],
  managers: {
    tokyo: locked([ph("MANAGER_TOKYO")]),
    osaka: locked([ph("MANAGER_OSAKA")]),
  },
  whatsapp: {
    e164: locked([ph("WHATSAPP_E164")]),
    display: locked([ph("WHATSAPP_DISPLAY")]),
    prefill: draft("Hello, I would like to plan a trip to Japan for my family."),
  },
  phone: locked([ph("PHONE")]),
  email: locked([ph("EMAIL")]),
  desk: {
    /** False until the desk is staffed (D3). DeskStatus renders nothing while false. */
    enabled: false,
    zone: locked([ph("DESK_ZONE")], { flags: ["D3"] }),
    hours: locked([ph("DESK_HOURS")], { flags: ["D3"] }),
  },
} as const;

attachArabic(site, siteAr);
