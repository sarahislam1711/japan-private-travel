/* Family Services (/family-services) — docs/CONTENT.md §6. All copy LOCKED. */
import { draft, ja, locked } from "../schema";

export const familyServices = {
  title: locked("For Muslim families"),
  intro: locked("We build these into the itinerary from the first draft, not as requests added later."),
  sections: [
    {
      lead: locked("Dining."),
      body: locked(
        "Japan has no national halal standard — certification is issued by private bodies, and the certifier matters: the UAE recognises three Japanese certifiers, and Saudi recognition is narrower still. We tell you which certification a restaurant holds and whether your authority recognises it. Where it does not, we arrange a private chef or a kitchen briefed to cook without alcohol-based seasoning — mirin, cooking sake and most commercial soy sauces — and we say plainly which of the two we have arranged. We do not describe a pork-free kitchen as halal.",
        { claims: ["CL-01", "CL-07"] },
      ),
    },
    {
      lead: locked("Bathing."),
      body: locked(
        [
          "Communal bathing is the norm in Japan. We book only properties with private bathing — ",
          ja("貸切風呂"),
          " or rooms with their own bath — and we confirm the specific room, not the room category. At the luxury tier this narrows the property list considerably, and in Kyoto it narrows it to a handful. We will tell you which properties are available for your dates before you commit.",
        ],
        { flags: ["D5"] },
      ),
    },
    {
      lead: locked("Prayer."),
      body: locked(
        "Prayer times shape the day's pacing rather than interrupting it. Mosques and prayer rooms are concentrated in Tokyo, Osaka and Kyoto, and are limited outside them, so we provide prayer space in the vehicle and at the hotel when the itinerary goes regional.",
        { claims: ["CL-04"] },
      ),
    },
    {
      lead: locked("Guiding."),
      body: locked(
        "We provide guides who work in Arabic, and female guides where requested. Japan has no Arabic guide credential — Arabic is not one of the ten languages of the national interpreter-guide examination — so ours are people we have recruited, trained and worked with ourselves. We will name your guide before you travel.",
        { claims: ["CL-02"] },
      ),
      margin: draft(
        "National interpreter-guide examination languages: ten. Arabic is not among them.",
        { claims: ["CL-02"] },
      ),
    },
    {
      lead: locked("Transport."),
      body: locked(
        "Private vehicles with professional drivers, arranged through a licensed hire operator. Where a female driver is requested we will say honestly whether one is available for your dates: there are roughly 13,000 female professional drivers in all of Japan, and we will not promise what we cannot confirm.",
        { claims: ["CL-03"] },
      ),
    },
  ],
};
