---
name: "HalaJapan"
description: "One continuous page of paper, ink and space, with the proof beside every claim and a pine field at the end."
colors:
  paper: "#F1F2EE"
  snow: "#FAFAF8"
  ink: "#1A2230"
  ink-soft: "#4A5462"
  mist: "#DADDD8"
  pine: "#2C5F53"
  pine-soft: "#C7D8D1"
  ghost: "#D2D7D0"
typography:
  display:
    fontFamily: "Source Serif 4, Noto Serif JP, Georgia, serif"
    fontSize: "clamp(2.75rem, 3.6vw + 1.1rem, 4.625rem)"
    fontWeight: 420
    lineHeight: 1.04
    letterSpacing: "-0.02em"
    fontVariation: "'opsz' 60"
  headline:
    fontFamily: "Source Serif 4, Noto Serif JP, Georgia, serif"
    fontSize: "clamp(2.25rem, 2.4vw + 1.25rem, 3.5rem)"
    fontWeight: 430
    lineHeight: 1.08
    letterSpacing: "-0.018em"
    fontVariation: "'opsz' 60"
  title:
    fontFamily: "Source Serif 4, Noto Serif JP, Georgia, serif"
    fontSize: "clamp(1.625rem, 1vw + 1.25rem, 2.125rem)"
    fontWeight: 450
    lineHeight: 1.18
    letterSpacing: "-0.01em"
    fontVariation: "'opsz' 36"
  title-small:
    fontFamily: "Source Serif 4, Noto Serif JP, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.3
    fontVariation: "'opsz' 24"
  lede:
    fontFamily: "Source Serif 4, Noto Serif JP, Georgia, serif"
    fontSize: "clamp(1.25rem, 0.4vw + 1.15rem, 1.4375rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Source Serif 4, Noto Serif JP, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.68
    fontFeature: "\"onum\", \"pnum\""
  field:
    fontFamily: "Source Serif 4, Noto Serif JP, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.45
    fontFeature: "\"lnum\", \"tnum\""
    fontVariation: "'opsz' 16"
  label:
    fontFamily: "BIZ UDPGothic, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  small:
    fontFamily: "BIZ UDPGothic, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.55
  japanese:
    fontFamily: "Noto Serif JP, serif"
    fontWeight: 400
    fontFeature: "\"lnum\""
  japanese-display:
    fontFamily: "Noto Serif JP, serif"
    fontSize: "clamp(2.75rem, 4.2vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.05
rounded:
  control: "6px"
  menu: "10px"
  panel: "14px"
spacing:
  base: "4px"
  gutter: "24px"
  page-margin: "clamp(1.25rem, 5vw, 5rem)"
  content-max: "84rem"
  measure-main: "36rem"
  measure-note: "16rem"
  section: "96px"
  close: "144px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.snow}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.snow}"
  button-on-pine:
    backgroundColor: "{colors.snow}"
    textColor: "{colors.pine}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-on-pine-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.pine}"
  button-ringed:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "8px 16px"
  button-ringed-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.snow}"
  fact-panel:
    backgroundColor: "{colors.snow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "24px"
  input:
    backgroundColor: "{colors.snow}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "48px"
  nav-menu:
    backgroundColor: "{colors.snow}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.menu}"
    padding: "6px"
    width: "320px"
  nav-menu-item-hover:
    backgroundColor: "{colors.mist}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
  pine-field:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.snow}"
---

# Design System: HalaJapan

## Overview

**Creative North Star: "One Page, Said and Proved"**

The site reads as a single continuous page rather than a stack of separated sections. A cool paper ground runs from the header to the last section; nothing is boxed off by lines. Separation comes from three things only: space, the type scale, and a change of surface (a soft Snow panel for facts, a full Pine field at the close). Every page ends the same way: the closing section and the footer form one unbroken pine field.

The governing idea is unchanged from the first specification: **the main column says; the margin proves.** Claims are made in a reading column of Source Serif 4; the evidence that backs them (registration, the source of a number, a named policy) sits beside them, set in BIZ UDPGothic, the Universal Design face of Japanese official documents, in soft ink. A due-diligence reader can read the margin alone.

