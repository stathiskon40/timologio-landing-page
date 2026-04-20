# Testing Patterns

**Analysis Date:** 2026-03-31

## Test Framework

**Status:** Not configured

**Current State:**
- No test runner detected (Jest, Vitest, Playwright, Cypress not installed)
- No test files present (no `.test.ts`, `.spec.ts`, `.test.tsx`, `.spec.tsx` files)
- No test configuration files (no `jest.config.js`, `vitest.config.ts`, etc.)
- `package.json` contains no test scripts (only `dev`, `build`, `preview`)

**Assertion Library:**
- Not applicable - no tests configured

## Test Commands

**Current:**
```bash
npm run dev                # Development server
npm run build              # Production build
npm run preview            # Preview built site
```

**Not available:**
- No `npm test` or similar command
- No watch mode for tests
- No coverage reporting

## Test File Organization

**Recommendation for future implementation:**
- Co-located with source: `src/components/Button.astro` → `src/components/Button.test.ts`
- Or separate directory: `tests/` parallel to `src/`

**Naming convention (if implemented):**
- Use `.test.ts` suffix for Astro component tests
- Use `.test.tsx` for React component tests

## Types of Tests Not Currently Implemented

### Unit Testing
- **Not tested:** Individual Astro components (Button, Card, Badge, etc.)
- **Not tested:** React component logic (ChatDemo animation sequences, state management)
- **Recommended approach:** Vitest + React Testing Library for ChatDemo component

### Integration Testing
- **Not tested:** Page composition (index.astro layout and component interactions)
- **Not tested:** Navigation between sections
- **Recommended approach:** Vitest with Astro testing utilities

### Visual/E2E Testing
- **Not tested:** Scroll animations (`animate-on-scroll` class behavior)
- **Not tested:** ChatDemo animation sequences
- **Not tested:** Navigation scroll effects (sticky nav, mobile menu toggle)
- **Recommended approach:** Playwright or Cypress for visual regression and E2E

### Component Testing Gaps

**ChatDemo.tsx** (`src/components/ChatDemo.tsx`):
- **Untested:** Animation timing and sequencing (STEPS array execution)
- **Untested:** IntersectionObserver trigger for animation start
- **Untested:** Typing animation character progression
- **Untested:** setTimeout/setInterval cleanup
- **Untested:** User visibility of each animation step
- **Critical functionality not covered:**
  - Line 28-39: IntersectionObserver setup and cleanup
  - Line 42-89: Effect dependencies and timing logic
  - Line 50-58: Typing animation character loop
  - Line 176-197: Thinking steps with conditional SVG rendering

**UI Components** (`src/components/ui/`):
- **Button.astro** (31 lines): No tests for variant/size classes generation
- **Card.astro** (16 lines): No tests for shadow hover transitions
- **Badge.astro** (25 lines): No tests for variant styling

**Page Layout** (`src/layouts/Layout.astro`):
- **Untested:** Scroll animations observer initialization (lines 47-62)
- **Untested:** Sticky nav effect (lines 63-80)
- **Untested:** Mobile menu toggle (lines 82-95)
- **Critical functionality not covered:**
  - Navigation class toggling on scroll
  - Mobile menu open/close behavior
  - Intersection observer cleanup

## Recommended Testing Strategy

### Phase 1: Unit Testing (Medium Priority)
```typescript
// Example: ChatDemo component
import { render, screen } from '@testing-library/react';
import ChatDemo from './ChatDemo';

describe('ChatDemo', () => {
  test('renders initial state', () => {
    render(<ChatDemo />);
    expect(screen.getByPlaceholderText('Πληκτρολογήστε...')).toBeInTheDocument();
  });

  test('starts animation when visible', () => {
    // Mock IntersectionObserver
  });
});
```

### Phase 2: E2E Testing (High Priority - Animation Critical)
```javascript
// Example: Playwright
test('ChatDemo animation completes', async ({ page }) => {
  await page.goto('/');
  const container = page.locator('[data-testid="chat-demo"]');

  // Wait for animation to complete
  await expect(container.locator('text="Υποβλήθηκε στο myDATA"')).toBeVisible();
});
```

### Phase 3: Visual Regression (Medium Priority)
- Screenshot comparison for theme colors (oklch values)
- Responsive layout verification (sm:, md:, lg: breakpoints)
- Animation smoothness on different devices

## Current Testing Gaps & Risks

**High-Risk Areas Without Tests:**

1. **ChatDemo Animation Sequence** (`src/components/ChatDemo.tsx`)
   - Risk: Animation steps could break silently during refactoring
   - 12-step animation sequence with complex timing
   - IntersectionObserver might not trigger correctly
   - No visibility of state at each step

2. **Layout Script Effects** (`src/layouts/Layout.astro`)
   - Risk: Navigation scroll behavior could regress
   - Mobile menu toggle might fail
   - Intersection observer might not clean up properly
   - No test coverage for scroll event throttling

3. **Styling Regression** (Global color/sizing)
   - Risk: oklch color values could be mistyped
   - Tailwind responsive classes could break
   - Animation keyframes could be removed accidentally

4. **Component Variant Coverage** (`src/components/ui/`)
   - Button variants (`gold`, `outline`, `ghost`) not tested
   - Badge variants (`gold`, `navy`, `success`, `danger`) not tested
   - Size mappings untested

## Setup Recommendations

### For Astro + React Testing:

```json
{
  "devDependencies": {
    "vitest": "^1.x",
    "react-testing-library": "^14.x",
    "@testing-library/dom": "^9.x",
    "@astrojs/test": "^0.x",
    "playwright": "^1.x"
  }
}
```

### Vitest Configuration (if implemented):

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
});
```

### Test Scripts (if implemented):

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test"
  }
}
```

## Coverage Targets (if implemented)

- **Minimum recommended:** Statements 60%, Branches 50%, Functions 60%, Lines 60%
- **Animation-critical:** 100% coverage for ChatDemo timing logic
- **UI components:** 100% coverage for variant/class generation

---

*Testing analysis: 2026-03-31*
