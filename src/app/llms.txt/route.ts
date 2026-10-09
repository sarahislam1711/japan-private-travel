import { isIndexable } from "@/lib/indexing";
import { buildLlms } from "@/lib/llms";

/** /llms.txt: the curated short brief for AI assistants (see src/lib/llms.ts). */
export function GET() {
  return new Response(buildLlms(false), {
    headers: { "content-type": "text/plain; charset=utf-8", ...(isIndexable() ? {} : { "x-robots-tag": "noindex, nofollow" }) },
  });
}
