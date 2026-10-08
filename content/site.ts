/* Site-wide content — docs/CONTENT.md §1. */
import { attachArabic, draft, ja, locked, ph } from "./schema";
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
    // Corrected 8 Oct 2026: the company is a travel agency agent (旅行業者代理業), not a travel agency.
    lineJa: draft([ph("REG_AUTHORITY_JA"), "登録旅行業者代理業 第", ph("REG_NUMBER"), "号"], {
      lang: "ja",
    }),
    lineEn: draft(["Travel Agency Agent, registered with the Governor of Tokyo, No. ", ph("REG_NUMBER")]),
  },
  /** The licensed travel company the agent sells for; JATA membership is Air World's, not ours. */
  principal: locked(["Air World Co., Ltd. (", ja("観光庁長官登録旅行業第961号"), "), JATA member"]),
  // No closing full stop: the entity name ("Travel World Co., Ltd.") ends with one.
  tradeNameLine: draft([ph("BRAND"), " is a trading name of ", ph("ENTITY_NAME_EN")]),
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
