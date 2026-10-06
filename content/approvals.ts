/*
 * Approvals for guard warnings (COMPLIANCE.md: C3a, C4).
 *
 * CLAUDE CODE MUST NEVER WRITE ENTRIES IN THIS FILE.
 * Claude Code proposes entries in its checkpoint report; only a team member adds them.
 */
import { z } from "zod";

export const ApprovalSchema = z.object({
  rule: z.enum(["C3a", "C4"]),
  /** The exact string the guard matched. */
  string: z.string(),
  reason: z.string(),
  /** The team member approving, by name. */
  approver: z.string().trim().min(1),
  date: z.iso.date(),
});
export type Approval = z.infer<typeof ApprovalSchema>;

export const approvals: Approval[] = z.array(ApprovalSchema).parse([]);
