/* Contact (/contact) — docs/CONTENT.md §10. */
import { draft, locked, ph } from "../schema";

export const contact = {
  title: locked("Tell us the household, the dates you are weighing, and what the trip needs to do.", {
    flags: ["D3"],
  }),
  routes: [
    locked(
      ["WhatsApp: ", ph("WHATSAPP_DISPLAY"), " — answered in Arabic or English, within two hours during Japan business hours."],
      { flags: ["D3"] },
    ),
    locked(["Telephone: ", ph("PHONE")], { flags: ["D3"] }),
    locked(["Email: ", ph("EMAIL")], { flags: ["D3"] }),
  ],
  formIntro: locked(
    "Or use the form: who is travelling (and ages), dates you are considering, language preference.",
    { flags: ["D3"] },
  ),
  arabicLine: draft("يسعدنا التواصل معكم باللغة العربية عبر واتساب.", { lang: "ar", flags: ["D10"] }),
  form: {
    // Field labels are not marked LOCKED in CONTENT.md, so they are draft.
    fields: {
      name: draft("Your name"),
      replyChannel: draft("How should we reply?"),
      replyChannelOptions: [draft("WhatsApp"), draft("Email"), draft("Telephone")],
      phone: draft("WhatsApp or telephone number"),
      email: draft("Email"),
      household: draft("Who is travelling, and their ages"),
      dates: draft("Dates you are considering"),
      purpose: draft("What the trip needs to do"),
      replyLanguage: draft("Language for our reply"),
      replyLanguageOptions: [draft("Arabic"), draft("English"), draft("Japanese")],
    },
    submit: draft("Send enquiry"),
    confirmation: draft("Enquiry received. We will reply in the language you chose, by the route you chose."),
    privacyLine: draft("We use these details only to reply to you and plan your trip. See our privacy notice."),
  },
};
