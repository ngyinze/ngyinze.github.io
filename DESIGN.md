---
name: Isaac Ng — Folding Workspace
description: A tactile three-dimensional introduction with a clear portfolio of practical software work.
colors:
  blue: "#2046c8"
  ice: "#eaf0fb"
  ink: "#111827"
  yellow: "#f5ff3b"
  muted: "#435675"
  line: "#bdcbe3"
  control-rest: "#dfe7f6"
  control-hover: "#d0ddf4"
  about-body: "#edf2ff"
  white: "white"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(40px, 4.5vw, 72px)"
    fontWeight: 900
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(36px, 4vw, 56px)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  project-title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "38px"
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  project-summary:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "23px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
rounded:
  filter: "5px"
  discipline: "40px"
  brand-dot: "50%"
spacing:
  filter-gap: "8px"
  discipline-gap: "10px"
  action-gap: "28px"
  page-gutter: "56px"
  page-gutter-tablet: "32px"
  page-gutter-mobile: "20px"
components:
  primary-link:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.ink}"
    padding: "17px 24px"
  primary-link-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  discipline:
    backgroundColor: "{colors.control-rest}"
    textColor: "{colors.ink}"
    rounded: "{rounded.discipline}"
    padding: "14px 22px"
  discipline-selected:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.filter}"
    padding: "11px 17px"
  filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
---

# Design System: Isaac Ng — Folding Workspace

## Overview

**Creative North Star: "Folding Workspace"**

A physical folding workspace introduces Isaac's desktop, data, and knowledge interests. Cobalt panels and yellow hinges provide the memorable object; heavy Archivo headings and a pale ice surface keep the surrounding interface clear. The direction is the user's selected third generated concept, carried into real interactive Three.js geometry.

Recruiters can read the selected work, role, technologies, approach, and public evidence without manipulating the model. The project collection stays independent of the three discipline faces so new entries add useful evidence without expanding the sculpture.

**Key Characteristics:**

- Cobalt three-panel sculpture on a pale ice ground, with yellow edges and hinges.
- Heavy, tightly tracked Archivo headings above quieter factual metadata.
- Flat, divided project rows with readable role and technology information.
- Direct manipulation in the hero; immediate, semantic controls throughout.

## Colors

### Primary

Cobalt (`blue`) colors the physical panels, selected discipline, technology labels, and full-width About field. Its pale ice counterpart is the continuous page surface.

### Secondary

Electric yellow (`yellow`) belongs to the sculpture's thin edges and hinge pins, primary actions, the small brand dot, and text selection. Keep it purposeful and readable with ink text.

### Neutral

Ink supplies primary copy and selected archive filters. Muted blue-gray supports descriptions and factual metadata. The line color provides thin dividers; control-rest and control-hover distinguish discipline buttons. White supplies text on cobalt and ink. About body copy uses about-body.

## Typography

Self-hosted Archivo Regular (400) and Archivo Black (900), with Arial/sans-serif fallback and font synthesis disabled. The compressed heavy hierarchy supplies character; regular body text carries the evidence.

The desktop hero display uses the frontmatter display role. The featured title uses `clamp(35px, 3.5vw, 56px)` at 1.1 line-height. Archive headings use the headline role; project titles use project-title. Introductory copy is 20px/1.6, project summaries 23px/1.4, project explanations 15px/1.65, and metadata 12–14px. Descriptions remain around 68ch maximum; compact summaries are around 38–45ch.

At 1100px and below the hero display becomes `clamp(36px, 4.5vw, 50px)` and intro copy 17px. At 760px and below the display is `clamp(35px, 8.3vw, 56px)`, project titles 32px, and project summaries 21px. Project titles and featured titles precede their factual classification labels.

## Layout

The centered page wrapper is `calc(100% - 112px)` with a 1440px maximum. Desktop hero composition is 60% sculpture / 40% introduction and featured project, with a 760px minimum height. The model stage is 490px high. At 1600px and above the hero minimum is 850px and model stage 550px.

At 1100px and below the page gutters become 32px, the hero columns 56% / 44%, and the model stage 420px. At 760px and below gutters become 20px and the hero stacks introduction, model, then featured work; the stage is 320px high. At 360px and below it is 275px. Preserve the entire sculpture using camera framing rather than cropping it.

The work toolbar pairs wrapping filters with an underlined search field. Project rows use 35% / remaining-width columns with an 8% column gap, a top divider, and 44px/50px block padding. On mobile the toolbar and project rows stack, with 26px between heading and body. About uses two columns on desktop and one on mobile. This is a continuous document of divided rows, not a grid of boxed cards.

## Elevation & Depth

Interface elements remain flat: there are no CSS box-shadow tokens. Depth belongs to the Three.js sculpture, whose rounded thick panels use physical lighting, a room environment, yellow inserts, embossed discipline motifs, and a soft contact-shadow plane. The generated transparent poster is reserved for loading or unavailable WebGL. Do not turn the sculpture into a static replacement for supported visitors.

## Shapes

Square-corner yellow action links contrast with 40px-radius discipline pills and compact 5px-radius archive filters. Thin dividers structure the page without enclosing each project. The only interface circle is the small brand dot. In the scene, three thick rounded rectangles form a hinged concertina; they represent disciplines rather than individual projects.

## Components

- **Primary/contact action:** yellow with ink text, Archivo Black 15px, `17px 24px` padding, and a 54px minimum height. Hover becomes ink with white text. Arrow icons clarify direction.
- **Discipline controls:** native buttons with light icons, 52px minimum height on desktop (47px on mobile), a pale resting surface, and cobalt/white selection. Selection changes the featured work and physical fold; it does not filter the archive until the project action is used.
- **Folding model:** horizontal drag turns and folds the geometry; panel clicks and Left/Right/Home keys select disciplines. Reset returns to Desktop. Reduced motion makes transitions immediate and removes idle refresh. Visible idle refresh is 4fps; hidden/offscreen rendering stops. An unavailable model shows the poster, button-based navigation, matching instruction text, and no Reset control.
- **Archive filters/search:** four area choices, combined with case-insensitive project/skill search. Result count uses a polite status region. Empty results offer a Show all work reset. Archive selection stays independent of the hero.
- **Project row:** title, kind, technology list and public repository link beside summary, explanation, role and focus. Native Behind the work disclosure contains approach and provenance. Never replace the evidence with decorative animation.
- **Navigation:** compact Work, About, and GitHub links; brand returns to top. A keyboard skip link jumps directly to work. Anchors scroll immediately rather than using a staged reveal.
- **Focus:** 3px cobalt outlines with 5px offset on interactive controls, including the canvas. Focus on About links is white against cobalt. Preserve `aria-pressed`, semantic headings, native disclosures, and the live featured summary.

## Do's and Don'ts

### Do:

- Do keep project titles above classification metadata, and make role, technologies, and evidence easy to find.
- Do keep the three disciplines stable while adding projects to the independent searchable collection.
- Do preserve native links, buttons, disclosures, visible keyboard focus, and the unavailable-model fallback.
- Do use real project provenance and distinguish professional practice, maintained forks, and ongoing explorations.

### Don't:

- Don't gate portfolio content or contact behind the 3D interaction.
- Don't add generic scroll reveals or delayed text entrances.
- Don't fabricate metrics, testimonials, employment details, product screenshots, or a resume download.
- Don't expose company source, internal issues, private repositories, or a public email address.
