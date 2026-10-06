import { canonicalDomain } from "./site-url";

/**
 * Search engines may index the site only on the Vercel production deployment
 * of the real domain. Previews, local builds and any build before [[DOMAIN]]
 * is set are noindex, so unfinished pages never reach a search index.
 */
export function isIndexable(): boolean {
  return process.env.VERCEL_ENV === "production" && canonicalDomain() !== null;
}
