/* About (/about) — docs/CONTENT.md §8. Copy approved by Sarah, 8 Oct 2026. */
import { attachArabic, ja, locked, ph } from "../schema";
import { aboutAr } from "./about.ar";

export const about = {
  title: locked(["About ", ph("BRAND")]),
  intro: locked([ph("BRAND"), " is run by ", ph("ENTITY_NAME_EN"), ", founded in Tokyo on 23 September 2016, with offices in Tokyo and Osaka."]),
  keyFacts: [locked("Since 2016"), locked("Tokyo and Osaka"), locked(["Tokyo Governor Registration No. ", ph("REG_NUMBER")])],
  people: {
    heading: locked("The people"),
    director: {
      name: locked("Fathy Mohamed Mohamed Ismail Ahmed"),
      nameJa: locked("ファトヒー・モハメド・モハメド・イスマイル・アフメド", { lang: "ja" }),
      role: locked("Representative Director"),
      bio: locked(
        "A graduate of Cairo University's Japanese department, he worked as a Japanese-speaking guide in Egypt for more than twenty years before founding the company in Tokyo, where he is based.",
      ),
    },
    managersLabel: locked(["Licensed travel managers (", ja("総合旅行業務取扱管理者"), ")"]),
    managers: locked("Mariko Kajiwara and Takashi Mino"),
    managersNote: locked("Japan's Travel Agency Act requires a licensed manager at each office."),
  },
  registration: {
    heading: locked("How we are registered"),
    intro: locked("Japan licenses travel companies in tiers. This is exactly where we sit, and who stands behind your booking."),
    steps: [
      { title: locked("You"), text: locked("You plan your trip with us.") },
      {
        title: locked([ph("BRAND"), " · ", ph("ENTITY_NAME_EN")]),
        text: locked([
          "Travel Agency Agent, registered with the Governor of Tokyo, No. ",
          ph("REG_NUMBER"),
          " (",
          ja("東京都知事登録旅行業者代理業 第"),
          ph("REG_NUMBER"),
          ja("号"),
          "). We sell on behalf of one licensed travel company.",
        ]),
      },
      {
        title: locked(["Air World Co., Ltd. (", ja("エアーワールド株式会社"), ")"]),
        text: locked([
          "Registered Travel Agency No. 961 with the Commissioner of the Japan Tourism Agency (",
          ja("観光庁長官登録旅行業第961号"),
          "), and a full member of JATA, the Japan Association of Travel Agents. Air World organises and operates the trips we sell, and your travel contract is with Air World.",
        ]),
      },
    ],
    check: locked("You can check both registrations with the Tokyo Metropolitan Government and the Japan Tourism Agency.", { claims: ["CL-06"] }),
  },
  offices: {
    heading: locked("Offices"),
    list: [
      { name: locked("Tokyo (head office)"), address: locked([ph("ENTITY_ADDRESS")]), tel: "03-6432-9234", fax: "03-6432-9134" },
      { name: locked("Osaka"), address: locked([ph("OSAKA_ADDRESS")]), tel: "06-6585-0136", fax: "06-6585-0640" },
    ],
    telLabel: locked("Tel"),
    faxLabel: locked("Fax"),
    hours: locked("Monday to Friday, 10:00–17:00 Japan time. Closed at weekends and on public holidays."),
  },
  facts: {
    heading: locked("Company facts"),
    rows: [
      { label: locked("Company"), value: locked([ph("ENTITY_NAME_EN"), " (", ph("ENTITY_NAME_JA"), ")"]) },
      { label: locked("Founded"), value: locked("23 September 2016, Tokyo") },
      { label: locked("Capital"), value: locked("¥5,000,000") },
      { label: locked("Representative Director"), value: locked("Fathy Mohamed Mohamed Ismail Ahmed") },
      { label: locked("Licensed travel managers"), value: locked("Mariko Kajiwara, Takashi Mino") },
      { label: locked("Registration"), value: locked(["Governor of Tokyo, Travel Agency Agent No. ", ph("REG_NUMBER")]) },
      {
        label: locked("Principal travel company"),
        value: locked("Air World Co., Ltd., Japan Tourism Agency Registered Travel Agency No. 961 (JATA member)"),
      },
    ],
  },
  /** Labels for the legal block in the footer of every page. */
  footer: {
    entity: locked("Registered entity"),
    registration: locked("Registration"),
    tokyo: locked("Tokyo office"),
    osaka: locked("Osaka office"),
    managers: locked("Licensed travel managers"),
    principal: locked("Principal travel company"),
  },
};

attachArabic(about, aboutAr);
