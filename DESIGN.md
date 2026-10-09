---
name: Prakrit Solutions
description: A calm, exact, honest software studio site: paper and midnight ink, one signal blue, real app screens as proof.
colors:
  midnight-ink: "#091127"
  midnight-ink-soft: "#111930"
  chalk-paper: "#fafaf8"
  ledger-paper: "#eeede6"
  slate-text: "#5d5f68"
  slate-text-on-ink: "#a3a5ae"
  signal-blue: "#0032ea"
  signal-blue-pressed: "#002a9f"
  signal-blue-wash: "#e6eaf7"
  cyan-spark: "#18fafd"
  confirm-green: "#1fa97e"
  confirm-green-wash: "#e7f6f0"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.25rem"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.25
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.14em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "18px"
  xl: "28px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.midnight-ink}"
    textColor: "{colors.chalk-paper}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.signal-blue}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.midnight-ink}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-inverse:
    backgroundColor: "{colors.chalk-paper}"
    textColor: "{colors.midnight-ink}"
    rounded: "{rounded.sm}"
    padding: "14px 24px"
  input-field:
    backgroundColor: "{colors.chalk-paper}"
    textColor: "{colors.midnight-ink}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  card:
    backgroundColor: "{colors.chalk-paper}"
    textColor: "{colors.midnight-ink}"
    rounded: "{rounded.lg}"
    padding: "32px"
  cta-band:
    backgroundColor: "{colors.midnight-ink}"
    textColor: "{colors.chalk-paper}"
    rounded: "{rounded.xl}"
    padding: "80px 64px"
---

# Design System: Prakrit Solutions

## Overview

**Creative North Star: "The Engineer's Ledger"**

The site reads like a well-kept working document: warm paper, ruled hairlines, midnight-ink type and a single precise blue. Structure is drawn with 1px lines and tonal steps instead of shadows, so the layout feels measured and legible rather than decorated. Proof comes from real App Store screens, never stock imagery. The voice is calm, exact and honest, and the visuals match it: nothing is louder than the work it points to.

The system is light by default. Midnight-ink bands (the automation section, the closing call to action, the About hero panel and the footer) are deliberate rhythm, not theme switching. A single logo chevron, used large and faint, is the only brand ornament.

Confirmed visual rejection: nothing in the purple or blue startup-gradient, glow-and-neon family.

**Key Characteristics:**
- Warm off-white paper and midnight ink, never pure white or pure black.
- One signal blue for action and attention; cyan only on midnight bands.
- Hairline borders and tonal layering carry structure.
- Geist for reading, Geist Mono for small labels, data and the wordmark.
- Real app screens, with tinted soft shadows, are the only imagery.
- Motion is brief and functional: 160ms state changes, one scroll-in reveal.

## Colors

A restrained paper-and-navy palette with one saturated accent.

