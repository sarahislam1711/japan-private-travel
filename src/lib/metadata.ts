import type { Metadata } from "next";
import { routeFor, type RouteKey } from "@content/routes";
import { copyText } from "./copy";

/**
 * Per-page metadata from content/routes.ts. Titles and descriptions are null
 * until written in Prompt 7; until then the route key shows as a dev marker
 * and the guard fails production (C7).
 */
export function pageMetadata(key: RouteKey): Metadata {
  const route = routeFor(key);
  return {
    title: route.meta.title ? copyText(route.meta.title) : `[[META_TITLE ${key}]]`,
    description: route.meta.description ? copyText(route.meta.description) : undefined,
    alternates: { canonical: route.path },
  };
}
