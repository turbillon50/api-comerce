---
name: Obsidian Prism
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#b9cbbb'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#849586'
  outline-variant: '#3b4b3e'
  surface-tint: '#00e383'
  primary: '#f2fff1'
  on-primary: '#00391d'
  primary-container: '#00ff94'
  on-primary-container: '#00713f'
  inverse-primary: '#006d3c'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#fffbf9'
  on-tertiary: '#3c2f00'
  tertiary-container: '#ffdc71'
  on-tertiary-container: '#775f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#5bffa1'
  primary-fixed-dim: '#00e383'
  on-primary-fixed: '#00210e'
  on-primary-fixed-variant: '#00522c'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#ffe085'
  tertiary-fixed-dim: '#e5c45b'
  on-tertiary-fixed: '#231b00'
  on-tertiary-fixed-variant: '#574500'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

This design system establishes a "Shopify-meets-Web3" aesthetic, merging the reliable structure of global commerce with the futuristic energy of decentralized finance. The brand personality is **professional, high-tech, and transparent**. It targets a new generation of merchants and collectors who value precision, speed, and digital-native craftsmanship.

The visual style is a refined **Glassmorphism**, characterized by deep obsidian surfaces, subtle frosted transparency, and vibrant accents of electric emerald and ethereal violet. Elements feel like physical objects suspended in a digital void—lightweight but structurally sound. Grid patterns and 3D glass motifs provide a sense of mathematical order, while glowing gradients evoke the feeling of live, flowing data.

## Colors

The palette is anchored in **Deep Obsidian**, providing a high-contrast foundation that makes the accent colors vibrate. 

- **Primary (Electric Emerald):** Used for "Success" states, primary calls to action, and indicators of growth or "online" status.
- **Secondary (Ethereal Violet):** Used for technical features, governance, special utility actions, and brand-building flourishes.
- **Neutral:** A range of charcoal and obsidian greys used for surface layering and subtle borders.

The default mode is **Dark**. Light is not supported as the transparency and glow effects rely on the high-contrast dark background for depth.

## Typography

This design system utilizes a dual-font strategy to balance commerce clarity with technical precision. 

**Inter** is the workhorse font, used for all primary UI navigation, headings, and body copy. It ensures that complex dashboards remain readable and approachable.

**JetBrains Mono** is reserved for technical and crypto-specific data, such as wallet addresses, transaction hashes, token counts, and small metadata labels. This font choice signals the "Web3" identity of the platform, providing a "code-adjacent" feel that builds trust through transparency.

## Layout & Spacing

The layout philosophy is built on a **Modular Grid** with an 8px base unit. This ensures rhythmic consistency across all components.

- **Desktop:** A 12-column fluid grid with 24px gutters. Content is housed in "Glass Containers" that can span multiple columns. 
- **Mobile:** A 4-column grid with 16px margins. Complex data tables should collapse into "Mono Cards."
- **Rhythm:** Vertical spacing should strictly follow the 8px scale (8, 16, 24, 32, 48, 64, 80). Use generous whitespace to allow the background glowing gradients and grid patterns to breathe.

## Elevation & Depth

Visual hierarchy is established through **Glassmorphic Stacking**. Instead of traditional shadows, depth is conveyed via:

1.  **Backdrop Blurs:** Lower layers have a 12px blur; primary overlays (modals) use a 40px blur to isolate the user's focus.
2.  **Subtle Borders:** Every card or surface has a 1px solid border at 10% white opacity, simulating the "edge" of a glass pane.
3.  **Inner Glows:** Interactive elements use a subtle inner stroke of Electric Emerald or Ethereal Violet to indicate focus or activity.
4.  **Z-Index Shading:** Higher-elevation elements have a slightly lighter obsidian fill (higher transparency) than those below them.

## Shapes

The shape language is **Sharp but Modern**. An 8px (0.5rem) radius is used for all primary containers, buttons, and input fields. This "Medium Rounded" approach maintains the professional, structural integrity of a commerce platform while avoiding the aggressive "tech-brutalist" sharp corners. 

Use pill-shapes (full rounded) only for status indicators (chips) and small tags to differentiate them from actionable buttons.

## Components

### Buttons
Primary buttons use a high-vibrancy gradient from Electric Emerald to Ethereal Violet with black text for maximum contrast. Secondary buttons are "Ghost Glass"—transparent with a subtle 1px border and white text.

### Cards
Cards are the core of the UI. They must feature a `backdrop-filter: blur(20px)` and a subtle `linear-gradient` border. For high-priority items, add a faint "outer glow" using the primary color.

### Data Inputs
Input fields should appear "sunken" into the obsidian surface. Use a dark background and an Electric Emerald bottom-border on focus. Placeholder text should use JetBrains Mono at 50% opacity.

### Chips & Badges
Small, pill-shaped indicators for transaction status (e.g., "Confirmed", "Pending"). These use low-opacity fills of the accent colors with high-vibrancy text.

### Lists & Tables
Lists should be separated by 1px obsidian dividers. Data columns containing hashes or currency values must use JetBrains Mono to ensure numerical alignment.