### Primary
- **Signal Blue** (#0032ea): links, current-state text, eyebrow labels, check marks and the hover fill of the primary button. It marks action and attention, never decoration. Its pressed shade is **Signal Blue Pressed** (#002a9f); its tint is **Signal Blue Wash** (#e6eaf7), used for selected chips and the highlighted step in diagrams.

### Secondary
- **Cyan Spark** (#18fafd): appears only on midnight-ink bands, as the eyebrow dot, flow arrows and the cyan end of the logo gradient. Whether it stays as a second accent is an open design decision.

### Neutral
- **Midnight Ink** (#091127): body text, headings, the primary button and every dark band. Its softer companion **Midnight Ink Soft** (#111930) lifts cards inside a dark band.
- **Chalk Paper** (#fafaf8): the page background and card fill.
- **Ledger Paper** (#eeede6): alternating section bands and panels that sit one tonal step below the page.
- **Slate Text** (#5d5f68): secondary copy and placeholders on paper. **Slate Text on Ink** (#a3a5ae) is its counterpart on midnight bands.
- **Confirm Green** (#1fa97e) with **Confirm Green Wash** (#e7f6f0): success states only, such as the form confirmation icon.
- **Hairlines:** a family of translucent ink and paper lines (16% default, 40% strong, 10% soft on paper; 14% and 8% on ink) draws every border.

### Named Rules
**The One Blue Rule.** Signal blue means "act here" or "this is current". It never fills large areas and never decorates.

**The Hairline Rule.** Borders are 1px translucent ink. A stronger line (40%) is reserved for form fields and secondary buttons.

**The Navy Band Rule.** Dark midnight sections are a deliberate rhythm used a few times per page. Do not add one without a reason.

## Typography

**Display Font:** Geist (with system sans fallback)
**Body Font:** Geist (with system sans fallback)
**Label/Mono Font:** Geist Mono (with system monospace fallback)

**Character:** Geist is neutral and precise, so tight tracking and medium weight give headings presence without decoration. Geist Mono marks anything labelled, measured or named: eyebrows, step numbers and the company wordmark.

### Hierarchy
- **Display** (500, 3.25rem at large screens, 1.1): page headers. Scales from 2.25rem on phones through 3rem. Tracking -0.02em, balanced wrapping.
- **Headline** (500, 2.75rem at large screens, 1.15): section headings. Scales from 1.875rem. Tracking -0.02em.
- **Title** (500, 1.5rem, 1.25): card titles and sub-sections.
- **Body** (400, 1.125rem, 1.625): lead paragraphs under headings, in Slate Text, kept to about 65ch. Case-study body text drops to 1rem below 768px. Compact body is 0.9375rem.
- **Label** (400, 0.75rem mono, 0.14em, uppercase): eyebrows, step numbers, table-style labels. The wordmark uses mono at 1rem, 1.125rem from 1024px.

### Named Rules
**The Quiet Label Rule.** Mono labels stay at 12px or larger and in Slate Text or Signal Blue. They never carry long text.

## Layout

A fluid container up to 1,920px with a side gutter of `clamp(1.5rem, 4vw, 4.5rem)`, so navbar, content and footer share the same edges. Sections have 48px vertical padding on phones and 96px from tablet up, separated by a hairline. Text blocks keep their own measure (about 65 to 75 characters) inside the wide container. Grids are two to three columns on desktop and a single column on phones; page headers can carry a right-hand aside on large screens. The header is sticky, 64px tall on phones and 80px on desktop. Breakpoints follow Tailwind's defaults, plus one custom stop at 1,500px for single-line rows.

## Elevation & Depth

Depth is mostly tonal. The page is Chalk Paper, panels step down to Ledger Paper, and dark bands are Midnight Ink, with 1px hairlines between them. Shadows are rare and tinted: soft, long-offset shadows sit under real app screens and phone illustrations, and the primary button carries a one-pixel contact line. Cards do not cast shadows; they gain a blue border on hover.

### Shadow Vocabulary
- **App screen** (`box-shadow: 0 18px 30px -20px rgba(9, 17, 39, 0.5)`): under screenshots in the hero collage and case-study card thumbnails.
- **Device illustration** (`box-shadow: 0 20px 45px -25px rgba(11, 13, 18, 0.35)`): under the phone and browser mock-ups on the Services page.
- **Button contact line** (`box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.05)`): under the primary button only.

### Named Rules
**The Flat Card Rule.** Cards stay flat at rest. Only imagery of real apps gets a shadow.

## Shapes

Corners step up with the size of the container: 6px for buttons and inputs, 10px for thumbnails and small tiles, 18px for cards and panels, 28px for the call-to-action band. Chips and badges are fully rounded. Borders are always 1px hairlines. The signature silhouette is the logo chevron, used as a large cropped mask.

## Components

### Buttons
- **Shape:** gently squared (6px radius).
- **Primary:** Midnight Ink fill, Chalk Paper text, 10px by 20px padding (14px by 24px for the large size). On hover the fill turns Signal Blue and the button lifts 2px.
- **Pressed:** scale 0.98 with the lift cancelled; transitions are 160ms ease-out.
- **Secondary:** transparent with a strong hairline border that darkens to ink on hover.
- **Inverse / Inverse outline:** Chalk Paper fill or paper-tinted outline, used on Midnight Ink bands.
- **Ghost:** text only, turns Signal Blue on hover.

### Chips
- **Style:** fully rounded pills with a hairline border and small Slate Text; on the form, the selected state takes a Signal Blue border with the blue wash fill.
- **State:** the automation example chips on Solutions are static labels in a grid; the form's service chips are toggles.

### Cards / Containers
- **Corner Style:** 18px.
- **Background:** Chalk Paper, or Ledger Paper for panels.
- **Border:** 1px hairline; Signal Blue on hover for linked cards.
- **Internal Padding:** 28px on phones, 32px from tablet up.
- **Case-study cards** open with a 16:10 panel on Ledger Paper that holds three real app screens.

### Inputs / Fields
- **Style:** Chalk Paper fill, strong hairline border, 6px radius, 12px by 16px padding.
- **Focus:** the border turns Signal Blue with a 2px blue focus outline offset 2px.
- **Error:** inline message under the field, and focus moves to the first invalid field.

### Navigation
- **Style:** sticky bar on Chalk Paper at 80% opacity with a medium blur and a soft hairline underneath. Links are 15px, Slate Text, turning Signal Blue on hover; the current page is Midnight Ink and medium weight. The wordmark pairs the logo mark with "Prakrit Solutions" in mono. On phones the links collapse into a full-screen menu opened by a 44px button.

### Brand mark panel (signature component)
The logo chevron drawn as a single-colour mask in paper colour at about 7% opacity, cropped off a corner of a Midnight Ink panel. It is used only on the About hero and the closing call-to-action band.

### App screen collage (signature component)
A tilted grid of real App Store screens in the home hero, with a small "On the App Store" badge.

## Do's and Don'ts

### Do:
- **Do** build structure from 1px hairlines and tonal steps between Chalk Paper, Ledger Paper and Midnight Ink.
- **Do** use Signal Blue only for action, links and the current state.
- **Do** show real App Store screens for proof, with the soft tinted shadow.
- **Do** keep body copy plain and exact, in Slate Text on paper.
- **Do** make every touch target at least 44px.

### Don't:
- **Don't** use purple, glowing or neon startup gradients.
- **Don't** put an eyebrow label above every section heading.
- **Don't** give cards drop shadows or glass blur.
- **Don't** use stock photography or abstract 3D imagery.
- **Don't** use pure white (#ffffff) or pure black (#000000); use Chalk Paper and Midnight Ink.
- **Don't** add non-English script text as decoration.
