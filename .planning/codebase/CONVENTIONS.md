# Coding Conventions

**Analysis Date:** 2026-03-31

## Naming Patterns

**Files:**
- Astro components: PascalCase (e.g., `Hero.astro`, `Features.astro`, `ChatDemo.tsx`)
- Layout files: PascalCase (e.g., `Layout.astro`)
- Utility/UI components: PascalCase in subdirectories (e.g., `ui/Button.astro`, `ui/Card.astro`, `ui/Badge.astro`)
- CSS files: lowercase with hyphens (e.g., `global.css`)
- Single responsibility per component

**Functions:**
- Camel case for function declarations and arrow functions
- Descriptive action-oriented names: `setStep`, `setShowResponse`, `setTypedText`
- Event handlers prefixed with descriptive action (e.g., `setHasStarted`, `setShowUserBubble`)

**Variables:**
- Camel case for state variables: `step`, `typedText`, `thinkingSteps`, `showResponse`
- Ref variables use `Ref` suffix: `containerRef`, `timerRef`
- Array data: plural names (e.g., `features`, `months`, `revenue`, `links`, `kpis`)
- Boolean variables: `show` or `has` prefix (e.g., `showResponse`, `showConfirm`, `showUserBubble`, `hasStarted`)

**Types:**
- Props interfaces use `Props` naming (e.g., `interface Props { variant?: "gold" | "outline"; size?: "sm" | "md" | "lg"; }`)
- Literal unions for variants and sizes: `type ButtonVariant = "gold" | "outline" | "ghost"`
- Record types used for style/class mappings: `Record<string, string>`

## Code Style

**Formatting:**
- Implicit use of Prettier (no `.prettierrc` config file, using defaults)
- Consistent 2-space indentation throughout
- Single quotes for attributes, double quotes for JSX content
- Trailing commas in imports and object literals

**Linting:**
- No `.eslintrc` detected - using Astro's default strict TypeScript configuration from `astro/tsconfigs/strict`
- Components follow strict TypeScript typing requirements
- Props interfaces required for component parameters

## Import Organization

**Order:**
1. Framework imports (React, Astro)
2. Component imports (from `./components` or relative paths)
3. Utility/layout imports (from `./layouts`)

**Path Aliases:**
- No path aliases configured in `tsconfig.json` - all imports use relative paths
- Relative paths: `import Button from "./ui/Button.astro"`, `import Layout from "../layouts/Layout.astro"`

**Export patterns:**
- Astro components: default export
- React components: named or default export
- No barrel files (index.ts/index.astro)

## Error Handling

**Patterns:**
- No explicit error handling patterns detected in landing page (stateless, no API calls)
- Safe null checks: `if (!containerRef.current) return;`
- Guard clauses for effect dependencies: `if (step < 0 || step >= STEPS.length) return;`
- Optional chaining with refs: `if (timerRef.current) clearTimeout(timerRef.current);`

## Logging

**Framework:** No logging framework detected - console methods not used

**Patterns:**
- No console output in production code
- Silent animation state management via React hooks

## Comments

**When to Comment:**
- Minimal comments observed - code is self-documenting
- Comments used for significant sections: `// Animation steps`, `// Start animation when visible`, `// Run animation sequence`
- Section headers use uppercase with consistent formatting: `// Header`, `// Chat area`, `// User bubble`

**JSDoc/TSDoc:**
- No JSDoc observed - Astro's strict TypeScript provides type documentation

## Function Design

**Size:**
- Component functions vary: 30-100 lines typical for Astro components, 325 lines for ChatDemo (animation sequence)
- Effects are focused and single-responsibility

**Parameters:**
- Astro components: Props interface with destructuring
- React hooks: useState, useEffect, useRef with proper dependencies
- Default values provided: `const { variant = "gold", size = "md", ... } = Astro.props;`

**Return Values:**
- React components: return JSX elements (always wrapped divs)
- Astro components: implicit return via template
- Effects: cleanup function when needed (interval/timeout cleanup)
- Guard returns for early exit patterns

## Module Design

**Exports:**
- Astro components: default export only
- React component: default export from `ChatDemo.tsx`
- No named exports

**Structure:**
- Astro components: frontmatter (---) for logic, then HTML template
- React components: imports, constants (STEPS array), component function, return JSX
- Inline styles preferred over CSS for component-specific styling (see ChatDemo.tsx oklch colors)

## Design System & Styling

**Color System:**
- CSS custom properties using oklch color space: `oklch(lightness saturation hue)`
- Semantic naming: `--color-navy-900`, `--color-gold-500`, `--color-surface`, `--color-text-primary`
- Theme colors defined in `src/styles/global.css` under `@theme`

**Spacing:**
- Tailwind utilities throughout
- Common patterns: `px-4 py-3`, `mb-6`, `gap-3`, `space-y-3`
- Responsive utilities: `sm:`, `md:`, `lg:` prefixes

**Radius System:**
- Custom CSS variables for border radius: `--radius-base` (0.375rem), `--radius-lg` (0.5rem), `--radius-xl` (0.75rem), `--radius-2xl` (1rem), `--radius-full` (9999px)
- Usage: `rounded-[var(--radius-base)]`, `rounded-[var(--radius-lg)]`

**Typography:**
- Font families: `--font-heading: "Manrope"` for headings, `--font-body: "Inter"` for body text
- Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)
- Line heights controlled via Tailwind: `leading-relaxed`, `leading-none`

## Class Utility Patterns

**Tailwind patterns:**
- Responsive grid: `grid sm:grid-cols-2 lg:grid-cols-3`
- Flex layouts: `flex items-center justify-between gap-3`
- Conditional classes via `class:list=[]` in Astro
- Class joining: `[base, variants[variant], sizes[size], className].join(" ")`

**Animation:**
- Scroll-triggered animations via `animate-on-scroll` class
- Inline keyframes for component-specific animations
- `animation-delay` for staggered effects: `style={animation-delay: ${i * 80}ms}`

---

*Convention analysis: 2026-03-31*
