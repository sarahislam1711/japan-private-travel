/* About (/about) — docs/CONTENT.md §8. */
import { attachArabic, draft, ja, locked, missing, ph } from "../schema";
import { aboutAr } from "./about.ar";

export const about = {
  title: missing("ABOUT_TITLE"),
  whoWeAre: {
    heading: draft("Who we are"),
    paragraphs: [
      locked(
        "We are a registered Japanese travel agency working from Tokyo and Osaka. Our registration and the name of our certified travel services manager appear at the foot of every page — you can verify both with the Japan Tourism Agency.",
      ),
      locked(
        "The company is led by an Egyptian founder who works in Japanese, alongside a team that covers Arabic, Japanese and English as first languages. Client conversations happen in the client's own language, without an interpreter in the middle.",
      ),
      locked("Our work is enquiry-only. Most of what we arrange, we arrange once."),
    ],
  },
  credentials: {
    heading: draft("Credentials"),
    // Registration, entity and office values render from site.ts.
    rows: [
      { label: locked("Registration") },
      { label: locked("Registering authority"), value: locked([ph("REG_AUTHORITY_EN")]) },
      { label: locked("Registered entity") },
      { label: locked("Tokyo office") },
      { label: locked("Osaka office") },
      {
        label: locked("Travel services manager, Tokyo"),
        value: locked([ph("MANAGER_TOKYO"), ", ", ja("旅行業務取扱管理者"), " (", ph("MANAGER_TOKYO_GRADE"), ")"]),
      },
      {
        label: locked("Travel services manager, Osaka"),
        value: locked([ph("MANAGER_OSAKA"), ", ", ja("旅行業務取扱管理者"), " (", ph("MANAGER_OSAKA_GRADE"), ")"]),
      },
      { label: locked("Memberships") },
      {
        label: locked("Public liability insurance"),
        value: locked([ph("INSURER"), ", cover ", ph("COVER_LEVEL")]),
      },
      {
        label: locked("Languages"),
        value: locked(["Arabic, English, Japanese — ", ph("LANGUAGE_STAFF_NOTE")]),
      },
      {
        label: locked("How we quote"),
        value: locked("Net supplier rates plus a stated service margin."),
      },
      {
        label: locked("Founder"),
        value: locked(["Our founder has worked in Japanese inbound travel since ", ph("FOUNDER_YEAR"), "."]),
      },
    ],
  },
  sources: {
    heading: draft("Sources"),
  },
};

attachArabic(about, aboutAr);
