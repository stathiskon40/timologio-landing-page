# Codebase Structure

**Analysis Date:** 2026-03-31

## Directory Layout

```
landing-page/
├── src/                    # Source code
│   ├── pages/              # Astro pages (generates routes)
│   │   └── index.astro     # Homepage (renders at /)
│   ├── layouts/            # Reusable page layouts
│   │   └── Layout.astro    # Root HTML wrapper with global scripts
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Design system primitives
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   └── Badge.astro
│   │   ├── Nav.astro       # Navigation bar with mobile menu
│   │   ├── Hero.astro      # Hero section with CTA
│   │   ├── LogoCloud.astro # Client/partner logos
│   │   ├── Features.astro  # 6-feature grid
│   │   ├── ChatDemo.tsx    # Interactive invoice demo (React)
│   │   ├── Analytics.astro # Analytics mockup section
│   │   ├── DeepDive.astro  # Detailed features breakdown
│   │   ├── Comparison.astro# Feature comparison table
│   │   ├── Pricing.astro   # Pricing tiers
│   │   ├── AiSection.astro # AI capabilities explainer
│   │   └── Footer.astro    # Footer with links
│   └── styles/             # Global styles and theme
│       └── global.css      # Tailwind imports, theme variables, animations
├── public/                 # Static assets
│   └── favicon.svg         # Favicon
├── dist/                   # Build output (generated)
├── node_modules/           # Dependencies (generated)
├── .astro/                 # Astro cache (generated)
├── .planning/              # GSD planning documents
├── astro.config.mjs        # Astro configuration
├── package.json            # Dependencies: astro, react, tailwindcss
├── package-lock.json       # Locked dependency versions
└── tsconfig.json           # TypeScript configuration (extends astro/tsconfigs/strict)
```

## Directory Purposes

