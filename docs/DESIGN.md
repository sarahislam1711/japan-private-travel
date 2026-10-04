# DESIGN.md — design system

## 1. Concept: the margin carries the proof

The strategy says *assert less, show more* and *every specific claim must be independently verifiable*. The design makes that literal.

Every page is set as a main column and a margin. **The main column says; the margin proves.** The margin holds the registration number, the named guide policy, the lead time for an experience, the month a photograph was taken, the source of a number. A buyer doing due diligence can read the margin alone and find what they need.

This is the one bold idea. Everything else — colour, motion, ornament — stays quiet so that it reads.

Two consequences:

1. **The site looks finished without photography.** The summer photography cannot be shot until July 2027 (see DECISIONS.md, D7). The type and the margin system carry the design; photographs are an enhancement when they arrive, not a dependency.
2. **Nothing is decorative.** No eyebrow labels, no numbered markers (nothing on this site is a sequence), no icons, no cards, no gradients, no dividers that do not separate different kinds of information.

## 2. Colour

Cool, not warm. The product is Japan in its cool season; the palette is taken from summer in the north — pale paper, indigo ink, conifer green. A deliberate step away from the cream-and-terracotta luxury default.

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--paper` | `#F1F2EE` | Page background | — |
| `--snow` | `#FAFAF8` | Form fields, the portal surface | — |
| `--ink` | `#1A2230` | Text, the one solid button, footer background | 14.2:1 on paper |
| `--ink-soft` | `#4A5462` | Margin notes, captions, secondary text | 6.8:1 on paper |
| `--mist` | `#DADDD8` | Rules between information types, empty Plate fill | non-text only |
| `--pine` | `#2C5F53` | **The single accent.** Link hover, focus ring, the marked months in the season band. Nothing else. | 6.5:1 on paper |
| `--stone` | `#6B7480` | Placeholder/DRAFT outlines in dev only. **Never text.** | 4.2:1 — fails for text |

Footer inverts: `--paper` text on `--ink`. One light theme only; no dark mode (a deliberate choice, not an omission).

## 3. Typography

Two families, clearly distinct roles.

- **Newsreader** (variable, optical size axis) — all reading text and all headings. Its optical sizing gives a fine, high-contrast display cut at large sizes and a sturdy text cut at body size from one family, which is why it was chosen over a separate display face.
- **Zen Kaku Gothic New** — margin notes, captions, navigation, form labels, the footer, and all Japanese text (registration line, vertical place names). It covers Latin and Japanese in one design, so the footer's mixed-script legal line sits in one voice.

Reserved for Phase 2, not loaded now: **Shippori Mincho** (Japanese display), **Markazi Text** (Arabic). The wordmark must be tested in both before the name is locked (DECISIONS D1).

### Scale (major third, 1.25; base 18px)

| Token | Size | Family / settings | Use |
|---|---|---|---|
| `--t-display` | `clamp(2.75rem, 5.2vw + 1rem, 5.25rem)` | Newsreader 300, `opsz` 72, tracking −0.015em, leading 1.05 | Home hero headline only |
| `--t-h1` | `clamp(2.2rem, 3vw + 1rem, 3.45rem)` | Newsreader 350, `opsz` 60, leading 1.1 | Page titles |
| `--t-h2` | `1.95rem` | Newsreader 400, `opsz` 36, leading 1.2 | Section heads |
| `--t-h3` | `1.4rem` | Newsreader 500, `opsz` 24, leading 1.3 | Sub-heads, experience titles |
| `--t-body` | `1.125rem` | Newsreader 400, `opsz` auto, leading 1.65 | Main column |
| `--t-lede` | `1.4rem` | Newsreader 350, leading 1.5 | First paragraph under a page title |
| `--t-note` | `0.9375rem` | Zen Kaku Gothic New 400, leading 1.6 | Margin notes, form labels, nav |
| `--t-small` | `0.8125rem` | Zen Kaku Gothic New 400, leading 1.55 | Captions, footer legal text |

Rules:
- Sentence case everywhere. **No all-caps**, no letter-spaced labels, no small caps.
- No single-word emphasis in headings (no italic or coloured word).
- Main column measure: `max-width: 34rem` (≈ 64 characters at body size). Margin notes: `max-width: 15rem`.
- Numerals: `font-variant-numeric: oldstyle-nums proportional-nums` in body; `lining-nums tabular-nums` in the credentials list, the season band and anything tabular.
- Japanese text always carries `lang="ja"`. Arabic (Contact page, one line — DECISIONS D10) carries `lang="ar" dir="rtl"`.
- `text-wrap: pretty` on paragraphs, `text-wrap: balance` on headings.

## 4. Layout

