import { brandMark } from "@/lib/brand-mark";

/** The square logo for structured data and search results (512 px, the app icon artwork). */
export function GET() {
  return brandMark(512, 0);
}
