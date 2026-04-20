# Technology Stack

**Analysis Date:** 2026-03-31

## Languages

**Primary:**
- TypeScript - Static typing throughout component files and configuration
- JSX/TSX - React component syntax in `src/components/ChatDemo.tsx`
- HTML/Astro - Template language in `.astro` files (majority of codebase)
- CSS - Global styles and component-scoped styling

**Secondary:**
- JavaScript - Configuration files and inline scripts in Astro components

## Runtime

**Environment:**
- Node.js v22.22.0
- npm v10.9.4

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present (216KB)

## Frameworks

**Core:**
- Astro 6.1.2 - Static site generator and meta-framework
  - Used for page generation (`src/pages/index.astro`)
  - Component-based architecture with `.astro` files
  - Configuration: `astro.config.mjs`

**UI & Styling:**
- React 19.2.4 - Interactive components (client-side island)
  - Used for interactive demo: `src/components/ChatDemo.tsx`
  - Client-side hydration with `client:visible` directive
- Tailwind CSS 4.2.0 - Utility-first CSS framework
  - Global theme in `src/styles/global.css`
  - Custom color palette (navy, gold, semantic colors)
  - Custom theme defined with `@theme` block
- @tailwindcss/vite 4.2.0 - Vite plugin for Tailwind CSS

**Integration:**
- @astrojs/react 5.0.2 - Astro integration for React components
  - Enables React island hydration in Astro pages

## Key Dependencies

**Critical:**
- astro 6.1.2 - Site generation and static rendering
- react 19.2.4 - Interactive UI component library
- tailwindcss 4.2.0 - CSS framework and styling
- @tailwindcss/vite 4.2.0 - Build-time CSS processing

**Extraneous (not in package.json):**
- @emnapi/runtime 1.8.1
- tslib 2.8.1

## Configuration

**Build Configuration:**
- `astro.config.mjs` - Astro build config
  - React integration enabled
  - Tailwind CSS vite plugin configured
  - Build output: `dist/` directory

**TypeScript:**
- `tsconfig.json` - Strict TypeScript configuration
  - Extends "astro/tsconfigs/strict"

**Language/Localization:**
- Default locale: Greek (el)
- Site content: Greek language
- Typography: Inter (body), Manrope (headings) from Google Fonts

## Platform Requirements

**Development:**
- Node.js 22.22.0 or compatible
- npm 10.9.4 or compatible
- Modern browser with ES2020+ support

**Production:**
- Static hosting compatible (any web server)
- No runtime dependencies beyond static files
- Built output: HTML, CSS, JavaScript bundles in `dist/`

**Build Targets:**
- Browser: Modern ES2020+ capable browsers
- CSS: Supports CSS variables and oklch() color notation
- JavaScript: ES2020+ modules (type: "module" in package.json)

## Development Workflow

**Scripts (from `package.json`):**
```
npm run dev     # Start local dev server (astro dev)
npm run build   # Build for production (astro build)
npm run preview # Preview built site locally (astro preview)
```

**Port:** Default Astro dev server runs on localhost:3000

## Special Build Notes

**CSS Processing:**
- Tailwind CSS v4 uses built-in @theme syntax
- No separate Tailwind config file needed
- Theme customization in `src/styles/global.css`

**Asset Handling:**
- Public assets in `src/public/` directory
- Fonts loaded from Google Fonts CDN
- favicon in `src/public/favicon.svg`

**Type Safety:**
- Project uses strict TypeScript mode
- Astro provides built-in type definitions for components

---

*Stack analysis: 2026-03-31*