12-column grid, gutter `1.5rem`, outer margin `clamp(1.25rem, 5vw, 5rem)`, max content width `84rem`. Everything is **start-aligned**; nothing is centred.

```
desktop ≥ 1024px
| 1 | 2   3   4   5   6   7   8 | 9 | 10  11  12 |
|   |  MAIN COLUMN (says)       |   | MARGIN     |
|   |                           |   | (proves)   |
|   |  PLATE may span 2–12, bleeding to the viewport's inline-end edge |
```

- Main column: columns 2–8. Margin: columns 10–12, top-aligned to the paragraph it annotates (CSS grid, same row).
- Plates (photographs) span 2–12 and may bleed to the inline-end edge of the viewport. Never full-bleed on both sides — the asymmetry is the point.
- **Tablet 640–1023px**: main column spans 1–9, margin 10–12 narrows to notes only.
- **Mobile < 640px**: single column. Each margin note moves directly below its paragraph, set in `--t-note`, `--ink-soft`, with a 2px `--mist` inline-start rule so it still reads as evidence rather than body text.
- Vertical rhythm on a 4px base: `4, 8, 12, 16, 24, 32, 48, 64, 96, 144`. Section spacing `96` desktop / `64` mobile. Page title to lede `24`.

Radius: Plates `0`. Inputs and the button `3px`. Nothing else has a radius. No shadows anywhere.

## 5. Motion

One orchestrated moment: on the Home page, the three lines of the hero resolve in sequence (opacity 0→1, 700ms each, 180ms stagger, `cubic-bezier(.2,.6,.2,1)`), then the margin registration line. No translate, no scale. Nothing else on the site animates on load or on scroll.

Interaction feedback only: link underline colour shifts to `--pine` over 150ms; the mobile nav disclosure opens with a 200ms height transition; form submission shows its state change. All motion off under `prefers-reduced-motion: reduce`.

## 6. Components

| Component | Behaviour |
|---|---|
| `SiteHeader` | Wordmark at inline-start. Nav: Summer Journeys, Private Japan, Family Services, Experiences, About, Contact. "For travel advisors" is a smaller link at the far inline-end. No sticky header. Mobile: wordmark + a "Menu" text button (not a hamburger icon) that discloses the list. |
| `Wordmark` | Text-set in Newsreader 400 from `content/site.ts` `brand.name` until a drawn mark exists. Must accept Latin, Japanese and Arabic strings for testing. |
| `SiteFooter` | Ink background. Contains `ComplianceBlock` (see COMPLIANCE.md C1–C2), then links: For travel advisors, Privacy, Terms of business, Contact. Present on every route including 404 and the portal. |
| `ComplianceBlock` | Trade-name line, registered entity (English and Japanese), address, registration line in prescribed Japanese form, memberships as memberships. Reads only from `content/site.ts`. |
| `MarginNote` | The core device. Props: `children`, optional `source` (claim ID from the claims register — renders a quiet "Source" link to the About sources list). Set in `--t-note`, `--ink-soft`. |
| `VerticalName` | Japanese place name set `writing-mode: vertical-rl`, Zen Kaku Gothic New, `--ink-soft`, in the margin beside a region section (北海道, 沖縄, 北陸, 北アルプス). Always paired with the English name in the main column. Hidden from screen readers (`aria-hidden`) because the English heading already says it. |
| `Plate` | Photograph with caption `Place, Prefecture. Month.` pulled from the manifest. Fixed aspect ratios only: `3:2`, `4:5`, `16:9`. Empty state (no licensed image yet): `--mist` block at the right ratio with the brief text in `--t-small` — "Photograph to come: [brief]" — dev only; in production an empty Plate renders nothing and the layout closes up. |
| `SeasonBand` | Summer Journeys only. Twelve month columns (Jan–Dec, `lining-nums`), July and August marked with a `--pine` fill; beneath, rows of mean daily maximum temperature per location from the claims register. Real data only — renders a placeholder until sourced. Accessible as a `<table>` with caption; visual treatment via CSS. |
| `EntryPoint` | Home only, two of them. Large Newsreader heading, one DRAFT sentence, one Plate (4:5), whole block is the link. Side by side on desktop (columns 2–6 and 8–12), stacked on mobile. Not a card: no border, no background. |
| `ExperienceEntry` | A `<dl>`-based entry in the strategy's fixed format. Title line `[Venue], [city]` then what happens. Margin: practitioner, season, duration, group limit, lead time as a definition list. No images in the list view. |
| `FactList` | About credentials. Two-column definition list (term / value), `lining-nums tabular-nums`, `--mist` rule between rows — rows are distinct facts, so the rule is information. |
| `WhatsAppLink` | The single solid button on the site: `--ink` fill, `--paper` text, 3px radius, label "Message us on WhatsApp". Opens `https://wa.me/[[WHATSAPP_E164]]?text=…` with prefilled text from content. No arrow, no icon. |
| `DeskStatus` | Beside the WhatsApp button on Contact and in the Home contact band. Reads desk hours from `content/site.ts` in the desk's reference time zone and states plainly: "The desk is open now." or "The desk opens at 09:00 Gulf time (14:00 in Tokyo)." Renders nothing if `desk.enabled` is false — a live status is a claim and must only appear once the desk is real. |
| `EnquiryForm` | Fields per CONTENT.md. Labels above fields, `--t-note`. Inputs `--snow` background, 1px `--ink-soft` border, 3px radius, 48px min height. Errors in plain words beneath the field, linked via `aria-describedby`. Submit label "Send enquiry"; success state replaces the form with the confirmation text. |
| `Placeholder` / `Draft` | Dev only: dashed `--stone` outline and a small tag showing the key or "DRAFT". Production: the guard fails before either can render. |

