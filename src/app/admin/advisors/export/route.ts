import { isSignedIn } from "@/lib/enquiries/admin-auth";
import { listAdvisorRequests } from "@/lib/enquiries/advisors";
import { formatDate } from "@/lib/enquiries/format";

export const dynamic = "force-dynamic";

/** Every advisor request as a CSV file (signed-in team only). */
export async function GET() {
  if (!(await isSignedIn())) return new Response("Not signed in", { status: 401 });
  const all = await listAdvisorRequests();
  const cell = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  const head = ["Received", "Status", "Agency", "Country", "Network", "Registration / IATA", "Name", "Email", "Team notes", "Site", "ID"];
  const lines = all.map((r) => [formatDate(r.createdAt), r.status, r.agency, r.country, r.network, r.registration, r.name, r.email, r.notes, r.locale, r.id].map(cell).join(","));
  return new Response("﻿" + [head.map(cell).join(","), ...lines].join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="halajapan-advisor-requests-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
