# Phase 1 Task Board

## Goal

Complete Product Definition and Information Architecture deliverables needed before UI implementation.

## Status Legend

- [ ] Not started
- [~] In progress
- [x] Complete

## Tasks

### 1) Information Architecture

- [x] Confirm MVP page map.
- [x] Confirm navigation and dropdown structure.
- [x] Define final URL slugs for all pages.
- [x] Define 404 route behavior for GitHub Pages.

### 2) Content Structuring

- [x] Capture baseline content from source document.
- [x] Map core copy to page sections in requirements doc.
- [x] Resolve incomplete testimonial text (Sam A.).
- [x] Finalize commercial financing page depth.

### 3) Interaction Definitions

- [x] Define mortgage calculator field set and behavior.
- [x] Define home valuation 3-step flow and validation rules.
- [x] Lock calculator assumptions for taxes/insurance defaults.
- [x] Document precise input validation rules (email/phone/address formats).

### 4) Compliance and Legal

- [x] Include footer licensing and disclaimer requirements.
- [x] Include consent language and privacy-link requirement.
- [x] Confirm final legal page structure: split pages vs combined page.

### 5) Technical Prep for Build Start

- [x] Define route list for React Router implementation.
- [x] Define data module schema for nav, products, testimonials, legal, footer.
- [x] Define component inventory and ownership boundaries.
- [x] Define mobile breakpoint policy and layout rules.

## Dependencies

- URL slug and legal-page structure are now locked.
- Component ownership and route list are now locked.
- Calculator assumptions are locked and implementation can proceed.

## Definition of Done (Phase 1)

- All tasks in sections 1-5 are complete.
- No unresolved copy gaps for MVP-critical pages.
- Mortgage calculator and valuation behavior are implementation-ready.
- Route and data model decisions are documented and approved.

## Deferred Decisions

- Google Places production API setup is intentionally deferred to a later phase.
- Team will proceed with fallback autocomplete behavior until API credentials and restrictions are finalized.
