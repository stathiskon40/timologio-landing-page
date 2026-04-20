# External Integrations

**Analysis Date:** 2026-03-31

## APIs & External Services

**None Detected**

This is a static landing page with no direct backend API integration. The site is fully client-side rendered with no external service calls except CDN resources.

## Data Storage

**Databases:**
- None - This is a static site generator output

**File Storage:**
- Static assets only (no dynamic file uploads)
- Public assets: `src/public/` directory

**Caching:**
- Browser caching via standard HTTP headers
- No application-level caching layer

## Authentication & Identity

**Auth Provider:**
- None - This is a public landing page
- No user authentication or login system

**Note:** Links to product features (invoicing, analytics) are placeholder routes without functional backend support in this landing page.

## Monitoring & Observability

**Error Tracking:**
- None detected

**Analytics:**
- Not configured in landing page code
- `src/components/Analytics.astro` appears to be a UI section component, not an analytics integration
- Ready for future Google Analytics, Plausible, or similar integration

**Logs:**
- Standard browser console output only

## CI/CD & Deployment

**Hosting:**
- Static site (platform-agnostic)
- Can be deployed to: Vercel, Netlify, GitHub Pages, AWS S3, CloudFront, or any static hosting
- Build output: `dist/` directory

**CI Pipeline:**
- Not detected in codebase
- Ready for GitHub Actions, Netlify CI, or Vercel CI configuration

## Environment Configuration

**Environment Variables:**
- None required for landing page
- No `.env` file present

**Secrets Location:**
- Not applicable - no secrets needed

## External Resources

**CDN & Third-Party Fonts:**
- Google Fonts (preconnected)
  - Inter (body text) - weights: 400, 500, 600
  - Manrope (headings) - weights: 600, 700, 800
  - Loaded via: `https://fonts.googleapis.com` and `https://fonts.gstatic.com`

**Icon Assets:**
- Inline SVG icons in components (no external icon library)
- Custom branding icon in navigation and footer

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Future Integration Points

**Ready for:**
1. Email service (SendGrid, Mailgun) - for contact form in footer
2. Analytics (Google Analytics, Plausible, PostHog)
3. CMS (Contentful, Sanity, or Markdown-based) - for blog section placeholder
4. Payments/Stripe - for pricing tiers
5. Backend API - for demo functionality (currently hardcoded animation)

**Notes on ChatDemo Component:**
- `src/components/ChatDemo.tsx` currently demonstrates invoice creation with hardcoded animation
- Steps: `STEPS` array in lines 4-12 shows the demo flow
- No actual API calls; all state managed client-side with React hooks
- Ready to integrate with backend API for real invoice submission to myDATA

---

*Integration audit: 2026-03-31*
