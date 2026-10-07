# COMPLIANCE.md — the guard

Strategy §7 says nothing ships until every line is resolved, and sets one test for every claim: *could a journalist disprove this in an afternoon?* This file turns that into rules that run in code.

The legal judgements here come from the strategy, not from Claude Code. The 行政書士 confirms items marked ⚖ before launch. The guard enforces what has been decided; it does not decide.

## How the guard runs

`scripts/guard/` has two layers:

1. **Source scan** — reads `/content`, `/src` and `/src/styles`. Fast; runs on every `pnpm guard`.
2. **Render crawl** — builds, starts the server, visits every route in `content/routes.ts` with Playwright, and checks the rendered HTML and visible text. This catches copy that reaches the page by any path.

Modes: `pnpm guard` reports errors and warnings and exits 0. `pnpm guard:prod` exits 1 on any error. Warnings require an entry in `content/approvals.ts` (rule ID, the exact string, reason, approver (the team member approving), date) — **Claude Code never writes to `approvals.ts`**; it proposes entries in the checkpoint report.

Output: a table per rule — rule ID, severity, route or file, the matched string, and the fix the rule expects.

## Rules

### C1 — Footer on every route ⚖ (Travel Agency Act Art. 12-7, 12-9)
**Error** if any route, including 404 and the advisor portal, lacks a footer containing all of: `tradeNameLine`, `entity.nameEn`, `entity.nameJa`, `entity.address`, `registration.lineJa`, and the name of each travel services manager (the About copy promises the manager "at the foot of every page").

### C2 — Trade-name line ⚖ (Art. 14-2, name-lending)
**Error** if `tradeNameLine` is missing or does not name the registered entity. The brand must read as a secondary trade name (副商号) of the licensed entity, never as a separate company.

### C3 — Banned claims (strategy §6, §7.6)
**Error** on any match, case-insensitive, in rendered text or content:

| Pattern | Why |
|---|---|
| `licensed (under\|by)` · `accredited by` · `certified by (JATA\|ANTA\|ETAA)` | Associations are memberships, not licensors — Art. 12-8 |
| `government[- ]licensed` · `licensed guide` · `certified guide` · `通訳案内士` (any form) | Title protection under the 通訳案内士法 |
| `exclusive access` · `private access` · `after[- ]hours` · `relationship (held\|since)` · `behind closed doors` | Purchasable access presented as relational — Art. 12-8 |
| `we have (operated\|been operating\|worked) since` · `(founded\|established) in \d{4}` applied to the company | Years of operation the entity may not have |
| `guarantee[ds]? (a )?female driver` · `female drivers? (on request\|available)` | Promise the business cannot confirm; 白タク exposure |
| `clients? (come\|travel) from` | Unverifiable client-city lists |
| `from (US)?\$\|from ¥\|per person\|pp\b\|packages? from` | No pricing language on public pages |

### C3a — Halal wording (review)
**Warning** where `halal` appears within 60 characters of `pork-free`, `kitchen`, `menu` or `friendly`. The LOCKED Family Services copy legitimately says "We do not describe a pork-free kitchen as halal", so this cannot be an automatic error — each occurrence needs an approval entry confirming it does not apply "halal" to anything uncertified.

### C4 — Superlatives (tone of voice)
**Warning** on: `best`, `finest`, `world-class`, `unparalleled`, `unrivalled`, `ultimate`, `exceptional`, `luxury`, `luxurious`, `bespoke`, `curated`, `unforgettable`, `seamless`, `once-in-a-lifetime`. Each occurrence needs an approval entry. (The LOCKED Summer Journeys copy will trigger this twice — DECISIONS D5.)

### C5 — Claims register
**Error** if any `{CL-nn}` referenced by rendered content lacks `sourceUrl`, `publisher` and `verifiedOn` in `content/claims.ts`, or if `verifiedOn` is more than 180 days old.

### C6 — Photography manifest
*Removed by Sarah, 7 Oct 2026.* Photos are listed in `content/photography.manifest.ts` for tidiness only; no photographer, licence, place or month is required, and stock images are allowed.

### C7 — Placeholders and drafts
**Error** in production if any `[[KEY]]` string, `<Placeholder>`, `<Draft>`, or content node with `status: "draft"` reaches a rendered page.

### C8 — Logical properties
**Error** on physical direction in CSS or class names: `margin-left|right`, `padding-left|right`, `left:`, `right:`, `text-align: left|right`, `float: left|right`, `border-left|right`, and Tailwind `ml- mr- pl- pr- left- right- text-left text-right float-left float-right rounded-l rounded-r border-l border-r` (with any modifier prefix).

### C9 — Routes and indexing
**Error** if the public route set differs from `content/routes.ts` (nine pages + privacy, terms). **Error** if `/advisors/portal/*` lacks `noindex, nofollow` or appears in the sitemap. **Error** if any public page is `noindex` in production.

### C10 — Third-party scripts
**Error** on any `<script src>` or `connect-src` outside: self, Plausible, Cloudflare Turnstile, Supabase project URL (portal only).

### C11 — Language attributes
**Error** if Japanese characters appear in an element whose nearest `lang` is not `ja`, or Arabic characters where the nearest `lang` is not `ar` with `dir="rtl"`.

### C12 — Contact routes
**Error** if Home or Contact lacks a working `wa.me` link, or if the WhatsApp number, phone or email differ between pages and footer.

## Arabic (added 7 Oct 2026)

The site is bilingual. The guard checks the Arabic as well as the English:
- **C7:** every string that needs Arabic must have it, and Arabic marked `ard` (draft) blocks production until a native reviewer approves it (`arl`).
- **C3, C3a, C4:** Arabic equivalents of the banned claims, the halal-proximity check and the superlatives run on the Arabic text. They are meaning-level mirrors of the English rules; the 行政書士 should confirm the Arabic patterns.
- **SYNC:** the Arabic in /content must match `docs/CONTENT.ar.md` (regenerate with `pnpm content:ar`).
- Approvals in `content/approvals.ts` match Arabic strings the same way as English.

## What the guard cannot check

Whether a claim is *true*. The guard proves a claim has a source and that the source was checked recently; a person must still read the source. It also cannot confirm the registration type fits what is sold (§7.1), that two managers are in post (§7.3), or that transport contracts are signed (§7.7). Those stay on the human launch checklist produced in Prompt 8.
