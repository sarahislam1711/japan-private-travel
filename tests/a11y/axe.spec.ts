import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { localePath, routes } from "../../content/routes";

/**
 * axe (WCAG 2.2 AA) on every public route in both languages, at desktop and
 * phone widths. A normal browser user agent, so the page runs as visitors see it.
 */
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

for (const route of routes) {
  for (const locale of ["en", "ar"] as const) {
    for (const width of [390, 1440]) {
      test(`${route.key} ${locale} @${width}`, async ({ browser }) => {
        const context = await browser.newContext({ viewport: { width, height: 900 }, userAgent: UA });
        const page = await context.newPage();
        await page.goto(encodeURI(localePath(route.key, locale)), { waitUntil: "networkidle" });
        // Bring every scroll reveal into its final state before checking colours.
        await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((el) => el.setAttribute("data-in", "instant")));
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
        const report = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length}× ${v.nodes[0]?.target.join(" ")}`);
        expect(report, report.join("\n")).toEqual([]);
        await context.close();
      });
    }
  }
}