**src/pages/**
- Purpose: Define routes; each .astro file here becomes a page
- Contains: Currently only `index.astro` for the homepage
- Key files: `index.astro` (single entry point, composes all sections)
- Astro compiles this to `/index.html` during build

**src/layouts/**
- Purpose: Define reusable page templates
- Contains: HTML shell, meta tags, global scripts
- Key files: `Layout.astro` (provides `<html>`, `<head>`, `<body>` wrapper)
- Responsible for: Scroll animation setup, sticky nav state, mobile menu toggle, Google Fonts preload

**src/components/**
- Purpose: Modular UI pieces, both static (Astro) and interactive (React)
- Contains: 11 components covering navigation, hero, features, demo, pricing, footer
- Key files:
  - Section components: `Hero.astro`, `Features.astro`, `Pricing.astro`, etc. (mostly static)
  - Interactive: `ChatDemo.tsx` (React island with client-side animation state)
  - Utility: `Nav.astro` (handles mobile menu), `LogoCloud.astro`, `AiSection.astro`

**src/components/ui/**
- Purpose: Design system primitives
- Contains: 3 base components (Button, Card, Badge) with consistent styling
- Pattern: Each accepts optional `class` or `variant` props, uses Tailwind for styling
- Usage: Imported by section components to maintain visual consistency

**src/styles/global.css**
- Purpose: Theme definition, animations, base element styles
- Contains:
  - Tailwind @theme block with all color tokens (navy-950 through navy-50, gold variants, semantic colors)
  - Keyframe animations (fade-up, fade-in, slide-in-left, slide-in-right)
  - Scroll behavior and font settings
  - Reduced motion accessibility fallback

**public/**
- Purpose: Static assets served at root
- Contains: `favicon.svg` (site icon)
- Not processed: files here copy directly to `dist/` with no transformation

## Key File Locations

**Entry Points:**
- `src/pages/index.astro`: Astro page that renders homepage; imports all sections
- `src/layouts/Layout.astro`: Root HTML wrapper; loads global CSS and scripts
- `astro.config.mjs`: Build configuration; sets up React and Tailwind integrations

**Configuration:**
- `package.json`: npm dependencies (astro, react, react-dom, tailwindcss, @astrojs/react, @tailwindcss/vite)
- `tsconfig.json`: Extends astro/tsconfigs/strict for type checking
- `astro.config.mjs`: Defines React integration and Tailwind plugin

**Core Logic:**
- `src/layouts/Layout.astro`: All JavaScript (IntersectionObserver, scroll listeners, DOM manipulation)
- `src/components/ChatDemo.tsx`: React component managing animation state machine

**Styling:**
- `src/styles/global.css`: All theme colors, animations, and base styles
- Component-level: Tailwind classes inline in .astro/.tsx files (no separate CSS files)

**Testing:**
- Not implemented; static marketing site with no test files

## Naming Conventions

**Files:**
- Components: PascalCase (e.g., `ChatDemo.tsx`, `Features.astro`)
- Pages: lowercase (e.g., `index.astro`)
- Utilities: PascalCase for components, lowercase for style/config files
- Directories: lowercase plural when containing multiple items (e.g., `components/`, `pages/`, `layouts/`)

**Directories:**
- `src/pages/` — Astro page routes
- `src/layouts/` — Layout templates
- `src/components/` — UI components
- `src/components/ui/` — Design system primitives
- `src/styles/` — Global styles
- `public/` — Static assets
- `dist/` — Build output (do not edit)
- `.astro/` — Astro generated cache (do not edit)

**HTML Elements & Classes:**
- IDs: kebab-case (e.g., `main-nav`, `mobile-menu-btn`, `demo`)
- Classes: Tailwind utility classes + custom prefixed states (e.g., `nav-solid`, `animate-on-scroll`, `is-visible`)
- Section IDs: kebab-case matching feature names (e.g., `#features`, `#demo`, `#pricing`)

**Component Props:**
- Astro: Interface named `Props`, accessed via `Astro.props`
- React: Named export default function with optional props
- Common pattern: Optional `class` or `variant` prop for styling flexibility

## Where to Add New Code

**New Section (e.g., testimonials, blog):**
- Implementation: Create `src/components/SectionName.astro`
- Import in: `src/pages/index.astro` in appropriate position
- Styling: Use Tailwind classes + design tokens from `src/styles/global.css`
- Pattern: Follow existing section structure (container, max-w-7xl, padding, semantic heading)

**New Interactive Component:**
- Implementation: Create `src/components/ComponentName.tsx` for React islands
- Hydration directive: Add `client:visible` or `client:load` in parent .astro file
- Location: Import and use in appropriate section (e.g., ChatDemo in demo section)
- Styling: Inline Tailwind or use React inline styles (ChatDemo uses oklch() color values)

**New Design System Component (Button variant, new Card style):**
- Implementation: Edit existing file in `src/components/ui/` or create new primitive
- Pattern: Accept optional `class`/`variant` props, compose with base Tailwind classes
- Usage: Import in sections that need it
- Testing: Visually verify in all sections using the component

**New Animation or Theme Variable:**
- Implementation: Edit `src/styles/global.css`
- Keyframes: Add `@keyframes name { ... }` block
- Colors/tokens: Add to `@theme { ... }` block (OKLCH format)
- Usage: Reference by name in Tailwind classes (e.g., `animate-fade-up`) or CSS variables (e.g., `var(--color-navy-900)`)

**Static Assets (icons, images):**
- Location: `public/` directory
- Reference: Absolute path starting with `/` (e.g., `/favicon.svg`)
- Build: Copied as-is to `dist/` during build

## Special Directories

**dist/:**
- Purpose: Build output directory (generated by Astro)
- Generated: Yes (created by `astro build`)
- Committed: No (in `.gitignore`)
- Contents: Pre-rendered HTML files, CSS bundles, optimized JavaScript, images

**.astro/:**
- Purpose: Astro internal cache for type information and metadata
- Generated: Yes (created during dev/build)
- Committed: No (in `.gitignore`)
- Contents: Type definitions, settings, caching data

**node_modules/:**
- Purpose: Installed npm packages
- Generated: Yes (via `npm install`)
- Committed: No (in `.gitignore`)
- Restore: Run `npm install` (uses `package-lock.json`)

**.planning/:**
- Purpose: GSD (Get Stuff Done) planning documents
- Committed: Yes (version controlled)
- Contents: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, CONCERNS.md

## Import Paths & Resolution

**Astro Imports:**
- Relative paths: `import Nav from "../components/Nav.astro"`
- Framework aliases: `@astrojs/react` for the React integration

**TypeScript:**
- Config extends: `astro/tsconfigs/strict` (enforces strict null checks, strict property initialization)
- No path aliases configured in tsconfig.json (all imports relative)

**Asset References:**
- Public assets: Absolute paths starting with `/` (e.g., `/favicon.svg`)
- Fonts: Google Fonts via `<link>` with preconnect in Layout head

---

*Structure analysis: 2026-03-31*
