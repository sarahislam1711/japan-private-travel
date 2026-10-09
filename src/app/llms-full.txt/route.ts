import { isIndexable } from "@/lib/indexing";
import { buildLlms } from "@/lib/llms";

/** /llms-full.txt: the longer brief, with the regions, the FAQ and the company facts. */
export function GET() {
  return new Response(buildLlms(true), {
    headers: { "content-type": "text/plain; charset=utf-8", ...(isIndexable() ? {} : { "x-robots-tag": "noindex, nofollow" }) },
  });
}