Links: body links underlined (`text-underline-offset: .22em`, 1px thickness, `--ink`), shifting to `--pine` on hover. Focus: `2px solid var(--pine)`, `outline-offset: 3px`, on everything focusable. Never remove focus styles.

No arrows appended to links or buttons.

## 7. Page layouts

### Home
```
[header]
| MAIN                                        | MARGIN                     |
| Japan, planned for the                      |                            |
| whole household.          (display)         |                            |
| Families travel together — …  (lede)        | Registered travel agency   |
| We work directly from Tokyo and Osaka …     | [[REG_LINE_JA]]            |
| Enquiry only. …                             | Verify with the Japan      |
|                                             | Tourism Agency (link)      |
|---------------------------------------------------------------------------|
| [EntryPoint: Summer Journeys]      | [EntryPoint: Private Japan]          |
|---------------------------------------------------------------------------|
| Contact band: one sentence, [WhatsApp button], [DeskStatus], email, tel     |
[footer]
```
The hero must fit one 1440×900 screen with the first line of the entry points visible below it.

### Summer Journeys (the lead page — most care)
```
| h1 + lede (LOCKED copy)                     | margin: the months, "July and August"  |
| SeasonBand (full main+margin width)                                          |
| Plate 16:9 bleeding inline-end                                               |
| h2 Hokkaido          body (DRAFT brief)     | 北海道 (vertical) + facts   |
| Plate 3:2                                                                    |
| h2 Okinawa           body                   | 沖縄 + facts                |
| h2 Hokuriku and the Japan Alps  body        | 北陸 / 北アルプス + facts    |
| Closing line + WhatsApp button                                               |
```

### Private Japan
Title, the LOCKED paragraph as lede, then four short sections (rooms, pacing, transport, privacy) each with a margin note — DRAFT. One Plate.

### Family Services
Title "For Muslim families". Five sections (Dining, Bathing, Prayer, Guiding, Transport), each a main-column paragraph from LOCKED copy with margin notes carrying the verifiable facts from the claims register. No Plates on this page — it is a page of commitments, and photographs would soften it.

### Experiences
Short intro, then 8–12 `ExperienceEntry` items as a single list. No filters, no categories — the strategy says "not a taxonomy".

### About
Two parts: "Who we are" (LOCKED copy) and "Credentials" (`FactList`, full width of main + margin). Then "Sources" — the claims register rendered as a numbered list, since source lists genuinely are referenced by number.

### For Travel Advisors
Credentials summary (links to About), how the working relationship runs (DRAFT), request-access form, sign-in link for approved advisors.

### Contact
LOCKED heading, the three routes as a `FactList`, WhatsApp button + DeskStatus, the one Arabic line (if approved), then the form.

## 8. Photography direction (brief for the photographer; also enforced by the manifest)

- Households at scale: grandparents, children, a group of eight at a table — shot at a distance or from behind. No faces of real clients without written release; prefer none.
- Natural light, overcast northern summer, early morning. No golden-hour cliché, no drone hero shots, no geisha, no torii-at-sunset.
- Places named precisely in the caption with the month taken. A July caption on a July page is part of the argument.
- Minimum long edge 3200px, delivered as AVIF/WebP via `next/image`, `sizes` set per Plate ratio.

## 9. Quality floor (not announced on the page; tested in Prompt 8)

WCAG 2.2 AA. Keyboard reachable everything, visible focus, skip link. Lighthouse mobile: Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100. LCP < 2.0s on 4G throttling, CLS < 0.02, total JS on public pages < 90KB gzipped (the site is almost entirely server-rendered).
