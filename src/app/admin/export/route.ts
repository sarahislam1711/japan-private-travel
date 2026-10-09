import { isSignedIn } from "@/lib/enquiries/admin-auth";
import { formatDate, languageLabel, replyLabel, statusLabel, travellers, when, where } from "@/lib/enquiries/format";
import { enquiryStore } from "@/lib/enquiries/store";

export const dynamic = "force-dynamic";

/** Every plan as a CSV file for a spreadsheet (signed-in team only). */
export async function GET() {
  if (!(await isSignedIn())) return new Response("Not signed in", { status: 401 });
  const all = await enquiryStore().list();
  const cell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const head = ["Received", "Status", "Name", "Reply by", "Contact", "Reply in", "Travelling", "When", "Where", "Needs", "Team notes", "Site", "ID"];
  const lines = all.map((e) =>
    [formatDate(e.createdAt), statusLabel[e.status], e.name, replyLabel[e.reply], e.contact, languageLabel[e.language], travellers(e), when(e), where(e), e.needs, e.notes, e.locale, e.id]
      .map(cell)
      .join(","),
  );
  const csv = "﻿" + [head.map(cell).join(","), ...lines].join("\r\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="halajapan-plans-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
