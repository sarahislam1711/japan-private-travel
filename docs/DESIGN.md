---
name: "[[BRAND]]"
description: "The agency's registration plate: facts in a ruled table, the brand beneath them."
colors:
  ground: "#eef1f2"
  mist: "#e2e7ea"
  plate: "#fbfcfc"
  ink: "#14181d"
  ink-soft: "#4a5159"
  hairline: "#c3c9ce"
  navy: "#1f3a5f"
  stone: "#6b7480"
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
rounded:
  none: "0"
  control: "6px"
spacing:
  base: "4px"
  gutter: "24px"
  page-margin: "clamp(1.25rem, 5vw, 5rem)"
  content-max: "84rem"
  measure-main: "36rem"
  measure-note: "16rem"
  section: "144px"
components:
  plate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 20px 4px"
  plate-row:
    typography: "{typography.field}"
    padding: "10px 0"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.plate}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.plate}"
  input:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "48px"
  tinted-section:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    padding: "64px 0"
  menu-panel:
    backgroundColor: "{colors.plate}"
    rounded: "{rounded.control}"
    padding: "16px 20px"
---

# Design System: [[BRAND]]

## Overview

**Creative North Star: "The Registration Plate" (旅行業登録票)**

A registered Japanese travel agency must display its registration plate: a framed, ruled table of facts (registration number, authority, entity, managers, memberships). The site borrows that object and nothing else. The facts sit in a ruled plate; the brand sits beside and beneath them. The plate is enamel-white on a cool grey ground, framed by a black double rule, with hairline rows; navy is the only accent. The site is a credential, and the plate is how it shows its credentials.

The governing idea, unchanged since the first specification: **the main column says; the margin proves.** Claims are made in a reading column of Source Serif; the evidence that backs them (registration, named policy, source of a number) sits beside them in the margin, set in BIZ UDPGothic, the Universal Design face of Japanese official documents. A due-diligence reader can read the margin alone.

The world is deliberately less rigid than its first drafts. The framed double-rule plate is a signature, used on only three surfaces: Home's hero, About's credentials, and the footer. Everywhere else the page breathes: more space, fewer and lighter rules, and separation by a tinted surface (mist) rather than by lines. The layout looks finished without photographs, because type, rules and the plate carry it. One light theme only; no dark mode. Refused: the photo-led luxury hero, cards, shadows, gradients, icons, Japan clichés.

**Key Characteristics:**
- Cool grey ground, enamel-white plate, near-black ink, navy as the single accent.
- Source Serif 4 (with optical sizing) for everything read; BIZ UDPGothic for labels, nav, notes and legal lines; Noto Serif JP for Japanese.
- The framed plate appears on three surfaces only; elsewhere, space and tint separate.
- Every rule separates two facts. No rule is decoration.
- Start-aligned asymmetric 12-column grid; nothing centred.
- Square plate, softened controls (6px).
- One motion moment, on Home: rules draw from inline-start, values ink in.

## Colors

A cool, low-chroma neutral world with one deep navy accent; colour is almost entirely ink on pale grey.

### Primary
- **Registry Navy** (navy): the only accent. Link hover colour, the focus ring, text selection, caret and native control accent, the solid button's hover, and the July and August cells of the season band (full fill in the month header; an 8% navy tint down the data rows). 10.1:1 on ground.

### Neutral
- **Cool Ground** (ground): the page background everywhere.
- **Mist** (mist): tinted sections. The footer sits on it; it is the system's main way of separating one zone from another without a line.
- **Enamel Plate** (plate): the plate's surface, form fields, the mobile menu panel, and text on ink or navy.
- **Plate Ink** (ink): all body text and headings, the plate's double-rule frame, the single 1px rule under the headline, the plate's title and foot rules, the season band's head rules, and the solid button. 15.7:1 on ground.
- **Soft Ink** (ink-soft): plate field labels, margin notes, form labels, captions, row headings in the season band. 7.1:1 on ground, 6.5:1 on mist.
- **Hairline** (hairline): plate row rules, the rule above each entry point, the footer's link-row rule, the margin note's inline-start rule, the mobile Trips indent rule, the divider before Advisors, the mobile menu outline. 1.5:1 on ground: **non-text only.**
- **Stone** (stone): dev-only outlines for placeholder and DRAFT markers and styleguide scaffolding. 4.2:1 on ground: **never production text.**

