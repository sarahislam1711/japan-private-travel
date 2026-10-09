# CLAUDE.md — HalaJapan website

## What this project is

A nine-page English website for a registered Japanese travel agency (offices in Tokyo and Osaka) that plans private travel for families and small groups who travel as a household. The lead product is summer in Hokkaido, Okinawa and the Japan Alps.

The site is a **credential asset, not an acquisition engine**. Its job is to survive a travel advisor's or family office's anonymous due diligence and keep the business on their shortlist. It is not built for SEO breadth, conversion funnels or form-fill volume. Judge every decision against that.

Before any work in a session, read: `docs/PLAN.md` (where the build stands), `docs/SEO.md` (crawl and index setup to keep intact), `docs/PROJECT-GUIDE.md`, `docs/DECISIONS.md`, `docs/DESIGN.md` (and `docs/DESIGN-BRIEF.md`, the designer's brief; DESIGN.md wins where they differ), `docs/CONTENT.md`, `docs/COMPLIANCE.md`, and the current step in `docs/PROMPTS.md`.

## Non-negotiable rules

1. **Copy goes through `docs/CONTENT.md` and Sarah's approval.** Every visible string comes from `/content`, which mirrors `docs/CONTENT.md`. Claude Code may draft new or missing copy into `docs/CONTENT.md`, always marked DRAFT, and present it for approval. LOCKED copy changes only when Sarah approves that specific rewrite; never mark anything LOCKED yourself. If a string has no draft yet, render `<Placeholder name="…" />`. Drafts never state a fact that is not supplied (rule 2).
1a. **The site is bilingual, English and Arabic, from the start.** English lives at the root (`/summer-journeys`); Arabic under `/ar/` with Arabic-script slugs (`routes.ts` `arSlug`). Every Copy node in `/content` has its Arabic in the module's `.ar.ts` mirror (`ard` = draft, `arl` = approved by a native reviewer); regenerate `docs/CONTENT.ar.md` with `pnpm content:ar` after any Arabic change. Never fall back to English on an Arabic page. Never redirect by browser language or location. Every page carries reciprocal hreflang (en, ar, x-default → English) and a self-referencing canonical; links are built with `href()` / `localePath()`, never hard-coded paths.
2. **Never invent facts.** No numbers, names, dates, temperatures, venues, practitioners, registration details, flight times, addresses or phone numbers. Unknown values are `[[KEY]]` placeholders defined in `content/placeholders.ts`.
3. **The compliance guard is law.** `pnpm guard:prod` must pass for a production build. Never weaken a rule, add an allowlist entry, or skip the guard to get a build through. If it fails, report which rule and why.
4. **Photography.** Images live in `public/photos/`, are listed in `content/photography.manifest.ts` (id, file, alt; credit, place and month optional), and are placed through `content/photography.slots.ts` (the earlier photographer/licence/place/month and no-stock rule was removed by Sarah, 7 Oct 2026).
5. **CSS logical properties only.** No `left`/`right`/`margin-left`/`padding-right` and no Tailwind `ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`, `text-left`, `text-right`, `float-left/right`, `rounded-l/r-`, `border-l/r-`. Use `ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`, `text-end`. A future Arabic set depends on this.
6. **British English** in anything you do author: code comments, alt-text drafts, commit messages, error messages.
7. **Checkpoints are hard stops.** At the end of each prompt, stop and report in the format below. Do not start the next step unprompted.
8. **Verify renders, not just types.** After any UI change, run `pnpm shots` and look at the screenshots yourself before reporting. A passing type-check is not evidence that a page looks right.
9. **No new dependency** without naming it and giving the reason in the checkpoint report.

## Stack (decided — do not substitute)

- **Next.js**, latest stable, App Router, TypeScript `strict: true`, React Server Components by default; client components only where interaction requires it.
- **Tailwind CSS v4**, tokens defined once in `src/styles/tokens.css` via `@theme` (values in `docs/DESIGN.md`). No component library, no icon library.
- **Fonts** via `next/font/google` (changed 6 Oct 2026 with the Registration Plate redesign): self-hosted from `src/fonts` via `next/font/local` (`pnpm fonts` downloads them; re-run when Japanese text changes, as Noto Serif JP is cut to the characters used): `Source Serif 4` (variable, `opsz`, upright) for Latin text; `BIZ UDPGothic` (400, 700) for labels; `Noto Serif JP` (400) for Japanese; `Markazi Text` for Arabic text; `Noto Kufi Arabic` for Arabic labels. Nothing else at launch.
- **Content**: typed TypeScript modules in `/content`. No CMS at launch — every copy change must pass through a reviewable diff because copy carries legal exposure under the Travel Agency Act.
- **Supabase**, project region `ap-northeast-1` (Tokyo): `enquiries`, `advisor_requests`, `advisors`, `rate_downloads` tables; private storage bucket `rates`. RLS enabled on every table, no anon policies.
- **Resend** for enquiry notification email. **Cloudflare Turnstile** on both forms.
- **Plausible** analytics (cookieless). No other third-party script. No cookie banner required while this holds.
- **Vercel** hosting, function region `hnd1`.
- **Playwright** for e2e and screenshots, **@axe-core/playwright** for accessibility, **Lighthouse CI** for budgets.
- **zod** for all input validation. **pnpm** as package manager.

## Repo layout

```
/content                 all copy, placeholders, claims register, photo manifest, site config
/docs                    strategy-derived specs (read-only unless told otherwise)
/scripts/guard           compliance guard (source scan + rendered-HTML crawl)
/src/app/(site)          the nine public pages + utility pages
/src/app/advisors/portal gated rate portal (noindex)
/src/components          one component per file, named exports
/src/lib                 supabase clients, analytics, desk hours, formatting
/src/styles              tokens.css, globals.css
/supabase/migrations     SQL migrations incl. RLS
/tests                   playwright specs, a11y specs, screenshot specs
```

## Commands

| Command | Does |
|---|---|
| `pnpm dev` | Local dev. Pages read clean: no DRAFT tags (Sarah, 7 Oct 2026); missing facts show as `[[KEY]]`. |
| `pnpm dev:drafts` | Local dev with DRAFT tags and placeholder outlines visible, for reviewing copy. |
| `pnpm build` | Runs `guard:prod` first, then `next build`. |
| `pnpm guard` | Guard in warning mode (dev). |
| `pnpm guard:prod` | Guard in failing mode. |
| `pnpm test` | Playwright e2e. |
| `pnpm test:a11y` | axe on every route. |
| `/admin` | Team area for trip plans sent from the planner (sign-in with ADMIN_PASSWORD; never indexed). |
| `pnpm shots` | Screenshots of every route at 390, 834 and 1440px widths into `/tests/shots/<date>/`. |

## Checkpoint report format

```
## Checkpoint — Prompt N
Done: (bullets, one line each)
Files changed: (list)
Screenshots: (paths — and one line on what you saw that you are not happy with)
Guard: (pnpm guard output summary: errors / warnings by rule ID)
Tests: (pass/fail counts)
New dependencies: (name — reason) or none
Copy problems noticed: (quote the string, say what is wrong; do not fix)
Questions for the team: (numbered, or none)
```

## Commits

Small and single-purpose, conventional prefixes (`feat:`, `fix:`, `style:`, `chore:`, `test:`, `content:`). `content:` commits only ever sync `/content` to `docs/CONTENT.md`.
