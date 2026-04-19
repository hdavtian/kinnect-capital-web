# Kinnect Capital MVP Requirements

## Scope Lock

This document translates current source content into build-ready MVP requirements for the first implementation cycle.

MVP constraints:

- Forms are frontend-only in v1 (validation and UX states only; no backend submission).
- Home valuation runs with local fallback autocomplete + Google Maps preview links in v1; Google Places API key setup is deferred to a later step.
- Deployment target is GitHub Pages.
- Visual direction is clean corporate with subtle personal warmth.

## Site Map

Primary pages for MVP:

1. Home
2. About Kinnect Capital
3. Meet the Team
4. Residential Mortgage Options
5. Commercial Financing
6. Buy a Home
7. Refinance
8. Mortgage Tools: Mortgage Calculator
9. Mortgage Tools: Home Valuation
10. Contact
11. Privacy Policy
12. Terms (or combined legal page if policy copy requires)

## Navigation

Desktop navigation:

- About
- Residential Mortgage Options
- Commercial Financing
- Resources
- Mortgage Tools
- Let's Connect

Dropdown structure:

- About:
  - About Kinnect Capital
  - Meet the Team
- Resources:
  - Buy a Home
  - Refinance
- Mortgage Tools:
  - Mortgage Calculator
  - Home Valuation

Mobile behavior:

- Collapsible menu with nested accordion sections for About, Resources, Mortgage Tools.
- Sticky CTA button to Contact/Let's Connect at top or bottom viewport.

## Page Requirements

### Home

Must include:

- Hero headline and supporting copy for sophisticated borrowers.
- Borrower segment list:
  - Self-Employed Business Owners
  - 1099 Independent Contractors
  - Real Estate Investors
  - High-Net-Worth Borrowers
  - Complicated Income Borrowers
- Primary CTA to Contact.
- Intro section linking to About and Residential Mortgage Options.

Acceptance criteria:

- Above-the-fold has clear value proposition and one primary CTA.
- Hero and segment copy are editable from a content data object.

### About Kinnect Capital

Must include:

- Company positioning content from source copy.
- Common-sense underwriting narrative.
- Lender network and track record sections.

Acceptance criteria:

- Content is sectioned with clear headings for readability.
- Copy renders consistently across desktop and mobile without overflow.

### Meet the Team

Must include:

- Arthur bio section.
- Testimonial module with at least 4 testimonial slots.

Acceptance criteria:

- Testimonial component supports reusable placement on other pages.
- Incomplete testimonial text from source is visibly marked for content completion.

### Residential Mortgage Options

Must include product cards/sections for:

- Bank Statement Loan
- Profit & Loss Loan (P&L Only)
- Asset Based Loan
- DSCR Loan
- HELOAN 2nd Mortgage
- Home Equity Line of Credit (HELOC)
- Private Money Loans
- Work With Kinnect Capital CTA

Acceptance criteria:

- Product list is data-driven and does not require component code edits for copy changes.
- Product cards are responsive and maintain visual parity across breakpoints.

### Commercial Financing

Must include:

- Existing commercial financing summary copy.
- Contact-first CTA.

Acceptance criteria:

- Page clearly communicates contact-driven workflow.

### Buy a Home

Must include:

- Pre-approval focused purchase copy.
- CTA to contact/pre-approval flow.

### Refinance

Must include:

- Refinance positioning copy.
- CTA to contact/refinance discussion.

### Mortgage Calculator

Functional requirements:

- Inputs:
  - Home Price
  - Down Payment ($)
  - Down Payment (%)
  - Interest Rate (%)
  - Homeowner's Insurance ($/year)
  - Term options (10, 15, 20, 25, 30 year fixed)
  - Property Tax ($/month)
  - HOA Dues ($/month)
- Down Payment ($) and Down Payment (%) update each other.
- Default values are prefilled.
- Reset returns fields to default values.
- Calculate button triggers same update behavior as auto-calc.
- Donut chart updates live and displays monthly payment at center.
- Breakdown values shown with amount and percentage:
  - Principal and Interest
  - Property Taxes
  - HOA Dues
  - Homeowner's Insurance

Acceptance criteria:

- Any valid field change recalculates outputs without page refresh.
- Number formatting supports currency commas and unit suffixes.
- Invalid/partial input does not crash UI; preserves previous valid result.

### Home Valuation

Functional requirements:

- Three-step form component:
  1. Address input with autocomplete dropdown and map preview.
  2. Contact fields (full name, email, phone) and consent checkbox.
  3. Thank-you message state.
- Continue button disabled until each step is valid.
- Privacy policy link present in step 2 consent text.

Implementation note:

- Google Places API integration is optional in this phase. If API key is not configured, the feature must continue working with local fallback suggestions.

Acceptance criteria:

- Step transitions are deterministic and preserve prior-step values.
- Map pin interaction can open Google Maps location.
- Submit action transitions to thank-you state with no backend dependency.

### Contact

Must include:

- Intro copy and Arthur credentials.
- Form with required validation states and consent checkbox.

Acceptance criteria:

- Submit disabled until required fields are valid and consent is checked.
- Success state is shown locally in UI.

### Footer (global)

Must include:

- Email, office/mobile numbers, address, NMLS and DRE numbers.
- Reliability/legal disclaimer.

Acceptance criteria:

- Footer present on every page.
- Footer content managed from a single shared source.

## Legal and Compliance

- Privacy Policy and Terms must be present in MVP nav/footer path.
- Consent copy must include opt-out language and policy link.
- NMLS and licensing identifiers must be visible in footer.

## Data Model Requirements

Create content modules for:

- Navigation tree
- Footer/contact metadata
- Testimonials array
- Residential loan products array
- Static page section content

Rules:

- UI components should consume data modules, not hardcoded text.
- Adding/reordering loan products should not require component logic changes.

## Out-of-Scope for MVP

- Backend form submission and email service integration.
- CRM integration.
- Analytics implementation.
- Production API key provisioning and secret management.

## Immediate Build Order

1. App shell and routes.
2. Header/footer and navigation behavior.
3. Static pages (Home/About/Team/Residential/Commercial/Resources).
4. Contact page with frontend-only validation states.
5. Mortgage calculator widget.
6. Home valuation 3-step widget with Google integration hooks.
7. Legal pages and compliance pass.
8. GitHub Pages deployment setup and smoke test.
