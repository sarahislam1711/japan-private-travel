import { contact } from "@content/pages/contact";
import { summerJourneys } from "@content/pages/summer-journeys";
import { copyText } from "@/lib/copy";
import type { Enquiry, Status } from "./schema";

/** Plain English summaries of a plan, for the admin area and the CSV export. */
const months = Array.from({ length: 12 }, (_, m) => new Intl.DateTimeFormat("en-GB", { month: "long" }).format(new Date(2026, m, 1)));

export const statusLabel: Record<Status, string> = {
  new: "New",
  in_progress: "In progress",
  quoted: "Quoted",
  booked: "Booked",
  closed: "Closed",
};

export const placeLabel = (id: string) => {
  const m = id.match(/^summer-(\d)$/);
  if (m) return copyText(summerJourneys.regions[Number(m[1])].heading);
  if (id === "anywhere") return copyText(contact.planner.where.anywhere);
  if (id === "suggest") return copyText(contact.planner.where.suggest);
  return id;
};

export const languageLabel = { ar: "Arabic", en: "English", ja: "Japanese" } as const;
export const replyLabel = { whatsapp: "WhatsApp", email: "Email", phone: "Telephone" } as const;

export const travellers = (e: Enquiry) =>
  [
    e.adults ? `${e.adults} adult${e.adults === 1 ? "" : "s"}` : "",
    e.grandparents ? `${e.grandparents} grandparent${e.grandparents === 1 ? "" : "s"}` : "",
    e.childAges.length ? `${e.childAges.length} child${e.childAges.length === 1 ? "" : "ren"} (${e.childAges.map((a) => (a === 0 ? "under 1" : a)).join(", ")})` : "",
  ]
    .filter(Boolean)
    .join(", ");

export const total = (e: Enquiry) => e.adults + e.grandparents + e.childAges.length;

export const when = (e: Enquiry) =>
  [e.notSure ? "Not sure yet" : e.months.toSorted((a, b) => a - b).map((m) => months[m]).join(", "), e.datesNote].filter(Boolean).join(" · ");

export const where = (e: Enquiry) => e.places.map(placeLabel).join(", ");

export const replyHref = (e: Enquiry) => {
  const digits = e.contact.replace(/[^\d+]/g, "");
  if (e.reply === "email") return `mailto:${e.contact}`;
  if (e.reply === "whatsapp") return `https://wa.me/${digits.replace(/^\+/, "")}`;
  return `tel:${digits}`;
};

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Tokyo" }).format(new Date(iso)) + " JST";