### Named Rules
**The One Accent Rule.** Navy is the only colour that is not a neutral. It marks interaction (hover, focus, selection) and the two summer months. Nothing else is navy, and no second accent is introduced.

**The Tint Before Line Rule.** To separate a zone, reach for mist first. A rule is drawn only where it separates two facts.

## Typography

**Display / Text Font:** Source Serif 4, variable with the `opsz` axis, upright only (with Noto Serif JP, Georgia, serif)
**Label Font:** BIZ UDPGothic 400 and 700 (with system-ui, sans-serif)
**Japanese Font:** Noto Serif JP 400, applied to every `lang="ja"` run

**Character:** A sober text serif that sharpens at display size through optical sizing, paired with the plain sans of Japanese official forms for every label. The pairing reads as a document, not as a brochure.

### Hierarchy
- **Display** (420, fluid 44 to 74px, 1.04, −0.02em, opsz 60): Home's headline only, the plate's title for the whole page.
- **Headline** (430, fluid 36 to 56px, 1.08, −0.018em, opsz 60): page titles.
- **Title** (450, fluid 26 to 34px, 1.18, −0.01em, opsz 36): section heads and the entry-point headings.
- **Title small** (600, 22px, 1.3, opsz 24): the plate's own title ("Registered travel agency"), sub-heads.
- **Lede** (400, fluid 20 to 23px, 1.5): the first paragraph under a title, and the footer's trade-name line.
- **Body** (400, 18px, 1.68, oldstyle proportional numerals): the main column, measure 36rem.
- **Field** (400, 16px, 1.45, lining tabular numerals, opsz 16): plate values.
- **Label** (BIZ UDPGothic 400, 14px, 1.5): plate labels, navigation, form labels, margin notes; 700 on the solid button.
- **Small** (BIZ UDPGothic 400, 13px, 1.55): captions, footer links and legal lines, the season band on narrow screens.

### Named Rules
**The Sentence Case Rule.** Sentence case everywhere. No all-caps, no letter-spaced labels, no small caps, no eyebrows above headings, no italic or coloured word inside a heading. No italic is loaded and synthesis is switched off.

**The Two Numeral Rule.** Reading text uses oldstyle proportional numerals; anything tabular (plate values, the season band) uses lining tabular numerals. Japanese uses lining numerals.

**The Unbroken Japanese Rule.** Japanese runs carry `lang="ja"`, are set in Noto Serif JP, and never break inside a word (`word-break: keep-all; line-break: strict`). Headings are balanced and paragraphs are wrapped `pretty`.

## Layout

A 12-column grid inside a 84rem container, gutter 24px, page margin fluid from 20px to 80px. Content starts at column 2 on desktop; column 1 is left empty as the inset, which is what makes the page asymmetric. Everything is start-aligned; nothing is centred.

