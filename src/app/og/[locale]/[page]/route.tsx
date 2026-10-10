import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BRAND_HEX, STONE_ELLIPSES, splitBrand } from "@/lib/mark";
import { pageMeta } from "@content/meta";
import { home } from "@content/pages/home";
import { isLocale, routeKeys, type RouteKey } from "@content/routes";
import { site } from "@content/site";
import { copyText, isPublishable } from "@/lib/copy";

/**
 * Share image for a page in a language (1200×630): the page title on paper
 * beside a pine field, the brand and the registration statement. Production
 * shows only approved copy; anything unapproved falls back to the brand alone.
 */
export async function GET(_: Request, { params }: { params: Promise<{ locale: string; page: string }> }) {
  const { locale, page } = await params;
  if (!isLocale(locale) || !(routeKeys as readonly string[]).includes(page)) return new Response("Not found", { status: 404 });
  const key = page as RouteKey;
  const prod = process.env.NODE_ENV === "production";
  const text = (c: Parameters<typeof copyText>[0]) => (!prod || isPublishable(c, locale) ? copyText(c, locale) : null);

  const title = text(pageMeta[key].title);
  const statement = text(home.margin.statement);
  const brand = copyText(site.brand.name);
  const ar = locale === "ar";
  const fontDir = join(process.cwd(), "src/fonts/og");
  const [serif, arabic] = await Promise.all([readFile(join(fontDir, "source-serif-4-400.ttf")), readFile(join(fontDir, "markazi-text-500.ttf"))]);

  // The image renderer lays words out left to right; for Arabic, set each word in a
  // right-to-left flow so the sentence reads in order and wraps leftwards.
  const words = (value: string, size: number, lh: number, color = "#1A2230") =>
    ar ? (
      <div style={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", fontFamily: "Arabic", fontSize: size, lineHeight: lh, color, maxWidth: 640 }}>
        {value.split(/\s+/).map((w, i) => (
          <span key={i} style={{ marginLeft: size * 0.28 }}>
            {w}
          </span>
        ))}
      </div>
    ) : (
      <div style={{ display: "flex", fontFamily: "Serif", fontSize: size, lineHeight: lh, letterSpacing: size > 40 ? -1.2 : 0, color, maxWidth: 640 }}>{value}</div>
    );

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: ar ? "row-reverse" : "row", background: "#F1F2EE", color: "#1A2230" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", textAlign: ar ? "right" : "left", alignItems: ar ? "flex-end" : "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 14 }}>
            <svg width={44} height={44} viewBox="0 0 64 64">
              {STONE_ELLIPSES.map((e) => (
                <ellipse key={e.cx} {...e} fill={BRAND_HEX.pine} />
              ))}
            </svg>
            <div style={{ display: "flex", fontFamily: "Serif", fontSize: 36 }}>
              <span style={{ color: BRAND_HEX.pine }}>{splitBrand(brand)[0]}</span>
              <span>{splitBrand(brand)[1]}</span>
            </div>
          </div>
          {words(title ?? brand, ar ? 74 : 64, ar ? 1.3 : 1.08)}
          {statement ? words(statement, ar ? 30 : 24, 1.4, "#4A5462") : <div style={{ display: "flex" }} />}
        </div>
        <div style={{ width: 360, background: "#2C5F53", display: "flex" }} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Serif", data: serif, weight: 400, style: "normal" },
        { name: "Arabic", data: arabic, weight: 500, style: "normal" },
      ],
    },
  );
}
