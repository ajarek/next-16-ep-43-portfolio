---
name: AJAREK DEV
colors:
  surface: '#141218'
  surface-dim: '#141218'
  surface-bright: '#3b383e'
  surface-container-lowest: '#0f0d13'
  surface-container-low: '#1d1b20'
  surface-container: '#211f24'
  surface-container-high: '#2b292f'
  surface-container-highest: '#36343a'
  on-surface: '#e6e0e9'
  on-surface-variant: '#cbc4d2'
  inverse-surface: '#e6e0e9'
  inverse-on-surface: '#322f35'
  outline: '#948e9c'
  outline-variant: '#494551'
  surface-tint: '#cfbcff'
  primary: '#cfbcff'
  on-primary: '#381e72'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#6750a4'
  secondary: '#cdc0e9'
  on-secondary: '#342b4b'
  secondary-container: '#4d4465'
  on-secondary-container: '#bfb2da'
  tertiary: '#e7c365'
  on-tertiary: '#3e2e00'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#141218'
  on-background: '#e6e0e9'
  surface-variant: '#36343a'
typography:
  display-xl:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  code:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container_max_width: 1200px
  gutter: 24px
  margin_mobile: 20px
  margin_desktop: 40px
  section_gap: 120px
---

## Brand & Style
The design system embodies a premium, developer-centric aesthetic that balances extreme technical precision with atmospheric elegance. It is designed to evoke a sense of high-performance craftsmanship and "future-noir" sophistication.

The style is a hybrid of **Minimalism** and **Glassmorphism**, leaning heavily into high-end "Dark Mode" patterns found in elite developer tools. It utilizes deep spatial depth, monochromatic foundations, and high-energy color accents to direct focus. Visual interest is generated through light—specifically simulated refraction, glow, and spotlighting—rather than heavy textures or illustrative elements.

## Colors
The palette is centered on a "Void" foundation—a deep, obsidian background that allows gradients and glass surfaces to pop.

- **Foundational Neutral:** Use `#050816` for the primary canvas. Secondary surfaces should use slightly lighter variations or translucent overlays to maintain depth.
- **Electric Gradients:** The core visual identity is driven by a linear gradient flowing from Purple (#8B5CF6) to Blue (#3B82F6) to Turquoise (#06B6D4). This gradient should be used sparingly for primary actions, progress indicators, and decorative "glow" hits.
- **Glass Surfaces:** Use a semi-transparent slate-blue for card backgrounds to simulate thick, smoked glass.
- **Accents:** Use pure white (#FFFFFF) for primary text and a muted gray-blue (#94A3B8) for secondary information.

## Typography
The system uses **Geist** to provide a technical, monospaced-adjacent feel while maintaining the legibility of a high-end sans-serif.

- **Tight Tracking:** Headlines should use negative letter spacing to create a compact, "designed" look typical of modern SaaS platforms.
- **Hierarchy:** Use large font size differentials between headers and body text. 
- **Labels:** Use uppercase for small labels and "Overlines" to categorize content types.
- **Contrast:** Ensure body text never drops below 60% opacity to maintain accessibility against the dark background.

## Layout & Spacing
The layout follows a strict 8px/4px geometric grid. 

- **The Grid Backdrop:** Implement a subtle SVG grid pattern (1px stroke, low opacity) across the main background to reinforce the "Developer" theme.
- **Sectioning:** Use generous vertical whitespace (120px+) between major sections to allow the glass elements to "breathe."
- **Alignment:** Centralize hero content for impact; use a 12-column grid for project showcases and blog feeds.
- **Mobile:** Transition from multi-column layouts to a single stack at 768px.

## Elevation & Depth
Depth is achieved through layering and light, not traditional shadows.

- **The Glass Stack:** Level 0 is the background grid. Level 1 is a translucent card (`backdrop-filter: blur(12px)`). Level 2 is the content.
- **Spotlight Effect:** Use a dynamic mask that follows the cursor, revealing a faint gradient glow behind the glass cards.
- **Glow Borders:** Use a 1px border with a linear gradient. For active states, increase the border opacity and add a subtle `box-shadow` with the primary color and a 20px blur to simulate a neon glow.
- **Shadows:** Avoid pitch-black shadows. Use ultra-soft, large-radius colored blurs that match the primary/secondary palette.

## Shapes
Shapes are generous and organic to offset the technical "coldness" of the dark palette.

- **Cards:** Use `rounded-xl` (1.5rem / 24px) or `32px` for main project containers.
- **Buttons:** Use fully rounded (pill) shapes for primary actions to distinguish them from structural elements.
- **Inputs:** Use standard `rounded-lg` (1rem) for form fields.

## Components

- **Glass Cards:** The primary container. Features a `1px` semi-transparent border, `12px` backdrop blur, and a subtle "noise" texture overlay at 2% opacity to enhance the glass feel.
- **Primary Button:** Gradient background (Purple-Blue-Turquoise) with white text. On hover, increase the brightness and add a concentrated glow shadow.
- **Secondary Button:** Ghost style. Transparent background with a `1px` white or blue-toned border.
- **Project Chips:** Small, pill-shaped tags with a low-opacity version of the primary colors (e.g., Purple at 10% alpha) and matching text color.
- **Bento Grid:** A specific layout component using various card sizes (spanning 1x1, 2x1, or 2x2) to showcase diverse portfolio items.
- **Interactive Code Block:** A window-style component with "traffic light" close/minimize buttons and syntax-highlighted Geist Mono text.