/* Walks every content module and yields each Copy node with its location. */
import { mainNav, pages, notFoundPage, routes, site, ui } from "../../content/index";
import { CopySchema, isCopy, type Copy } from "../../content/schema";
import { placeholders } from "../../content/placeholders";

export type CopyLocation = { file: string; path: string; copy: Copy };

function* walk(value: unknown, file: string, path: string): Generator<CopyLocation> {
  if (isCopy(value)) {
    yield { file, path, copy: CopySchema.parse(value) };
    return;
  }
  if (Array.isArray(value)) {
    for (const [i, item] of value.entries()) yield* walk(item, file, `${path}[${i}]`);
    return;
  }
  if (typeof value === "object" && value !== null) {
    for (const [k, v] of Object.entries(value)) yield* walk(v, file, path ? `${path}.${k}` : k);
  }
}

export function allCopy(): CopyLocation[] {
  const found: CopyLocation[] = [...walk(site, "content/site.ts", "site"), ...walk(ui, "content/interface.ts", "ui"), ...walk(mainNav, "content/navigation.ts", "mainNav")];
  for (const route of routes) found.push(...walk(route, "content/routes.ts", `routes.${route.key}`));
  for (const [key, page] of Object.entries(pages)) found.push(...walk(page.content, page.file, key));
  found.push(...walk(notFoundPage.content, notFoundPage.file, "notFound"));
  return found;
}

/** Text with placeholders shown as [[KEY]] (or their value, once filled). */
export function flatten(copy: Copy): string {
  return copy.body
    .map((s) => {
      if (typeof s === "string") return s;
      if ("ph" in s) return placeholders[s.ph].value ?? `[[${s.ph}]]`;
      return s.text;
    })
    .join("");
}

export const at = (loc: CopyLocation) => `${loc.file} › ${loc.path}`;
