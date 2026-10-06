/* Screenshots of every route in content/routes.ts, plus the 404, at 390, 834 and 1440px. */
import { test } from "@playwright/test";
import { routes } from "../content/routes";

const widths = [390, 834, 1440];
const date = new Date().toISOString().slice(0, 10);
const targets = [
  ...routes.map((r) => ({ name: r.key, path: r.path })),
  { name: "not-found", path: "/this-page-does-not-exist" },
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
