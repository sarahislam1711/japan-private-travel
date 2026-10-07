/* Contact (/contact) — docs/CONTENT.md §10. */
import { attachArabic, draft, locked, ph } from "../schema";
import { contactAr } from "./contact.ar";

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
  // The trip planner (Sarah, 7 Oct 2026): the Contact form as six steps. All DRAFT.
  planner: {
    steps: {
      who: draft("Who"),
      when: draft("When"),
      where: draft("Where"),
      needs: draft("The trip"),
      reply: draft("Reply"),
      review: draft("Your plan"),
    },
    questions: {
      who: draft("Who is coming?"),
      when: draft("When are you thinking of travelling?"),
      where: draft("Where would you like to go?"),
      needs: draft("What does the trip need to do?"),
    },
    hints: {
      who: draft("Everyone travelling, from grandparents to the youngest."),
      when: draft("Pick the months you are weighing. A rough idea is enough."),
      where: draft("Choose as many as you like, or let us suggest."),
      needs: draft("A celebration, a first visit, slower days for older travellers: whatever matters to you. Optional."),
      reply: draft("We reply in your language, by the route you choose."),
      review: draft("Check your plan, then send it to us."),
    },
    people: {
      adults: draft("Adults"),
      grandparents: draft("Grandparents"),
      children: draft("Children"),
      age: draft("Age"),
      under1: draft("Under 1"),
      add: draft("Add"),
      remove: draft("Remove"),
    },
    when: {
      notSure: draft("Not sure yet"),
      datesNote: draft("Anything else about dates? (optional)"),
    },
    where: {
      anywhere: draft("Elsewhere in Japan, any season"),
      suggest: draft("Not sure yet: suggest somewhere"),
    },
    buttons: {
      next: draft("Continue"),
      back: draft("Back"),
      edit: draft("Edit"),
      startOver: draft("Start again"),
      sendWhatsApp: draft("Send on WhatsApp"),
    },
    enquirySoon: draft("Sending by email opens soon. For now, send your plan on WhatsApp."),
    summary: {
      title: draft("Your plan so far"),
      empty: draft("Your answers appear here as you go."),
      travelling: draft("Travelling"),
      months: draft("Months"),
      places: draft("Places"),
    },
    whatsappIntro: draft("Hello, here is our trip plan:"),
    errors: {
      needTraveller: draft("Add at least one adult or grandparent."),
      needWhen: draft("Choose a month, or Not sure yet."),
      needName: draft("Please add your name."),
      needContact: draft("Please add a number or email so we can reply."),
    },
    saved: draft("Your answers stay on this device until you send them."),
  },
};

attachArabic(contact, contactAr);