The site is finished without photographs. Its imagery is type: large, pale, vertical Japanese place names set in Noto Serif JP (Summer Journeys' entry point on Home). One light theme; no dark mode. Refused, by the user and by the build: shadows, gradients, icons (the single exception is the functional disclosure chevron), all-caps and eyebrow labels, centred layouts, Japan clichés, prices.

**Key Characteristics:**
- Paper ground, Snow surfaces, Ink text, Pine as the one accent; navy is retired.
- Source Serif 4 with optical sizing for everything read; BIZ UDPGothic for labels, navigation, notes and legal lines; Noto Serif JP for Japanese.
- Separation by space, scale and surface; almost no rules.
- Facts sit in a soft Snow panel (14px radius, no border), rows separated by space.
- Every page closes on one continuous pine field: contact close, then footer.
- Start-aligned asymmetric 12-column grid; nothing centred.
- One motion moment, on Home: the hero's text and values ink in; off under reduced motion.

## Colors

A quiet, cool, near-neutral palette with a single deep green-teal accent; colour is almost entirely surface, not decoration.

### Primary
- **Pine** (#2C5F53): the only accent. Owns the closing field and the footer on every page; marks link hover, focus rings, text selection, caret, the current item in the Trips menu, and July and August in the season band. On Pine, primary text is Snow.
- **Pine Soft** (#C7D8D1): secondary text on a Pine field (4.9:1), such as "We will reply in your language." and the contact labels; also the hover colour of the ghost place names. Never used on Paper.

### Neutral
- **Paper** (#F1F2EE): the page ground, everywhere outside the pine field.
- **Snow** (#FAFAF8): soft panels (the registration fact panel), form fields, the menus, and the solid button on Pine.
- **Ink** (#1A2230): all primary text, the solid button, the ring of the Contact button.
- **Ink Soft** (#4A5462): margin notes, field labels, captions, the quieter "Advisors" link, menu descriptions (6.8:1 on Paper).
- **Mist** (#DADDD8): non-text only. The hover fill in the Trips menu and the few rules that remain (season band rows). Never text.
- **Ghost** (#D2D7D0): the large decorative vertical Japanese place names only. Never meaningful text; always `aria-hidden`.

A dev-only Stone (#6B7480) outlines placeholders and DRAFT marks; it is tooling, never part of a shipped page.

### Named Rules
**The One Accent Rule.** Pine is the only hue. It either owns a whole field (the close and footer) or marks a state (hover, focus, current, the summer months). No second accent, no tints of Pine as decoration.

**The Pine Field Rule.** On Pine, text is Snow, secondary text is Pine Soft, links stay Snow and thicken their underline to 2px on hover, the focus ring turns Snow, and the solid button inverts to Snow with Pine text.

## Typography

**Display Font:** Source Serif 4, variable with `opsz` 8–60 (with Noto Serif JP, Georgia, serif)
**Body Font:** Source Serif 4 (upright only; italic is never loaded or synthesised)
**Label Font:** BIZ UDPGothic 400 and 700 (with system-ui, sans-serif)
**Japanese:** Noto Serif JP 400 for every `lang="ja"` run

**Character:** A bookish, optically sized serif carries the voice; a plain Japanese official-document gothic carries the evidence. The pairing is the says/proves split made visible.

### Hierarchy
- **Display** (420, clamp 2.75–4.625rem, 1.04, opsz 60): Home's headline only.
- **Headline** (430, clamp 2.25–3.5rem, 1.08, opsz 60): page titles, Home's section heads ("How we work"), the Summer Journeys entry heading, the contact close heading.
- **Title** (450, clamp 1.625–2.125rem, 1.18, opsz 36): the secondary entry point (Private Japan).
- **Title small** (600, 1.375rem, 1.3, opsz 24): the fact panel's statement, how-we-work leads, the wordmark.
- **Lede** (400, clamp 1.25–1.4375rem, 1.5): the first paragraph under a heading; the footer's trade-name line.
- **Body** (400, 1.125rem, 1.68): the main column at a 36rem measure; oldstyle proportional numerals.
- **Field** (400, 1rem, 1.45, opsz 16): fact values; lining tabular numerals.
- **Label** (BIZ UDPGothic 400, 0.875rem, 1.5): field labels, navigation, margin notes, page links under how-we-work items, buttons (700).
- **Small** (BIZ UDPGothic 400, 0.8125rem, 1.55): menu descriptions, the Advisors utility link, footer links, captions.
- **Japanese display** (Noto Serif JP 400, clamp 2.75–4.5rem, 1.05, vertical-rl): the decorative place names.

### Named Rules
**The Says and Proves Rule.** Claims are serif; evidence is gothic in soft ink. Never set a claim in the gothic or a proof in the reading serif.

**The Sentence Case Rule.** No all-caps, no letter-spaced labels, no eyebrows above headings. Hierarchy is carried by size, weight and optical size alone.

**The Japanese Line Rule.** Every `lang="ja"` run uses `word-break: keep-all` and strict line breaking, so 北海道 or 北アルプス never splits.

## Layout

A 12-column grid, 24px gutter, inside an 84rem container with a fluid page margin (clamp 1.25rem–5rem). On desktop (≥1024px) content starts at column 2, leaving column 1 as breathing room; tablet begins at 640px. Everything is start-aligned; nothing is centred.

The says/proves split is spatial: on Home's hero the welcome takes columns 2–6 and the fact panel columns 7–12; on narrow screens the proof follows the claim. Margin notes sit level with their paragraph at a 16rem measure.

Rhythm is on a 4px base. Sections are separated by space, not lines: 96px between Home's sections, 144px before the pine close. Inside the pine field, the close and the footer run on without a gap or divider.

The Summer Journeys entry point is the one composition with imagery: on tablet and up the vertical place names sit at the inline-end of its block, behind the text column; below tablet they follow the text.

**The Space Not Lines Rule.** Sections, entry points, how-we-work items, the header and the footer are separated by space, scale and surface. No rule under the headline, above an entry point or item, before Advisors, or around the footer.

All direction-dependent styling uses logical properties (`ms-`, `pe-`, `start-`, `end-`, `inset-inline-*`), including the vertical place-name row, so a right-to-left set works without rework.

## Elevation & Depth

Flat. No shadows anywhere; Tailwind's shadow scales are cleared in the tokens. Depth is conveyed by surface alone: Snow lifts a panel off Paper by tone, and Pine closes the page. Floating menus are separated by a faint 1px ring (Ink at 20% for the Trips menu, Mist for the mobile Menu) because they overlap content and must read as separate; this is a functional edge, not a frame.

**The Tone Not Shadow Rule.** A surface is raised by being lighter (Snow on Paper), never by a shadow or gradient.

## Shapes

Softened, never square-cornered panels and never pills. Controls (buttons, menu items, inputs, skip link) take 6px; the Trips menu 10px; content panels 14px. Panels carry no border. The only line forms left in the system are the link underline (1px, 0.22em offset), the focus outline (2px Pine, 3px offset) and the season band's table rules.

## Components

### Buttons
- **Shape:** gently softened (6px).
- **Primary (solid):** Ink with Snow text, BIZ UDPGothic label at 700, 48px tall, 24px inline padding. Hover turns Pine. The one solid button on the site is the WhatsApp link.
- **On Pine:** the same button inverts to Snow with Pine text; hover settles to Paper.
- **Ringed (Contact):** transparent with a 1px Ink ring, 8px by 16px. Hover and current page fill Ink with Snow text.
- **Focus:** 2px Pine outline at 3px offset (Snow on Pine).

### Cards / Containers
- **Fact panel:** Snow, 14px radius, no border, 24px padding (32px by 28px from tablet). A title-small statement, then label/value rows separated by 16px of space (label column 13.75rem from tablet), then a gothic foot line such as the verify link. There are no cards elsewhere: entry points are whole-block links with no surface or border.
- **Bare facts:** the same rows with no surface, used for the legal block in the footer on Pine.

### Inputs / Fields
- **Style:** Snow, 48px tall, 6px radius, body serif in Ink, a 1px Ink Soft stroke (styleguide only; the form pages are not yet built).
- **Focus:** 2px Pine outline.

### Navigation
- Wordmark at inline-start (text-set, title-small weight 600); navigation at inline-end in BIZ UDPGothic label size. Not sticky.
- Order: Trips (disclosure), Family Services, Experiences, About, a quieter small "Advisors" in Ink Soft, then Contact as the ringed button.
- Links have no underline at rest; underline on hover; current page carries a 2px underline.
- **Trips menu:** opens on click or hover, closes on Escape, outside click or focus leaving. The chevron (10 by 6, 1.5 stroke) turns 180° when open. A 320px Snow panel, 10px radius, faint ring; each item shows its page name and a one-line Ink Soft description. Hover fills Mist; the current item is bold Pine. Opens with a 150ms fade-and-settle.
- **Mobile:** a "Menu" disclosure opening a Snow panel at inline-end listing the same entries, with Trips' pages indented under the group label.

### Links
Underlined at 1px, 0.22em offset, in the current colour. Hover turns Pine on Paper; on Pine, hover thickens the underline. Entry-point headings underline and turn Pine when their block is hovered.

### Margin Note
The proof beside a claim: BIZ UDPGothic label in Ink Soft, 16rem measure, no rule, with an optional "source" link in Ink to the claim's entry on About.

### Vertical Place Names (signature)
The site's imagery. The Summer Journeys regions set in Noto Serif JP, `writing-mode: vertical-rl`, in Ghost, read from the page edge inward, wrapping into a further column when long. Decorative and `aria-hidden`; on hover of the entry block they deepen to Pine Soft over 300ms.

### Season Band
Twelve month cells in one row that never wraps; July and August filled Pine with Snow text, their data cells tinted Pine at 8%. As a data table it keeps rules: an Ink rule above and below the month head and Mist rules between rows. This is the one sanctioned use of rules.

### Pine Close and Footer
Every page ends on one Pine field. On Home the contact close (headline, Pine Soft reply line, the inverted WhatsApp button, email and telephone) runs straight into the footer: the trade-name line in lede, the legal facts as bare rows, and a row of gothic small links. No frame, no rules, no tonal variants.

### Motion
One moment, on Home only: the headline, welcome and fact panel values ink in (opacity and a 3px blur clearing over 600ms, ease-out-expo, 90ms stagger). Link colour transitions take 150ms. Everything is cut to near zero under `prefers-reduced-motion`.

## Do's and Don'ts

### Do:
- **Do** separate with space, type scale and surface: 96px between sections, a Snow panel for facts, the Pine field to close.
- **Do** put facts in the Snow fact panel (14px radius, no border) with rows separated by 16px of space.
- **Do** end every page on the continuous Pine field, footer included.
- **Do** keep Pine the only accent: a whole field or a state, nothing in between.
- **Do** set claims in Source Serif 4 and their proof beside them in BIZ UDPGothic, Ink Soft.
- **Do** use large vertical Japanese place names in Ghost as the imagery, decorative and hidden from assistive technology.
- **Do** use CSS logical properties for every direction-dependent value.
- **Do** keep Home's ink-in as the site's only load motion, and switch it off under reduced motion.

### Don't:
- **Don't** draw rules between sections, under headlines, above entry points or list items, before the Advisors link, or around the footer. Rules belong only to data tables such as the season band.
- **Don't** frame panels with borders or double rules, or set facts in hairline rows.
- **Don't** use navy or any second hue.
- **Don't** use shadows or gradients.
- **Don't** use icons; the disclosure chevron is the single functional exception.
- **Don't** use all-caps, letter-spaced labels or eyebrows above headings.
- **Don't** centre layouts or text blocks.
- **Don't** use Japan clichés (torii, cherry blossom, red suns, brush strokes, wave patterns).
- **Don't** add a dark mode, or show prices.
- **Don't** use Ghost or Mist for meaningful text.

## Unresolved in the build

- The photograph frame is not built; the `Plate` empty state and its treatment within this world are still to be designed.
- In the footer's bare facts at desktop, the labels "Travel services manager, Tokyo" and "Travel services manager, Osaka" wrap onto two lines within the 13.75rem label column.
- The season band still uses rules (Ink head rules, Mist row rules); accepted because it is a data table, but it is the one place the no-lines direction does not hold.
- `src/styles/tokens.css` still carries retired tokens from the plate world (`--rule-frame`, `--rule-row`, `--duration-rule`, the `--color-hairline` alias, a "Registration Plate" header comment), and `globals.css` still defines the unused `draw-rule` animation. They are not part of this system and should be removed.
- CLAUDE.md names Newsreader and Zen Kaku Gothic New; the build ships Source Serif 4, Noto Serif JP and BIZ UDPGothic. This file records the build.
- The input style is evidenced only on the styleguide; enquiry and advisor forms are not yet built.
