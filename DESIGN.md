---
name: Issac Ng — Developer
description: A blue technical notebook for practical software and explorations.
colors:
  blue: "#2046c8"
  ice: "#eaf0fb"
  ink: "#111827"
  yellow: "#f5ff3b"
  muted: "#43506c"
  line: "#bac8e4"
  white: "white"
  blue-body: "#f1f5ff"
  blue-footnote: "#e1eaff"
  filter-hover: "#d5e0f6"
  graphic-data: "#dce6fa"
  graphic-knowledge: "#dfe5f3"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(3rem, 6.1vw, 6rem)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(32px, 3.7vw, 54px)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-.035em"
  title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "35px"
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "-.035em"
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  filter: "5px"
  circle: "50%"
spacing:
  filter-gap: "8px"
  text-gap: "18px"
  section-gutter-mobile: "24px"
  project-gap: "48px"
components:
  primary-link:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    padding: "17px 26px"
  primary-link-hover:
    backgroundColor: "{colors.white}"
  contact-link:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    padding: "14px 20px"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.filter}"
    padding: "11px 18px"
  filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  map-node:
    backgroundColor: "{colors.ice}"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    padding: "14px"
    width: "45%"
  map-node-selected:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
---

# Design System: Issac Ng — Developer

## Overview

**Creative North Star: "Blue technical notebook"**

Saturated fields, heavy Archivo headings, precise outlined geometry, and small yellow points give the portfolio its character. Content remains plain and readable: generous project rows pair abstract diagrams with descriptions and expandable notes.

**Key Characteristics:**

- Cobalt and ice-blue fields with yellow actions and diagram markers.
- Heavy, tightly spaced headings beside regular-weight body text.
- Flat rectangles, circular controls, and thin dividing lines.

## Colors

### Primary

Cobalt blue anchors the introduction and about section; it also colors technology labels, links, outlines, and selected map nodes. Electric yellow marks primary actions and small points in the diagrams.

### Neutral

Ice is the page and resting map-node surface. Ink supplies text and selected filters; muted blue-gray supplies supporting text. The line color divides projects. White and the two pale text colors support content on cobalt. Data and knowledge graphics use their own pale blue fields; filters have a pale hover fill.

## Typography

Archivo is locally served in regular (400) and black (900), with Arial and sans-serif fallbacks. Headings use the display, headline, and title roles above; all balance text. The introduction uses larger body text (21px, line-height 1.55, maximum 53ch). Project descriptions use the body role with a maximum of 60ch; about copy stops at 58ch. Brand lettering is heavy (27px, letter-spacing -.025em); map titles are heavy (23px, -.03em).

The about heading uses its own fluid size (clamp(34px, 3.8vw, 55px), line-height 1.12). Supporting labels range from 12px to 14px. Responsive overrides are documented below rather than represented as a second token scale.

## Layout

The desktop hero uses a 64%/36% split and a maximum width of 1800px. Content sections use a centered container (maximum 1280px, viewport minus 96px). Work rows use a 42% graphic column and flexible copy column, separated by 48px. About uses equal columns with a 70px gap. Work section padding is 64px above and 72px below; about uses 70px vertically.

At 701–1100px, the hero becomes 60%/40%, content gutters become 32px, project gaps become 30px, and section headings stack. The display becomes clamp(48px, 6.7vw, 72px).

At 700px and below, hero, project rows, and about stack into single columns. Gutters become 24px; the map is capped at 360px. All navigation links and map nodes remain visible, while navigation icons disappear. Display size becomes clamp(42px, 10.6vw, 64px) with line-height 1.04; section titles become 36px, project titles 30px, and about heading 37px. Project body text becomes 15px. Work padding becomes 38px/40px; about uses 44px vertically. Filters wrap, with smaller padding (10px 11px).

Above 1100px, each display line stays unbroken. At 1800px and above, the outer page changes to the data-graphic blue and main/footer are capped at 1800px.

## Elevation & Depth

There are no shadows. Depth comes from saturated and pale fields, thin project dividers, overlapping circular map geometry, and foreground diagram points.

## Shapes

Action links and graphic panels have square corners. Filter controls use the small rounded token; map controls and brand points are circles. Map nodes have a thin outline (1.5px); project rows use a single top divider (1px). SVG illustrations use thin lines, dashed orbits, and small filled markers.

## Components

- **Action links:** Yellow rectangles with ink text, black-weight labels, and outlined arrow icons. Hover turns the background white. The primary action scrolls to work; contact goes to GitHub.
- **Map:** Three circular buttons surround outlined orbital geometry. Hover and selection turn a node cobalt with white text and a yellow icon. Nodes and filters share the same selected area; selecting an already selected node resets to All. Node background/text transition over .22s. A yellow orbit point rotates over 25s, linearly and continuously.
- **Filters:** Transparent, muted controls become ink with white text when selected. Hover uses the pale fill. Selection filters the project rows and updates a status count; selected state is exposed through `aria-pressed`.
- **Project rows:** Flat graphic/copy pairs with top dividers. Illustrations are decorative. Each row has a native disclosure labeled “Behind the work”; its plus changes to a minus when open. Only a project with a repository URL gets the repository link.
- **Navigation:** Inline text links; hover underlines them. Internal anchors use smooth scrolling with 24px scroll padding. The footer returns to the introduction.
- **Keyboard access:** Buttons, links, and summaries share a current-color focus outline (3px, offset 6px). The skip link sits offscreen until focused, then appears at the upper left. Reduced-motion preferences disable smooth scrolling, orbit animation, and map-node transitions.

## Do's and Don'ts

- **Do** keep real content and interactive controls in semantic HTML; use SVG for the decorative technical geometry.
- **Do** retain visible keyboard focus, selected-state semantics, and the reduced-motion behavior.
- **Don't** replace the abstract diagrams with fabricated product screenshots.
- **Don't** add visual metrics or testimonials without real evidence.
