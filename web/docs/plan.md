## Plan: Kinnect Capital Website Planning

> **Current Detour:** Phase 1 deliverables are complete. Before proceeding to Phase 4 deployment and integration, we are working through a dedicated visual polish pass.
> See: [`visual-polish-plan.md`](./visual-polish-plan.md)
> Return point: Phase 4 Step 18 — GitHub Pages deployment setup.

Create a planning-only blueprint for rebuilding the site as a modern residential mortgage brokerage experience, using a React + Vite + Tailwind + SCSS foundation. The plan prioritizes content architecture, UX structure, and implementation sequencing while locking in your selected constraints: UI-only form behavior in v1, Google Places/Maps for valuation flow, GitHub Pages deployment target, and a clean corporate look with subtle warmth.

**Steps**

1. Phase 1: Product Definition and Information Architecture
2. Confirm page map for MVP: Home, About, Team/Testimonials, Residential Options, Commercial Financing, Buy a Home, Refinance, Tools, Contact, Privacy/Terms.
3. Convert current copy into structured content sections per page: hero copy, trust statements, process steps, product descriptions, FAQs, compliance text.
4. Define navigation behavior and dropdown hierarchy for desktop and mobile; identify CTA placements for lead capture. _blocks Phase 2_
5. Phase 2: UX and Visual System
6. Define design language for "clean corporate + personal warmth": typography options, color tokens, spacing scale, card styles, icon style, and animation principles.
7. Produce component inventory and states: header, footer, section wrappers, loan cards, testimonial module, calculator form controls, valuation stepper, contact form states.
8. Define responsive behavior for each major section and component at mobile/tablet/desktop breakpoints. _parallel with step 7_
9. Phase 3: Technical Architecture and Build Blueprint
10. Define project scaffold and routing approach for React + Vite + TypeScript, including SCSS + Tailwind coexistence strategy and CSS variable theming.
11. Define data model for static content (loan products, testimonials, footer/legal metadata) so content can be edited without component rewrites.
12. Specify tool-widget architecture: mortgage calculator computation module, chart rendering strategy, and validation model for form interactions.
13. Specify valuation widget integration plan for Google Places + map preview (API boundaries, fallback behavior, and local mock mode). _depends on step 12_
14. Specify v1 form handling policy (frontend validation only, no submission backend) with future-ready interface for API integration. _depends on step 12_
15. Phase 4: Delivery and Validation Plan
16. Define implementation order to reduce risk: shell/layout first, static pages second, reusable modules third, tools/widgets fourth, legal/compliance final pass.
17. Define QA checklist: responsive checks, navigation behavior, accessibility basics, calculator logic validation, consent checkbox gating, and legal text visibility.
18. Define release checklist for GitHub Pages: build configuration, route handling constraints, static asset paths, and post-deploy smoke test steps.
19. Define post-launch backlog: backend form submission integration, analytics toggle implementation, and optional Next.js migration path.

**Relevant files**

- c:/sites/kinnect-capital/scratch/current-site-content.md — source content to normalize into page-level requirements and legal/compliance sections.

**Verification**

1. Review the final page-by-page requirements matrix and ensure every section in the source document maps to an MVP location.
2. Validate that each interactive widget has documented input/output behavior and error/edge-state expectations.
3. Run a planning completeness check: each phase has entry/exit criteria, dependencies, and handoff-ready implementation tasks.
4. Confirm that selected constraints are reflected in plan artifacts: frontend-only forms in v1, Google API path, GitHub Pages deployment, and chosen brand direction.

**Decisions**

- Included: planning-only deliverable, implementation-ready structure, and phased execution details.
- Included: Google Places + Google Maps for home valuation UX path.
- Included: GitHub Pages as initial deployment target.
- Included: frontend-only form validation behavior for v1 (no backend/email integration yet).
- Included: visual direction is clean corporate with subtle personal warmth.
- Excluded: direct code implementation, backend service provisioning, and production API key setup in this planning cycle.

**Further Considerations**

1. Testimonial completeness: one testimonial appears incomplete in source content; finalize all testimonial copy before UI production.
2. Mortgage calculator assumptions: lock tax/insurance default logic before implementation to avoid UX rework.
3. Commercial financing depth: decide whether this remains lightweight/lead-focused or expands into a full service detail page.
