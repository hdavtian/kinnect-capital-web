import { ROUTES } from "../routes";
import type { PageSection } from "../types/content";

export const homeSections: PageSection[] = [
  {
    id: "hero",
    heading: "Mortgage solutions for the sophisticated borrower",
    subheading: "Outside the box thinking. Experienced. Proven results.",
    body: [
      "Kinnect Capital helps business owners and complex-income borrowers secure the right mortgage solution with confidence.",
    ],
    bullets: [
      "Self-Employed Business Owners",
      "1099 Independent Contractors",
      "Real Estate Investors",
      "High-Net-Worth Borrowers",
      "Complicated Income Borrowers",
    ],
    cta: { label: "Let's Connect", href: ROUTES.contact },
  },
  {
    id: "home-about-preview",
    heading: "About Kinnect Capital",
    body: [
      "When it comes to securing a mortgage as a sophisticated borrower, the right partner can make all the difference.",
      "Kinnect Capital focuses on common-sense underwriting and tailored guidance for clients with complex income profiles.",
    ],
    cta: { label: "Learn More", href: ROUTES.about },
  },
];

export const aboutSections: PageSection[] = [
  {
    id: "about-why",
    heading: "Unlocking Mortgage Potential for Business Owners",
    body: [
      "Kinnect Capital uses a common-sense underwriting approach designed for sophisticated borrowers and entrepreneurs.",
      "The process accounts for business realities that are often overlooked in conventional underwriting paths.",
    ],
  },
  {
    id: "about-tailored-solutions",
    heading: "Tailored Solutions for Business Owners",
    body: [
      "Business owners often have financial profiles that differ from traditional wage earners.",
      "Kinnect Capital evaluates the complete borrower picture to align financing strategy with long-term goals.",
    ],
  },
  {
    id: "about-track-record",
    heading: "Proven Track Record",
    body: [
      "Kinnect Capital has a long history of helping sophisticated borrowers close complex transactions in changing lending environments.",
      "Clients consistently cite professionalism, transparency, and dependable execution.",
    ],
  },
  {
    id: "about-lender-network",
    heading: "Vast Network of Lenders",
    body: [
      "An extensive lender network helps surface competitive rates and loan structures for unique borrower scenarios.",
      "Each recommendation is tailored to fit financial profile, asset strategy, and timing requirements.",
    ],
  },
];

export const teamIntroSections: PageSection[] = [
  {
    id: "team-arthur",
    heading: "Meet Arthur",
    body: [
      "Arthur Kumasian is a principal and broker with more than 20 years of experience in mortgage lending.",
      "Born and raised in Los Angeles and an alumnus of the University of Southern California, Arthur specializes in high-net-worth and business-owner lending scenarios.",
      "As a business owner himself, he understands the nuances of entrepreneurial income and structures each transaction with a solution-focused approach.",
    ],
  },
];

export const commercialSections: PageSection[] = [
  {
    id: "commercial-overview",
    heading: "Commercial Financing",
    body: [
      "If you own a commercial property, multi-family, or office building and are looking for financing, share your scenario with Kinnect Capital.",
      "The team works with a broad commercial lender network to identify competitive options and execution paths.",
      "Commercial guidance is structured around timeline, property profile, borrower goals, and refinance or acquisition strategy.",
    ],
    bullets: [
      "Acquisition and purchase financing for commercial and mixed-use assets",
      "Refinance options to improve structure, rate profile, or cash-flow flexibility",
      "Scenario-driven lender matching based on asset type and borrower profile",
      "Clear communication from initial review through closing milestones",
    ],
    cta: { label: "Discuss Your Scenario", href: ROUTES.contact },
  },
];

export const buyHomeSections: PageSection[] = [
  {
    id: "buy-home-overview",
    heading:
      "Purchase Mortgage Solutions Designed for the Sophisticated Borrower",
    body: [
      "Purchase with confidence and get pre-approved with a common-sense underwriting approach.",
      "Kinnect Capital helps borrowers move from strategy to pre-approval to closing with clear communication and realistic timelines.",
    ],
    cta: { label: "Start the Pre-Approval Conversation", href: ROUTES.contact },
  },
];

export const refinanceSections: PageSection[] = [
  {
    id: "refinance-overview",
    heading: "Refinance With Confidence",
    body: [
      "Whether the goal is to reduce rate pressure, improve payment structure, or access equity, Kinnect Capital can evaluate refinance paths around your priorities.",
      "Each refinance scenario is reviewed against borrower profile, current market conditions, and long-term financial strategy.",
    ],
    cta: { label: "Review Refinance Options", href: ROUTES.contact },
  },
];
