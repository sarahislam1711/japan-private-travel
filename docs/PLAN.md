# PLAN.md — how we get from here to a working site

Goal: a fully functioning HalaJapan website with clear copy and positioning, a finished design, and a site structure where every page leads to the next step.

Agreed 6 Oct 2026:
- **Style:** soften the Registration Plate world. Keep the cool palette and "claims sit beside their proof"; use the framed plate only as a signature (Home, About, footer). Elsewhere: more space, fewer rules, freer layouts.
- **Copy:** Claude drafts DRAFT and missing copy into `docs/CONTENT.md`; Sarah approves. LOCKED copy changes only with Sarah's approval of a specific rewrite. Facts are never invented.
- **Order:** Home first; Sarah picks each page after that.
- **Repo:** every finished step is committed and pushed to `sarahislam1711/japan-private-travel` (private).

## Phase 0 — Reset the foundations
- [x] Soften the visual system on `/styleguide` (tokens, spacing, rules, type) and review it together.
- [x] Apply the finish-review fixes that still apply: grid alignment, Japanese line breaking, margin-note link label, header advisor link weight, font fallback.
- [x] Decide the footer: built as the framed plate on a tinted section (Sarah to confirm; the dark band can come back).
- [x] Replace `docs/DESIGN.md` with the new system; update the font line in `CLAUDE.md`.

## Phase 1 — Positioning and structure
- [ ] `docs/POSITIONING.md`: one positioning line, three or four proof points, the message for advisors and for families, voice rules.
- [ ] Sitemap and flow: each page's job, reader, questions it answers, and its one next step. Settle the ninth page.
- [ ] Resolve the copy decisions: D2 ("no resellers"), D3 (desk hours), D5 (superlatives).

## Phase 2 — The shared shell
- [ ] Header, mobile menu, skip link.
- [ ] Footer with the legal block (COMPLIANCE C1, C2) on every route.
- [ ] Shared components: margin note, buttons, form fields, photo frame, 404.

## Phase 3 — Pages, one at a time
Each page: brief → copy drafted in `CONTENT.md` → Sarah approves → build → screenshots at 390 / 834 / 1440 and `pnpm guard` → Sarah reviews → commit and push.

- [ ] Home
- [ ] (next page chosen by Sarah)
- [ ] Summer Journeys
- [ ] Family Services
- [ ] About
- [ ] Contact
- [ ] Private Japan
- [ ] Experiences
- [ ] For travel advisors
- [ ] Privacy, Terms, 404

## Phase 4 — Make it work
- [ ] Enquiry form: Supabase (Tokyo), Resend notification, Turnstile, rate limit.
- [ ] Advisor request form and rate portal (off until enabled).
- [ ] Plausible analytics.
Needs accounts (DECISIONS D13); built against test stand-ins until then.

## Phase 5 — Launch-ready without the domain
- [ ] Page titles, share images, structured data.
- [ ] Accessibility (WCAG 2.2 AA) and performance budgets.
- [ ] Vercel preview on a `*.vercel.app` URL (noindex) to share for review.
- [ ] Connect the real domain when available; launch report and guard clear.

## Always
- No invented facts: unknown values stay `[[KEY]]` placeholders until supplied.
- `pnpm guard:prod` must pass before production; failing in development is expected.
