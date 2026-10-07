/*
 * Downloads the site's fonts from Google Fonts into src/fonts/ for self-hosting
 * with next/font/local, so builds never depend on Google being reachable.
 *
 *   pnpm fonts
 *
 * Latin and Arabic faces keep only the subsets the site uses. Noto Serif JP is
 * cut to exactly the Japanese characters found in /content (place names, the
 * registration line, legal terms), so re-run this whenever Japanese text or a
 * Japanese placeholder value changes.
 */
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
const mkdir = (d) => mkdirSync(d, { recursive: true });
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "src/fonts");
mkdirSync(out, { recursive: true });
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36";

function contentFiles(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? contentFiles(p) : p.endsWith(".ts") ? [p] : [];
  });
}

// Every CJK character used anywhere in /content, plus the registration line's fixed characters.
const cjk = /[　-ヿ㐀-鿿＀-￯]/g;
const chars = new Set(["登", "録", "旅", "行", "業", "第", "号"]);
for (const f of contentFiles(join(root, "content"))) for (const c of readFileSync(f, "utf8").match(cjk) ?? []) chars.add(c);
const japaneseText = [...chars].sort().join("");

const families = [
  { file: "source-serif-4", query: "family=Source+Serif+4:opsz,wght@8..60,200..900", subsets: ["latin", "latin-ext"] },
  { file: "biz-udpgothic-400", query: "family=BIZ+UDPGothic:wght@400", subsets: ["latin", "latin-ext"] },
  { file: "biz-udpgothic-700", query: "family=BIZ+UDPGothic:wght@700", subsets: ["latin", "latin-ext"] },
  { file: "markazi-text", query: "family=Markazi+Text:wght@400..700", subsets: ["arabic"] },
  { file: "noto-kufi-arabic", query: "family=Noto+Kufi+Arabic:wght@100..900", subsets: ["arabic"] },
  { file: "noto-serif-jp", query: `family=Noto+Serif+JP:wght@400&text=${encodeURIComponent(japaneseText)}`, subsets: null },
];

for (const fam of families) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?${fam.query}&display=swap`, { headers: { "User-Agent": UA } })).text();
  // Blocks look like: /* latin */ @font-face { ... src: url(...) format('woff2'); ... }
  const blocks = [...css.matchAll(/(?:\/\*\s*([\w-]+)\s*\*\/\s*)?@font-face\s*\{([^}]*)\}/g)];
  let n = 0;
  for (const [, subset, body] of blocks) {
    if (fam.subsets && !fam.subsets.includes(subset)) continue;
    const url = body.match(/url\(([^)]+)\)/)?.[1];
    if (!url) continue;
    const name = fam.subsets ? `${fam.file}-${subset}.woff2` : `${fam.file}.woff2`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${name}: ${res.status}`);
    writeFileSync(join(out, name), Buffer.from(await res.arrayBuffer()));
    console.log(`  ${name}  ${(statSync(join(out, name)).size / 1024).toFixed(0)} KB`);
    n++;
  }
  if (!n) throw new Error(`No files for ${fam.file}`);
}
// Share images (next/og) need TrueType, static weights: requested without a browser user agent.
mkdir(join(out, "og"));
for (const [file, query] of [
  ["source-serif-4-400.ttf", "family=Source+Serif+4:wght@400"],
  ["markazi-text-500.ttf", "family=Markazi+Text:wght@500"],
]) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?${query}`)).text();
  const url = css.match(/url\(([^)]+\.ttf)\)/)?.[1];
  if (!url) throw new Error(`No TTF for ${file}`);
  writeFileSync(join(out, "og", file), Buffer.from(await (await fetch(url)).arrayBuffer()));
  console.log(`  og/${file}  ${(statSync(join(out, "og", file)).size / 1024).toFixed(0)} KB`);
}
console.log(`Japanese subset: ${chars.size} characters`);
