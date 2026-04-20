# Architecture

**Analysis Date:** 2026-03-31

## Pattern Overview

**Overall:** Static Site Generation (SSG) with Progressive Enhancement

**Key Characteristics:**
- Astro-based static site generator for marketing landing page
- React islands for interactive client-side components
- Tailwind CSS with custom design tokens via OKLCH color space
- TypeScript strict mode throughout
- Scroll-triggered animations via Intersection Observer API
- Pre-rendered HTML with minimal JavaScript runtime

## Layers

**Presentation Layer:**
- Purpose: Render marketing sections, demo, pricing, comparison, analytics
- Location: `src/components/` and `src/pages/`
- Contains: Astro components (.astro files) for static sections, React components (.tsx) for interactive demos
- Depends on: Tailwind CSS theme variables, design system UI components
- Used by: Layout wrapper, page entry point

**Layout & Infrastructure:**
- Purpose: Provide HTML structure, global scripts, meta tags, font loading
- Location: `src/layouts/Layout.astro`
- Contains: Page shell, scroll animation setup, mobile nav interactivity, sticky nav state management
- Depends on: Global CSS with animations and theme configuration
- Used by: `src/pages/index.astro`

**Design System Layer:**
- Purpose: Reusable UI primitives and styling foundations
- Location: `src/components/ui/` (Card.astro, Button.astro, Badge.astro), `src/styles/global.css`
- Contains: Base color palette (Navy/Gold), typography definitions (Inter/Manrope), border radius scale, animation keyframes
- Depends on: Tailwind CSS and custom CSS variables
- Used by: All section and feature components

**Styling Engine:**
- Purpose: Color theming via OKLCH, animation definitions, base element styles
- Location: `src/styles/global.css`
- Contains: Theme variables (navy-950 through navy-50, gold-500 through gold-700, semantic colors), keyframe animations (fade-up, slide-in-left, slide-in-right), scroll behavior, font smoothing
- Depends on: Tailwind v4 @theme syntax, Google Fonts preconnect
- Used by: All components through CSS variables and class names

## Data Flow

**Page Initialization:**

1. Browser requests `/` → Astro pre-renders `src/pages/index.astro`
2. Layout wrapper loads `src/layouts/Layout.astro` → injects `<slot />`
3. Page composes sections: Nav, Hero, LogoCloud, Features, ChatDemo, Analytics, DeepDive, Comparison, Pricing, Footer
4. HTML streamed to client with embedded styles and fonts

**Scroll Animation Trigger:**

1. JavaScript observer in Layout (`IntersectionObserver`) watches `.animate-on-scroll` elements
2. When element enters viewport (threshold 0.1), `is-visible` class added
3. CSS animation `fade-up` or `slide-in-right` triggered via `.is-visible` selector
4. Animation completes, observer unobserves element

**Sticky Nav State:**

1. Scroll event listener monitors `window.scrollY`
2. RequestAnimationFrame prevents layout thrashing
3. When `scrollY > 60`, `.nav-solid` class added to `#main-nav`
4. Background opacity and styling updated via CSS

**Interactive Demo (ChatDemo Component):**

1. React component mounts when visible (`client:visible` directive)
2. IntersectionObserver triggers animation sequence start
3. Animation state machine runs through STEPS array
4. Each step controls typing, sending, thinking indicators, response display, confirm button
5. Timer refs prevent memory leaks on component unmount

**State Management:**

- Layout-level: Mobile menu toggle state via `.hidden` class, nav background state via `.nav-solid` class
- Component-level: ChatDemo manages animation state, typed text, thinking steps, visibility flags via React useState
- Global: CSS variables provide theme and timing constants

## Key Abstractions

**UI Components (Composable):**
- Purpose: Establish consistent button, card, and badge styling across sections
- Examples: `src/components/ui/Button.astro`, `src/components/ui/Card.astro`, `src/components/ui/Badge.astro`
- Pattern: Astro components with `Props` interface, optional className merging, slot-based content injection

**Section Components (Marketing):**
- Purpose: Self-contained, scrollable sections with distinct purposes (Hero, Features, Pricing, etc.)
- Examples: `src/components/Hero.astro`, `src/components/Features.astro`, `src/components/Pricing.astro`
- Pattern: Full-width sections with max-width container, semantic HTML structure, inline SVG icons, color-coded backgrounds

**Interactive Island (React):**
- Purpose: Animated chat demo showcasing invoice creation workflow
- Example: `src/components/ChatDemo.tsx`
- Pattern: React functional component with `client:visible` for hydration, managed animation state, ref-based timer cleanup

**Theme Token System:**
- Purpose: Centralized, maintainable color and spacing values
- Example: `src/styles/global.css` @theme block with OKLCH values
- Pattern: CSS custom properties (--color-*, --radius-*, --font-*) referenced in classes, avoids hardcoded values

## Entry Points

**Page Entry:**
- Location: `src/pages/index.astro`
- Triggers: Browser navigation to `/`
- Responsibilities: Import all section components, compose page structure with proper ordering (Nav → Hero → Features → Demo → Analytics → DeepDive → Comparison → Pricing → Footer), wrap in Layout

**Client JavaScript Entry:**
- Location: Script blocks in `src/layouts/Layout.astro`
- Triggers: Page load, DOM ready
- Responsibilities: Initialize scroll animation observer, setup sticky nav scroll listener, bind mobile menu toggle, all without dependencies on build-time scripts

**Astro Build Entry:**
- Location: `astro.config.mjs`
- Triggers: `npm run build`
- Responsibilities: Define React integration, Tailwind plugin setup, output directory configuration, static file generation

## Error Handling

**Strategy:** Graceful degradation via native browser APIs

**Patterns:**
- No try-catch blocks needed; IntersectionObserver automatically handles edge cases (null elements, removed targets)
- Mobile menu toggle uses optional chaining (`menuBtn && mobileMenu`) to prevent null reference errors
- React ChatDemo uses useRef to safely clear timers on unmount without race conditions
- CSS animation fallback via `@media (prefers-reduced-motion: reduce)` disables animations for accessibility

## Cross-Cutting Concerns

**Logging:** None required; static site with no runtime server communication

**Validation:** Form validation not implemented; landing page is read-only marketing content

**Authentication:** Not applicable; no user accounts or protected content

**Accessibility:**
- Semantic HTML (`<section>`, `<h1>`-`<h6>`, proper heading hierarchy)
- ARIA-implicit roles via button and link elements
- Reduced motion support via CSS `@media (prefers-reduced-motion: reduce)`
- Color contrast maintained through OKLCH theme selection
- Font sizes responsive via `sm:`, `lg:` breakpoints

**Internationalization:**
- Greek language (`lang="el"`) set in HTML root
- All visible text in Greek (UI) or English (brand/demo copy)
- Font stack supports extended Latin (Inter, Manrope from Google Fonts)

---

*Architecture analysis: 2026-03-31*
