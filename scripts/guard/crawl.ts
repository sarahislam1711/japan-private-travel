/*
 * Render-crawl layer. TODO (Prompt 8): build, start the server, visit every
 * route in content/routes.ts plus the 404 and the portal with Playwright, and
 * check rendered HTML and visible text for C1, C3–C7 and C9–C12.
 */
import type { Finding } from "./types";

export async function crawl(): Promise<{ ran: boolean; findings: Finding[] }> {
  return { ran: false, findings: [] };
}
