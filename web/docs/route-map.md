# Route Map and URL Slugs

## Routing Decisions

- Router mode: BrowserRouter during development.
- Production deploy target: GitHub Pages.
- Hosting strategy for static routing: include a 404 fallback page that redirects unknown paths to the SPA entry route.
- Base path: use repository-name base only when deploying to project pages; use root path for custom domain.

## Final Slugs

1. Home: /
2. About Kinnect Capital: /about
3. Meet the Team: /team
4. Residential Mortgage Options: /residential-mortgage-options
5. Commercial Financing: /commercial-financing
6. Buy a Home: /resources/buy-a-home
7. Refinance: /resources/refinance
8. Mortgage Calculator: /tools/mortgage-calculator
9. Home Valuation: /tools/home-valuation
10. Contact: /contact
11. Privacy Policy: /privacy-policy
12. Terms of Use: /terms-of-use

## Navigation to Route Mapping

- About
  - About Kinnect Capital -> /about
  - Meet the Team -> /team
- Residential Mortgage Options -> /residential-mortgage-options
- Commercial Financing -> /commercial-financing
- Resources
  - Buy a Home -> /resources/buy-a-home
  - Refinance -> /resources/refinance
- Mortgage Tools
  - Mortgage Calculator -> /tools/mortgage-calculator
  - Home Valuation -> /tools/home-valuation
- Let's Connect -> /contact

## Legal Structure Decision

- Decision: keep legal pages split into two routes.
- Reason: easier discoverability, cleaner consent linking, and future compliance updates without merging unrelated legal copy.

## 404 and Deep-Link Behavior for GitHub Pages

- Add a top-level 404.html that rewrites deep links back to the SPA root while preserving intended destination.
- App boot sequence should parse rewritten path and restore target route client-side.

## Implementation Notes

- Route constants should be centralized in a single module.
- Navigation labels should be driven from data and reference route constants.
- Avoid hardcoding href values inside components.
