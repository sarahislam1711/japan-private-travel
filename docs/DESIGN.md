---
name: "HalaJapan"
description: "Screen-sized sections of paper, light serif and quiet gothic, with large Snow and Pine panels, the proof beside every claim, and a pine field at the end."
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
    fontSize: "clamp(3rem, 4.4vw + 1rem, 5.5rem)"
    fontWeight: 320
    lineHeight: 1.0
    letterSpacing: "-0.028em"
    fontVariation: "'opsz' 60"
  headline:
    fontFamily: "Source Serif 4, Noto Serif JP, Georgia, serif"
    fontSize: "clamp(2.5rem, 3vw + 1.2rem, 4.25rem)"
    fontWeight: 330
    lineHeight: 1.04
    letterSpacing: "-0.024em"
    fontVariation: "'opsz' 60"
  title:
    fontFamily: "Source Serif 4, Noto Serif JP, Georgia, serif"
    fontSize: "clamp(1.875rem, 1.4vw + 1.25rem, 2.625rem)"
    fontWeight: 360
    lineHeight: 1.12
    letterSpacing: "-0.016em"
    fontVariation: "'opsz' 36"
  wordmark:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.015em"
    fontVariation: "'opsz' 24"
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
  copy:
    fontFamily: "BIZ UDPGothic, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.62
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
    fontSize: "clamp(3rem, 5.6vw, 6.5rem)"
    fontWeight: 400
    lineHeight: 1.04
rounded:
  control: "6px"
  menu: "10px"
  panel: "20px"
spacing:
  base: "4px"
  gutter: "24px"
  page-margin: "clamp(1.25rem, 5vw, 5rem)"
  content-max: "84rem"
  panel-pad: "32px"
  panel-pad-wide: "48px"
  section: "128px"
  section-wide: "160px"
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
  panel-snow:
    backgroundColor: "{colors.snow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "48px"
  panel-pine:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.snow}"
    rounded: "{rounded.panel}"
    padding: "48px"
  proof-strip:
    backgroundColor: "{colors.snow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "24px 40px"
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

**Creative North Star: "One Screen at a Time, Said and Proved"**

Each section is roughly one screen and says one thing. A big, light serif headline carries the statement; a short paragraph of grey gothic sits beneath or beside it, so no section reads as a wall of text. Layouts are split: text on one side, a large rounded panel or a column of points on the other. The section design, flow, scroll feel and text appearance follow getburnt.ai at Sarah's request; its photographs, icons, grain and frame lines were deliberately not taken.

The founding idea still holds: **the main column says; the margin proves.** Claims are set in Source Serif 4; the evidence behind them (the registration line, the verify link, the legal facts) is set in BIZ UDPGothic, the Universal Design face of Japanese official documents. On Home the proof is a Snow strip directly under the hero, so the registration is visible on the first screen.

Separation is by space, surface and type, never by lines. Surfaces are Paper (the ground), Snow (soft panels) and Pine (the one accent, as whole panels and the closing field). Every page ends on one continuous Pine field: on Home the contact close runs into the footer without a gap. The site is finished without photographs; its imagery is type, the summer place names set vertically in Noto Serif JP on a Pine panel. Motion is weighted smooth scrolling and quiet scroll reveals, all off under reduced motion. One light theme; no shadows, gradients, icons (the Trips chevron excepted), all-caps, eyebrows, centred layouts, Japan clichés, dark mode or prices.

**Key Characteristics:**
- Sections about one screen tall, split layouts, start-aligned on a 12-column grid.
- Big light serif headlines (Source Serif 4, weights 320–400) over short grey gothic text (BIZ UDPGothic, Ink Soft).
- Large 20px-radius panels on Snow and on Pine; panels are whole links where they lead somewhere.
- Paper ground, Snow surfaces, Ink text, Pine as the only accent.
- No section rules: separation by space, surface and type.
- Every page closes on one continuous Pine field, footer included.
- Lenis smooth scrolling site-wide; headings rise word by word, other blocks fade and lift; all off under reduced motion and nothing hidden without JavaScript.

## Colors

A quiet, cool, near-neutral palette with one deep green-teal accent; colour is surface, not decoration.

