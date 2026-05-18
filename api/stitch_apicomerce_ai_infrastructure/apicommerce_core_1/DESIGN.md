---
name: APICommerce Core
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#b9cbbb'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#849586'
  outline-variant: '#3b4b3e'
  surface-tint: '#00e383'
  primary: '#f2fff1'
  on-primary: '#00391d'
  primary-container: '#00ff94'
  on-primary-container: '#00713f'
  inverse-primary: '#006d3c'
  secondary: '#b9f1ff'
  on-secondary: '#00363f'
  secondary-container: '#00e0ff'
  on-secondary-container: '#005f6d'
  tertiary: '#fffaff'
  on-tertiary: '#4f0077'
  tertiary-container: '#f3d5ff'
  on-tertiary-container: '#9900e2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#5bffa1'
  primary-fixed-dim: '#00e383'
  on-primary-fixed: '#00210e'
  on-primary-fixed-variant: '#00522c'
  secondary-fixed: '#a5eeff'
  secondary-fixed-dim: '#00daf8'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#004e5a'
  tertiary-fixed: '#f5d9ff'
  tertiary-fixed-dim: '#e5b4ff'
  on-tertiary-fixed: '#30004b'
  on-tertiary-fixed-variant: '#7000a7'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.08em
  stats-lg:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: -0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 16px
  margin: 32px
---

## Brand & Style

This design system is engineered for high-performance AI infrastructure. It draws inspiration from mission-critical trading terminals and cloud orchestration dashboards (AWS/GCP), prioritizing information density, low latency perception, and analytical clarity.

The aesthetic is **Modern Technical**, characterized by a deep-dark canvas, razor-sharp hierarchy, and functional glassmorphism. It evokes a "living system" feel—precise, automated, and professional. The UI should feel like a high-end tool for engineers, where every pixel serves a functional purpose and the complexity of AI infrastructure is mapped into a legible, navigable space.

## Colors

The palette is anchored in a "Deep Dark" foundation to minimize eye strain during long engineering sessions. 

- **Primary (Neon Green):** Represents system health, success, and active pipelines.
- **Secondary (Electric Blue):** Used for informational data, primary actions, and connectivity indicators.
- **Tertiary (Vivid Violet):** Reserved for AI-specific processing states and intelligence-driven insights.
- **Neutrals:** A range of deep graphites and blacks to create structural depth.

Functional colors (Success, Warning, Error) should maintain high saturation against the dark background to ensure immediate recognition of system anomalies.

## Typography

The system utilizes a dual-font strategy. **Inter** provides high legibility for UI navigation, descriptions, and headers. **JetBrains Mono** is employed for all technical data, code snippets, status indicators, and metric readouts, reinforcing the engineering-first nature of the product.

Hierarchy is strictly enforced through weight and letter spacing rather than excessive size shifts to maintain a compact, "dashboard" density. All labels for data points should use the `label-caps` style for a structured, metadata-rich appearance.

## Layout & Spacing

This design system uses a **Fluid Technical Grid** based on an 8px square unit. The layout is optimized for density, allowing users to monitor multiple streams of data simultaneously.

- **Desktop:** 12-column grid with 16px gutters and 32px margins. 
- **Panels:** Sidebars and utility drawers use fixed widths (280px - 320px) to ensure code and data visualizations remain readable.
- **Reflow:** On smaller viewports, cards stack vertically, but the typography remains small and precise (no "jumbo" mobile scaling) to preserve the professional tool aesthetic.

Layouts should favor structural alignment over whitespace, using thin borders and subtle background shifts to define zones.

## Elevation & Depth

Depth is conveyed through **Tonal Layering** and **Luminous Accents** rather than traditional soft shadows.

1.  **Level 0 (Base):** Deepest black (#050505), used for the primary background.
2.  **Level 1 (Surface):** Subtle graphite (#121214), used for cards and main containers.
3.  **Level 2 (Active/Hover):** Lighter graphite (#1A1A1D) with a 1px border.
4.  **Glassmorphism:** Overlays, modals, and dropdown menus use a semi-transparent surface (60% opacity) with a high-density backdrop blur (20px) to maintain context of the underlying data.

Glows (inner and outer) are used sparingly on active status indicators or primary buttons to simulate a "living" hardware terminal.

## Shapes

The shape language is **Soft Technical**. Corners are slightly rounded (4px) to avoid the aggression of sharp points while maintaining a disciplined, structured appearance. 

Buttons, input fields, and cards all follow this consistent 4px radius. Status indicators and small tags may use a full pill-shape to distinguish them from structural layout elements. Grids should be rendered with 1px hairlines to emphasize the engineering precision.

## Components

- **Data-Heavy Cards:** Feature a header row with `label-caps` metadata and a `stats-lg` primary metric. Use subtle 1px borders (#242427).
- **Status Indicators:** Small circular dots or pill-shaped tags using JetBrains Mono. Primary (Success), Secondary (Info), and Error colors must be vibrant.
- **Input Fields:** Darker than the card surface, with a 1px border that glows `secondary` on focus. Use monospaced font for value input.
- **Buttons:** 
    - *Primary:* Solid fill with black text.
    - *Ghost:* 1px border with monochromatic text, shifting to themed color on hover.
- **Pipeline Visualizations:** Use thin lines (1px) with animated "pulses" in primary/tertiary colors to indicate active data flow.
- **Code Blocks:** Integration of syntax highlighting that matches the system's neon accents, set against a Level 0 background.