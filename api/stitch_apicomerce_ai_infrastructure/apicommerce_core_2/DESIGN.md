---
name: APICommerce Core
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  container-max: 1440px
---

## Brand & Style

The design system is built on the principle of **Developer Experience (DX) Excellence**. It targets technical founders and engineers who value speed, clarity, and reliability. The aesthetic is a sophisticated blend of **Minimalism** and **Glassmorphism**, creating a workspace that feels like a high-end IDE—focused yet visually rewarding.

The personality is approachable but authoritative. By utilizing soft translucent layers and vibrant accents, we move away from the "cold" industrial feel of traditional API documentation toward a welcoming, premium service environment. The UI should evoke a sense of effortless power, where complex data flows are visualized with rhythmic clarity and breathing room.

## Colors

This design system defaults to a **Dark Mode** experience to reduce eye strain for developers working in low-light environments. 

- **Primary (Electric Blue):** Used for primary actions, progress indicators, and core navigation.
- **Secondary (Emerald Green):** Reserved for "Success" states, API health indicators, and uptime metrics.
- **Backgrounds:** We use a deep "Slate" palette. The canvas is nearly black to maximize contrast, while nested containers use progressively lighter shades of slate to establish hierarchy.
- **Gradients:** Subtle linear gradients (Primary to a slightly darker shade) are applied to buttons and active states to provide a tactile, "clickable" depth.

## Typography

Typography is used to clearly differentiate between UI instruction and technical data.

- **Inter** is the workhorse for all interface elements, labels, and documentation prose. Its high x-height ensures readability at small sizes in dense dashboards.
- **JetBrains Mono** is utilized strictly for technical data: API keys, code snippets, JSON responses, and numerical logs. This provides an immediate visual cue to the user that they are interacting with "raw" system data.
- **Headlines** utilize a tighter letter-spacing to feel more modern and authoritative on large screens.

## Layout & Spacing

The design system employs a **12-column fluid grid** for dashboard views and a **fixed-width centered grid** for documentation and settings pages. 

The spacing rhythm is based on an **8px base unit**. All padding, margins, and gaps must be multiples of 8 (8, 16, 24, 32, 48, 64) to maintain a consistent visual beat. 

- **Desktop:** 40px side margins with 24px gutters.
- **Tablet:** 24px side margins with 16px gutters.
- **Mobile:** 16px side margins. Layouts reflow to a single column; horizontal scrolling is permitted only for wide code snippets and data tables.

## Elevation & Depth

Hierarchy is established through **soft glassmorphism** and subtle "inner-glow" borders rather than heavy shadows.

- **Level 1 (Base):** The dark slate background.
- **Level 2 (Cards/Content):** A semi-transparent surface (`rgba(30, 41, 59, 0.7)`) with a `backdrop-filter: blur(12px)`.
- **Level 3 (Popovers/Modals):** Lighter transparency with a 1px solid border (`rgba(255, 255, 255, 0.1)`) to define the edge against the blurred background.
- **Shadows:** When used, shadows are "Ambient Blues"—low opacity, high-spread shadows that carry a slight blue tint (`rgba(0, 0, 0, 0.4)`) to maintain the cool-toned aesthetic.

## Shapes

The design system uses a **Rounded (8px base)** shape language to reinforce its friendly and modern SaaS personality. 

- **Standard Elements:** Buttons, Input fields, and small cards use a **0.5rem (8px)** radius.
- **Large Containers:** Dashboard widgets and main content areas use a **1rem (16px)** radius.
- **Interactive States:** On hover, interactive elements should not change their border radius, but may increase their "glow" or border-intensity.

## Components

### Buttons
Primary buttons use a subtle vertical gradient of Primary Blue. Secondary buttons are "Ghost" style—transparent with a 1px blue border. All buttons have a transition time of 200ms on hover.

### Code Blocks
The centerpiece of the UI. These must use the `background-canvas` color (darkest) to pop against the glassmorphic cards. Syntax highlighting should use the Emerald Green for strings and Primary Blue for functions.

### Input Fields
Inputs are dark with a subtle 1px border. On focus, the border glows with the Primary Blue and a subtle outer shadow. Use JetBrains Mono for inputs that require technical strings (e.g., Endpoint URLs).

### Chips & Status
- **Success:** Emerald Green background (low opacity) with Emerald Green text.
- **Error:** Soft Red with matching text.
- **System/Neutral:** Slate grey with JetBrains Mono font.

### Cards
Cards are the primary container. They feature the glassmorphism effect: 12px blur, 70% opacity background, and a "top-light" border (a 1px border that is slightly brighter on the top and left edges to simulate a light source).