### Primary
- **Pine** (#2C5F53): the only accent. Owns whole surfaces (the hero's place-name panel, the Private Japan panel, the contact close and the footer) and marks states: link hover on Paper, focus rings, selection, caret, the current Trips item, July and August in the season band.
- **Pine Soft** (#C7D8D1): secondary text on Pine (4.9:1), standing in for Ink Soft inside any Pine surface; also the colour of the vertical place names on the hero panel. Never used on Paper.

### Neutral
- **Paper** (#F1F2EE): the page ground everywhere outside Pine.
- **Snow** (#FAFAF8): soft panels (the Summer Journeys entry panel, the region panels), the menus, form fields, and the solid button on Pine.
- **Ink** (#1A2230): headlines and primary text, the solid button, the Contact ring.
- **Ink Soft** (#4A5462): the gothic section text, field labels, footer column headings, the quieter Advisors link, menu descriptions (6.8:1 on Paper).
- **Mist** (#DADDD8): non-text only. The Trips menu hover fill, the mobile menu's ring, the season band's row rules.
- **Ghost** (#D2D7D0): reserved for large decorative Japanese type on Paper; never meaningful text. Not used on a shipped surface at present.

A dev-only Stone (#6B7480) outlines placeholders and DRAFT marks; it is tooling, never part of a shipped page.

### Named Rules
**The One Accent Rule.** Pine is the only hue. It owns a whole surface (a panel, the close, the footer) or marks a state. No second accent; no Pine tints as decoration.

**The Pine Field Rule.** Inside any Pine surface, text is Snow, secondary text is Pine Soft, links stay Snow and thicken their underline to 2px on hover, the focus ring turns Snow, and the solid button inverts to Snow with Pine text.

## Typography

**Display Font:** Source Serif 4, variable with `opsz` 8–60 (with Noto Serif JP, Georgia, serif); upright only, italic never loaded or synthesised
**Body Font:** BIZ UDPGothic 400 and 700 (with system-ui, sans-serif) for section text, labels and navigation; Source Serif 4 for the base reading size and fact values
**Japanese:** Noto Serif JP 400 for every `lang="ja"` run

**Character:** A large, light, optically sized serif makes the statement; a plain official-document gothic in soft grey explains it in a few lines. The contrast in weight and colour is what keeps sections airy.

### Hierarchy
- **Display** (320, clamp 3–5.5rem, 1.0, -0.028em, opsz 60): Home's hero headline, the How we work heading, the contact close heading.
- **Headline** (330, clamp 2.5–4.25rem, 1.04, -0.024em, opsz 60): the entry panel headings and page titles.
- **Title** (360, clamp 1.875–2.625rem, 1.12, -0.016em, opsz 36): the leads of the How we work points.
- **Wordmark** (600, 1.375rem, 1, -0.015em, opsz 24): the text-set brand name in header and footer.
- **Body** (Source Serif 4 400, 1.125rem, 1.68): the base reading size; oldstyle proportional numerals.
- **Field** (Source Serif 4 400, 1rem, 1.45, opsz 16): fact values and the footer's trade-name line; lining tabular numerals in values.
- **Copy** (BIZ UDPGothic 400, 1.0625rem, 1.62, Ink Soft): the short text under every section heading, kept to about 30–32rem.
- **Label** (BIZ UDPGothic 400, 0.875rem, 1.5): navigation, buttons (700), field labels, page links under points and panels, footer links and column headings.
- **Small** (BIZ UDPGothic 400, 0.8125rem, 1.55): menu descriptions, the Advisors utility link, captions.
- **Japanese display** (Noto Serif JP 400, clamp 3–6.5rem, 1.04, vertical-rl): the hero panel's place names.

### Named Rules
**The Light Headline Rule.** Headlines are big and light (320–400), never bold; the wordmark is the only heavy serif. Size and optical size carry hierarchy.

**The Short Grey Text Rule.** Under a headline, the explanation is gothic in Ink Soft at copy size, a few lines long. If it runs past one short paragraph, the section is doing too much.

**The Says and Proves Rule.** Claims are serif; evidence (labels, the registration line, verify links) is gothic. Never set a proof in the display serif.

**The Sentence Case Rule.** No all-caps, no letter-spaced labels, no eyebrows above headings.

**The Japanese Line Rule.** Every `lang="ja"` run uses `word-break: keep-all` and strict line breaking, so 北海道 or 北アルプス never splits.

## Layout

A 12-column grid with a 24px gutter inside an 84rem container and a fluid page margin (clamp 1.25rem–5rem). Breakpoints: tablet 640px, desktop 1024px. Everything is start-aligned; nothing is centred. Below desktop every split stacks, text first.

Each Home section is roughly one screen and split in two:
- **Hero** fills the first screen at desktop (100svh less the header): headline, gothic paragraph and actions in columns 1–6, bottom-aligned; the Pine panel in columns 7–12, its place names filling the space above a registration seal set into its foot.
- **Two ways in**: a Snow panel (7 columns) and a Pine panel (5 columns), each at least 26rem tall, heading at the top and text plus link at the bottom.
- **How we work**: the heading in columns 1–5 stays sticky (top 7rem) while three points scroll past in columns 7–12, 96px apart (64px on narrow screens).
- **Close**: the display heading in columns 1–7, the reply line, WhatsApp button and contact list in columns 9–12, aligned to its foot; then the footer on the same Pine.

Rhythm is on a 4px base. Sections are separated by large space: 128px on narrow screens, 160–192px at desktop, 160–224px before the Pine close. Panel padding is 32px, 48px from tablet.

**The Space Not Lines Rule.** Sections, panels, points, header and footer are separated by space, surface and type. No rule between sections, under a headline, above a point or around the footer.

All direction-dependent styling uses logical properties (`ms-`, `pe-`, `start-`, `end-`, `inset-inline-*`), including the right-to-left order of the vertical place names, so a right-to-left set works without rework.

## Elevation & Depth

Flat. No shadows anywhere; Tailwind's shadow scales are cleared in the tokens. Depth is tonal: Snow lifts a panel off Paper, Pine sets a panel or field apart. Floating menus carry a faint 1px ring (Ink at 20% for the Trips menu, Mist for the mobile menu) because they overlap content; this is a functional edge, not a frame.

**The Tone Not Shadow Rule.** A surface is raised by tone (Snow on Paper, Pine on Paper), never by a shadow or gradient.

## Shapes

Softly rounded, never square and never pill. Content panels take a generous 20px radius (hero panel, entry panels, region panels); the Trips menu 10px; controls (buttons, menu items, the mobile menu, inputs, skip link) 6px. Panels carry no border. The only line forms are the link underline (1px, 0.22em offset; 2px on hover in Pine surfaces and for the current page), the focus outline (2px Pine, 3px offset) and the season band's table rules.

## Components

### Buttons
- **Shape:** gently softened (6px).
- **Primary (solid):** Ink with Snow text, BIZ UDPGothic label at 700, 48px tall, 24px inline padding; hover turns Pine. The one solid button is the WhatsApp link.
- **On Pine:** inverts to Snow with Pine text; hover settles to Paper.
- **Ringed (Contact, header):** transparent with a 1px Ink ring, 8px by 16px; hover and current page fill Ink with Snow text.
- **Focus:** 2px Pine outline at 3px offset (Snow on Pine).

### Cards / Containers
- **Entry panels:** the whole panel is the link. Snow or Pine, 20px radius, no border, 32px padding (48px from tablet), minimum 26rem tall. A headline at the top; copy text and an underlined label link at the bottom. Hover shifts the surface tone over 300ms (Snow toward white, Pine slightly deeper) and thickens the link underline to 2px.
- **Hero place-name panel:** Pine, 20px radius, decorative and `aria-hidden`; the place names are pinned inside it and wrap to its height.
- **Registration seal:** set into the foot of the hero's Pine panel, beneath the place names, like a stamp on a document: the Japanese registration line in Noto Serif JP (1.125rem, Snow), the agency statement in gothic Pine Soft, and the check link (Snow, underlined). No box or border; the panel is the ground.
- **Bare facts:** label and value rows with no surface, rows 16px apart, a 13.75rem label column from tablet; used for the legal block in the footer.

### Inputs / Fields
- **Style:** Snow, 48px tall, 6px radius, body serif in Ink, a 1px Ink Soft stroke. Evidenced on the styleguide only; the forms are not built.
- **Focus:** 2px Pine outline.

### Navigation
- Wordmark at inline-start; navigation at inline-end in BIZ UDPGothic label size. Not sticky.
- Order: Trips (disclosure), Family Services, Experiences, About, a quieter small Advisors in Ink Soft, then Contact as the ringed button.
- Links have no underline at rest, underline on hover; the current page carries a 2px underline.
- **Trips menu:** opens on click or hover, closes on Escape, outside click or focus leaving. The chevron (10 by 6, 1.5 stroke) turns 180° when open. A 320px Snow panel, 10px radius, faint ring; each item shows its page name and a one-line Ink Soft description. Hover fills Mist; the current item is bold Pine. Opens with a 150ms fade-and-settle.
- **Mobile:** a "Menu" disclosure opening a Snow panel at inline-end with the same entries, Trips' pages indented under the group label.

### Links
Underlined at 1px, 0.22em offset, in the current colour. On Paper, hover turns Pine; on Pine, hover thickens the underline to 2px.

### Vertical Place Names (signature)
The site's imagery: the summer regions in Noto Serif JP, `writing-mode: vertical-rl`, Pine Soft on the hero's Pine panel, read from the inline-end edge inward. Decorative and hidden from assistive technology.

### Pine Close and Footer
Every page ends on one Pine field. On Home the close (display heading, Pine Soft reply line, the inverted WhatsApp button, email and telephone as a gothic label list) runs straight into the footer. The footer holds the wordmark and the trade-name line, a site map in three gothic columns (Trips, HalaJapan, Legal; headings in Pine Soft), and the legal facts as bare rows. No rules, no frame.

### Season Band and Margin Note (built, not yet on a page)
The season band is twelve month cells that never wrap, July and August filled Pine, with an Ink rule above and below the head and Mist row rules: the one sanctioned use of rules, because it is a data table. The margin note is gothic label text in Ink Soft at a 16rem measure with an optional source link. Both are evidenced on the styleguide only.

### Motion
- **Smooth scroll:** Lenis site-wide (lerp 0.09, wheel smoothing, anchors handled).
- **Heading reveal:** each word rises from its own clipped line box (translateY 110% to rest), 1100ms ease-out-expo `cubic-bezier(0.16, 1, 0.3, 1)`, 45ms per word.
- **Block reveal:** other blocks fade (900ms) and lift 1.5rem (1100ms), staggered 110ms per step via `--d`.
- Reveals fire once as the block enters view (12% threshold, 12% bottom inset).
- **Interaction:** link colour 150ms; menu fade-and-settle 150ms; chevron turn 150ms; panel tone 300ms.
- **Safety:** under `prefers-reduced-motion` Lenis and reveals do not start and all durations collapse to near zero. Content is hidden only once the observer has run (`html.reveal-ready`), so without JavaScript everything is visible.

## Do's and Don'ts

### Do:
- **Do** make each section about one screen, split in two, with one big light serif headline and a short paragraph of gothic Ink Soft copy text.
- **Do** use large 20px-radius panels on Snow and Pine for content that leads somewhere, and make the whole panel the link.
- **Do** separate with space, surface and type: 128–224px between sections, Snow or Pine surfaces, no rules.
- **Do** put the proof beside or directly under the claim, in gothic: on Home, the registration seal at the foot of the hero's pine panel.
- **Do** end every page on the continuous Pine field, footer included.
- **Do** keep Pine the only accent: a whole surface or a state.
- **Do** reveal headings word by word and blocks by fade-and-lift, gate them behind `html.reveal-ready`, and switch all motion off under reduced motion.
- **Do** use CSS logical properties for every direction-dependent value.

### Don't:
- **Don't** draw rules between sections, under headlines, above points or around the footer; rules belong only to data tables such as the season band.
- **Don't** set bold or heavy headlines, or let section text run into long paragraphs.
- **Don't** use shadows, gradients, grain or frame lines.
- **Don't** use photographs as decoration or any stock imagery; the photograph frame is not yet designed.
- **Don't** use icons; the Trips disclosure chevron is the single functional exception.
- **Don't** use all-caps, letter-spaced labels or eyebrows above headings.
- **Don't** centre layouts or text blocks.
- **Don't** use Japan clichés (torii, cherry blossom, red suns, brush strokes, wave patterns).
- **Don't** add a second hue, a dark mode, or prices.
- **Don't** hide content in a way that depends on JavaScript or ignores reduced motion.

### How we work: the scroll showcase (7 Oct 2026)
On desktop with motion allowed, Home's How we work pins for one screen while the page scrolls through its three promises (about 70vh of scroll each). The promises are listed large on the inline-start side as tab buttons: the active one in Ink, the others at 35% Ink Soft. A Pine panel on the inline-end side crossfades (700ms, expo ease, 1rem lift) to the active promise's detail, set large in the serif, with its page link; three slim Snow bars beneath show progress. Clicking a promise scrolls to it. Below 1024px or with reduced motion it is a compact stacked list, with no pinning and no empty space. Mirrors fully on Arabic pages.

### Close, footer and language menu (7 Oct 2026, Sarah)
- **Page close:** an inset Pine panel (24px radius) on the paper ground at the end of the page (Home's contact close and the shared PageClose), followed by 96–128px of paper. It is never joined to the footer.
- **Footer:** a quiet Mist band, Ink text. Top row: wordmark and trading-name line beside one row of page links. Below a faint rule (ink at 15%): the legal facts required on every page (COMPLIANCE C1, C2) as inline small print, "Label: value" separated by dots that stay with the fact before them, with Privacy and Terms of business beside it. About 315px tall on desktop.
- **Language menu:** a globe button (44px, a functional icon, like the Trips chevron) opens a two-item list: "English" with the United States flag and "Arabic" with the Saudi flag, named in English on both sites, by Sarah's choice. Flags are inline SVG from flag-icons (MIT; src/assets/flags/SOURCE.md). Each item goes to the current page in that language; the current one is bold Pine. On mobile the globe sits beside Menu.

### Every section fits the screen (7 Oct 2026, Sarah)
On desktop and tablet each section, or each pinned screen, fits one viewport from 1280×720 up to 1920×1080; on phones every panel fits the screen and text runs naturally above or below it. Short laptop screens (≤ 820px tall, ≥ 1024px wide) step the display, h1 and h2 sizes down. Private Japan's principles use the same pinned showcase as Home's How we work; with four or more items the showcase sets its heading and promises one size smaller. The page close keeps a wide three-line headline with the contact details centred beside it.

## Arabic and right to left (7 Oct 2026)

The site is bilingual. Arabic pages set `<html lang="ar" dir="rtl">`; because every layout uses logical properties, the whole page mirrors: the hero text sits on the right and its pine panel on the left, navigation runs right to left, the Trips menu opens from the inline start.

- **Faces:** Markazi Text for Arabic reading and headlines (the serif voice), Noto Kufi Arabic for labels, navigation and notes (the gothic voice). The per-language face variables (`--face-serif`, `--face-gothic`) switch under `:lang(ar)`; Latin words inside Arabic fall back to Source Serif and BIZ UDPGothic.
- **Arabic typography:** no letter-spacing on any step (tracking breaks the joins); looser leading (display 1.25, body and copy 1.85); reading sizes lifted a step (body 1.3125rem) because Markazi sets small. Western digits, as the English uses.
- **Mixed scripts:** Japanese segments always carry `dir="ltr"`, so the registration line reads in order inside Arabic; Latin placeholder keys are isolated left to right. The vertical Japanese place names keep their right-to-left column order on both sites (`dir="ltr"` on the column row).
- **Motion:** word reveals split Arabic on spaces, so each word keeps its letter joins.
- **Language switch:** in the header between Advisors and Contact, in the mobile menu and in the footer; it names the other language in its own script (العربية on English pages, English on Arabic pages) and goes to the same page.

## Unresolved in the build

- `src/styles/tokens.css` still carries retired tokens (`--rule-frame`, `--rule-row`, `--duration-rule`, `--duration-ink`, `--stagger`, a "Registration Plate" header comment, and "one moment" motion comment), and `globals.css` still defines the unused `draw-rule` and `ink-in` classes and keyframes. `FieldTable` still has an `animate` prop that applies `ink-in`. None of these are part of the system.
- The entry panels' hover tones are literal hex (`#ffffff` on Snow, `#28574c` on Pine), not tokens.
- `FieldTable`'s panel variant still uses a 14px radius; every shipped panel is 20px. The variant is not used on a page.
- The reveal durations (900ms, 1100ms), per-step delays (110ms, 45ms) and the 20px panel radius are literal values in `globals.css` and components, not tokens.
- The hero paragraph is set at a one-off 1.1875rem gothic rather than the copy step.
- Ghost has no use on a shipped surface since the place names moved onto Pine.
- The photograph frame is not built; the `Plate` empty state and its treatment in this world are still to be designed.
- Inner pages are title-only stand-ins; the margin note, season band and input are evidenced on the styleguide only.
- DRAFT and placeholder markers are dev-only and do not ship.