- **Desktop (1024px and up):** the main column spans columns 2 to 6 (Home) or 2 to 8 (reading pages); the margin or plate takes the end columns (7 to 12 on Home's hero and in the footer). The headline spans 2 to 12 over a single 1px ink rule. Entry points sit side by side, 2 to 6 and 7 to 12.
- **Tablet (640 to 1023px):** a single column, with the plate's rows switching to a label column of 13.75rem beside the value; entry points pair up at six columns each.
- **Mobile (below 640px):** a single column. Plate labels stack above their values. A margin note follows its paragraph, keeping its inline-start rule so it still reads as evidence.
- **Rhythm:** 4px base; steps in use are 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 144. Headline to rule 16px; rule to content 32px; plate rows 10px top and bottom; footer 144px above, 64px inside.
- **Measures:** main column 36rem; margin notes 16rem.
- **Direction:** CSS logical properties only (inline-start, inline-end, `ms`/`me`/`ps`/`pe`, `start`/`end`). Animation origins flip under `dir="rtl"`.

**The Main Says, Margin Proves Rule.** Claims go in the main column; their evidence goes level with them in the margin (or directly after them on narrow screens). Proof is never buried in the body or moved to a separate page alone.

**The Finished Without Photographs Rule.** No layout may depend on an image to look complete. Photographs, when licensed, are an enhancement.

## Elevation & Depth

The system is flat. There are no shadows anywhere; the theme clears Tailwind's shadow, inset-shadow and drop-shadow scales so none can be reached for. Depth is conveyed by surface tone alone: the enamel plate on the grey ground, and mist-tinted sections against the ground. The mobile menu panel is distinguished by its plate surface and a 1px hairline ring, not by a shadow.

**The Flat Plate Rule.** Surfaces never lift. If something needs to stand apart, change its surface tone or frame it as the plate; never cast a shadow.

## Shapes

Two shape languages, kept apart. The plate and every ruled object are square (0 radius): frames, rules, the season band, tinted sections. Controls (text inputs, the solid button, the skip link, the mobile menu panel) are gently softened to 6px. Nothing else carries a radius.

Rules are the only ornament: the plate's 4px double ink frame; 1px ink for title and foot rules inside the plate, the headline rule and the season band head; 1px hairline for plate rows, entry points and the footer link row; a 2px hairline inline-start rule for margin notes.

**The Signature Frame Rule.** The double-rule frame appears on exactly three surfaces: Home's hero plate, About's credentials, and the footer's plate. Anywhere else, use rows without a frame, or a tint.

## Components

### Buttons
Sober and singular: there is one solid button on the site.
- **Shape:** softened corners (6px), 48px minimum height.
- **Primary:** ink fill, plate text, BIZ UDPGothic label size at 700, 24px inline padding.
- **Hover / Focus:** fill shifts to navy (colour transition); focus is the global 2px navy outline at 3px offset.
- No arrows, no icons, no secondary or ghost buttons. Every other action is a text link.

### Inputs / Fields
- **Style:** plate background, 1px soft-ink border, 6px radius, 48px minimum height, 12px inline padding, body-size Source Serif text in ink.
- **Label:** above the field, BIZ UDPGothic label size in soft ink.
- **Focus:** global navy outline; caret and native accent are navy.
- **Error / Disabled:** not yet built.

### Links
Underlined at 1px with a 0.22em offset in the current colour; hover shifts colour to navy over 150ms. The verify link inside the plate is set in the label face. Focus styles are never removed.

### Navigation
Structure set by Sarah (docs/CONTENT.md §2): HalaJapan wordmark at inline-start; at inline-end **Trips** (a group that discloses Summer Journeys and Private Japan), Family Services, Experiences, About, a quieter **Advisors** link (the For travel advisors page: small size, soft ink, after a hairline divider), and **Contact** as a boxed link. The footer keeps the full "For travel advisors" name.

Wordmark: Source Serif 600, 22px, opsz 24, text-set from content until a drawn mark exists. Navigation: BIZ UDPGothic label size; links are not underlined at rest, underline on hover, and the current page carries a 2px underline (Trips carries it when either of its pages is current). Trips carries a small disclosure chevron that turns when open (a functional menu signal, Sarah 6 Oct 2026; decorative arrows on links and buttons stay banned). The Trips panel opens on click or hover with a 140ms close delay, closes on Escape, outside click or focus leaving, and fades in over 150ms (off under reduced motion). It is a 20rem plate panel, 10px radius, 1px ink-at-20% ring, no shadow, aligned under the trigger; each item shows the page name and its one-line description, fills mist on hover or keyboard focus, and marks the current page with a bold navy name. Contact is a 1px ink ring with 6px radius that fills ink on hover and when current. Not sticky. Below 1024px a "Menu" text disclosure (no hamburger icon) opens a plate panel at inline-end listing the same structure, Trips' pages indented under a hairline inline-start rule. A skip link (ink, plate text, 6px radius) appears on keyboard focus.

### The Registration Plate (signature)
A definition list of facts. Framed variant: plate surface, 4px double ink frame, 20px inline padding, square. An optional title in title-small sits above a 1px ink rule; rows are separated by hairlines; an optional foot (the verify link) sits below a 1px ink rule. Labels in BIZ UDPGothic soft ink; values in Source Serif field size with lining tabular numerals. A bare variant (rows only) exists for margin use. The label column is 13.75rem from 640px up.

On Home only, the plate carries the site's one motion moment: each rule draws from inline-start (scaleX, 900ms, `cubic-bezier(0.16, 1, 0.3, 1)`), and each value inks in (opacity and a 3px blur, 600ms), staggered 90ms per step, with the headline and intro inking in on the same sequence. Under reduced motion all of it is off.

### Tinted Section (footer)
The footer is the plate on a mist section: the framed plate in the end columns, the trade-name line in lede size at the start, and a hairline-ruled row of small links beneath (advisors, privacy, terms, contact). Present on every route. It is not an ink band.

### Entry Points
Home's two routes in. Each is a whole-block link: a hairline rule above, a title-size heading, one sentence. No card, no border box, no background. On hover the heading turns navy and underlines.

### Margin Note
The proof beside a claim: BIZ UDPGothic label size in soft ink, a 2px hairline inline-start rule, 16px inline padding, at most 16rem wide, with an optional "Source" link in ink to the claim's entry on About.

### Season Band
Summer Journeys' table of twelve month columns in one row that scales and never wraps. Ink rules above and below the month header; hairline rules between location rows; July and August filled navy in the header and tinted navy down the rows. Lining tabular numerals, label size from 640px up, small below. An accessible `<table>` with a caption beneath it. Data cells show a dash until the temperature source is supplied.

### Photograph Frame (not yet built)
No photographs ship at launch and the frame component does not exist yet. The incumbent brief stands until it is built: fixed ratios only (3:2, 4:5, 16:9), square corners, caption "Place, Prefecture. Month." from the photography manifest, never full-bleed on both sides; in production an empty frame renders nothing and the layout closes up.

### Dev-only markers
Placeholder (`[[KEY]]`) and DRAFT copy render in development with a dashed outline in the surrounding ink and, for DRAFT, a small tag; the compliance guard fails any production build that contains them. They are tooling, not part of the visual system.

## Do's and Don'ts

### Do:
- **Do** put facts in the plate or the margin and claims in the main column.
- **Do** separate zones with mist and space first; draw a rule only between two facts.
- **Do** keep the framed double-rule plate to Home's hero, About's credentials and the footer.
- **Do** set the headline over a single 1px ink rule, not a double rule.
- **Do** keep the plate and all ruled objects square; give controls 6px.
- **Do** use navy only for interaction states and the summer months.
- **Do** use lining tabular numerals in anything tabular and oldstyle numerals in reading text.
- **Do** use logical properties only, and carry every visible string from `/content`.
- **Do** keep the one motion moment to Home and switch it off under `prefers-reduced-motion`.
- **Do** meet WCAG 2.2 AA: visible navy focus on everything focusable, a skip link, hairline and stone never used for text.

### Don't:
- **Don't** use icons, arrows on links or buttons, cards, shadows or gradients.
- **Don't** use all-caps, letter-spaced or eyebrow labels, or numbered markers.
- **Don't** centre layouts.
- **Don't** use Japan clichés (torii at sunset, geisha and the like).
- **Don't** add a dark mode.
- **Don't** show prices, "book now", pop-ups, badges or trust seals.
- **Don't** build a photo-led hero, or any layout that looks unfinished without a photograph.
- **Don't** animate anything else on load or scroll.
- **Don't** introduce a second accent colour or a shadow scale.

## Unresolved in the build

- Long plate labels ("Travel services manager, Tokyo", "Travel services manager, Osaka") wrap to two lines at 1440px inside the 13.75rem label column.
- The photograph frame component is not built.
- The earlier per-page layout sketches and photography brief from the previous DESIGN.md are not carried here as system rules; they belong in the surface briefs.
