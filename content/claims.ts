/*
 * Claims register (docs/CONTENT.md §12). Every claim referenced by rendered
 * content needs sourceUrl, publisher and verifiedOn (ISO date, under 180 days
 * old) before production — COMPLIANCE C5. Never fill these without a real,
 * checked source.
 */
import { z } from "zod";
import { claimIds } from "./schema";

export const ClaimSchema = z.object({
  id: z.enum(claimIds),
  claim: z.string(),
  sourceStatus: z.string(),
  sourceUrl: z.url().nullable(),
  publisher: z.string().nullable(),
  verifiedOn: z.iso.date().nullable(),
});
export type Claim = z.infer<typeof ClaimSchema>;

const unsourced = { sourceUrl: null, publisher: null, verifiedOn: null };

export const claims: Claim[] = z.array(ClaimSchema).parse([
  {
    id: "CL-01",
    claim: "The UAE recognises three Japanese halal certifiers",
    sourceStatus:
      "Unsourced. Strategy cites ESMA; ESMA's functions moved to the Ministry of Industry and Advanced Technology in 2020 — verify against the current MoIAT list.",
    ...unsourced,
  },
  {
    id: "CL-02",
    claim: "Arabic is not one of the ten languages of the national interpreter-guide examination",
    sourceStatus: "JNTO / JTA exam pages — to attach",
    ...unsourced,
  },
  {
    id: "CL-03",
    claim: "Roughly 13,000 female professional drivers in Japan",
    sourceStatus: "Unsourced — needs a named statistic and year",
    ...unsourced,
  },
  {
    id: "CL-04",
    claim: "Mosques and prayer rooms concentrated in Tokyo, Osaka, Kyoto",
    sourceStatus: "JNTO Muslim-traveller resources — to attach",
    ...unsourced,
  },
  {
    id: "CL-05",
    claim: "Monthly mean maximum temperatures (Season band)",
    sourceStatus:
      "JMA 1991–2020 normals, monthly mean of daily maximum: Tokyo (block 47662) and Sapporo (block 47412, https://www.data.jma.go.jp/obd/stats/etrn/view/nml_sfc_ym.php?prec_no=14&block_no=47412). Alps station still to choose (D6).",
    sourceUrl: "https://www.data.jma.go.jp/obd/stats/etrn/view/nml_sfc_ym.php?prec_no=44&block_no=47662",
    publisher: "Japan Meteorological Agency",
    verifiedOn: "2026-10-10",
  },
  {
    id: "CL-06",
    claim: "Registration verifiable with the Japan Tourism Agency",
    sourceStatus: "Link to the registering authority's public register — to attach",
    ...unsourced,
  },
  {
    id: "CL-07",
    claim: "Japan has no national halal standard",
    sourceStatus: "To attach (MAFF / JNTO)",
    ...unsourced,
  },
]);
