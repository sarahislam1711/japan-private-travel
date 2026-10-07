/* Screenshots of every route in content/routes.ts in both languages, plus the 404s, at 390, 834 and 1440px. */
import { test } from "@playwright/test";
import { localePath, routes } from "../content/routes";

const widths = [390, 834, 1440];
const date = new Date().toISOString().slice(0, 10);
// Every route in English and Arabic, plus each language's 404.
const targets = [
  ...routes.flatMap((r) => [
    { name: r.key, path: localePath(r.key, "en") },
    { name: `${r.key}-ar`, path: encodeURI(localePath(r.key, "ar")) },
  ]),
  { name: "not-found", path: "/this-page-does-not-exist" },
  { name: "not-found-ar", path: "/ar/this-page-does-not-exist" },
];

for (const { name, path } of targets) {
  for (const width of widths) {
    test(`${name} @${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `tests/shots/${date}/${name}-${width}.png`, fullPage: true });
    });
  }
}
