# Technical Prep Specification

## Purpose

Lock implementation details required to start coding Phase 1 and reduce rework during component development.

## Data Model Schema

### navigation.ts

- topNav: array of nav groups
- group shape:
  - id: string
  - label: string
  - href: string | null
  - children: array of child links
- child link shape:
  - id: string
  - label: string
  - href: string

### loanProducts.ts

- products: array
- product shape:
  - id: string
  - title: string
  - summary: string
  - bullets: string[]
  - ctaLabel: string
  - ctaHref: string

### testimonials.ts

- testimonials: array
- testimonial shape:
  - id: string
  - name: string
  - body: string
  - attribution: string
  - isDraft: boolean

### siteContent.ts

- page-level static content grouped by page key
- section shape:
  - id: string
  - heading: string
  - subheading?: string
  - body: string[]
  - cta?: { label: string; href: string }

### legal.ts

- privacyPolicy: { title: string; sections: array }
- termsOfUse: { title: string; sections: array }
- section shape:
  - id: string
  - heading: string
  - paragraphs: string[]

### footer.ts

- email: string
- officePhone: string
- mobilePhone: string
- addressLines: string[]
- nmlsCompany: string
- dreCompany: string
- nmlsArthur: string
- disclaimer: string

## Component Ownership Boundaries

### layout

- AppShell: route outlet, global page wrapper
- Header: desktop nav, mobile menu, CTA
- Footer: legal links, licensing/disclaimer, contact metadata

### pages

- HomePage
- AboutPage
- TeamPage
- ResidentialOptionsPage
- CommercialFinancingPage
- BuyHomePage
- RefinancePage
- MortgageCalculatorPage
- HomeValuationPage
- ContactPage
- PrivacyPolicyPage
- TermsOfUsePage

### feature modules

- MortgageCalculator
  - CalculatorForm
  - PaymentDonutChart
  - PaymentBreakdownList
- HomeValuationWizard
  - StepOneAddress
  - StepTwoContact
  - StepThreeThankYou
- ContactForm

## Responsive Breakpoint Policy

- mobile: 0-767px
- tablet: 768-1023px
- desktop: 1024px+

Rules:

- Navigation switches to hamburger at tablet and below.
- Mortgage calculator uses single column on mobile/tablet, two-column layout on desktop.
- Home valuation wizard stacks vertically on mobile/tablet and uses horizontal layout on desktop.

## Input Validation Rules

### contact fields

- full name: required, min 2 chars
- email: required, standard email format
- phone: required, US number normalization, min 10 digits
- consent checkbox: required

### valuation step 1

- address: required, must be selected from autocomplete result list to continue

### calculator inputs

- home price: required, > 0
- down payment dollars: >= 0 and <= home price
- down payment percent: >= 0 and <= 100
- interest rate: > 0 and < 100
- insurance yearly: >= 0
- property tax monthly: >= 0
- hoa monthly: >= 0
- term: required enum (10, 15, 20, 25, 30)

## Calculator Assumptions (Locked for MVP)

- Principal and interest uses fixed-rate amortization formula.
- Monthly interest rate = annual rate / 12.
- Number of payments = termYears \* 12.
- Down payment dollars and percent are bi-directionally derived from home price.
- Property tax input treated as monthly amount.
- HOA input treated as monthly amount.
- Insurance input treated as yearly amount and converted to monthly by dividing by 12.
- Monthly total = principalInterest + propertyTax + hoa + insuranceMonthly.
- Breakdown percentages are each component divided by monthly total; round for display only.

## GitHub Pages 404 Strategy

- Add 404.html fallback rewrite file.
- Add startup route restoration logic in the app entry path parser.

## Open Content Gaps (Do Not Block Scaffolding)

- Sam A. testimonial copy truncation requires content owner update.
- Commercial financing page depth can start as concise lead-focused section and expand later.

## Deferred Setup (Post-MVP)

- Google Places production setup (API key provisioning, billing, quota monitoring, and key restrictions) is deferred.
- Current implementation should continue operating with fallback address suggestions when Google API is unavailable.
