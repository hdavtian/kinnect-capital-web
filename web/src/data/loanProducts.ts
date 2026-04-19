import { ROUTES } from "../routes";
import type { LoanProduct } from "../types/content";

export const loanProducts: LoanProduct[] = [
  {
    id: "bank-statement",
    title: "Bank Statement Loan",
    summary: "Most common mortgage solution for the self-employed borrower.",
    bullets: [
      "12 or 24 months bank statements",
      "No tax returns required",
      "15/30/40 year fixed options",
    ],
    ctaLabel: "Let's Connect",
    ctaHref: ROUTES.contact,
  },
  {
    id: "profit-loss",
    title: "Profit & Loss Loan (P&L Only)",
    summary: "Uses CPA prepared P&L statements for qualification.",
    bullets: [
      "1 or 2 year CPA P&L",
      "No tax returns required",
      "30 year fixed options",
    ],
    ctaLabel: "Let's Connect",
    ctaHref: ROUTES.contact,
  },
  {
    id: "asset-based",
    title: "Asset Based Loan",
    summary: "Qualify using eligible assets instead of employment income.",
    bullets: [
      "Investment accounts",
      "Money market and deposits",
      "Retirement accounts",
    ],
    ctaLabel: "Let's Connect",
    ctaHref: ROUTES.contact,
  },
  {
    id: "dscr",
    title: "DSCR Loan",
    summary: "Investment property financing based on property cash flow.",
    bullets: [
      "Cash-flow qualification",
      "30 year fixed options",
      "Purchase, refinance or cash-out",
    ],
    ctaLabel: "Let's Connect",
    ctaHref: ROUTES.contact,
  },
  {
    id: "heloan",
    title: "HELOAN 2nd Mortgage",
    summary: "Access equity while preserving the low-rate first mortgage.",
    bullets: [
      "Cash-out flexibility",
      "Debt consolidation support",
      "Home improvement use cases",
    ],
    ctaLabel: "Let's Connect",
    ctaHref: ROUTES.contact,
  },
  {
    id: "heloc",
    title: "Home Equity Line of Credit (HELOC)",
    summary: "Revolving line of credit secured by home equity.",
    bullets: [
      "Renovations",
      "Tuition and large expenses",
      "Debt consolidation",
    ],
    ctaLabel: "Let's Connect",
    ctaHref: ROUTES.contact,
  },
  {
    id: "private-money",
    title: "Private Money Loans",
    summary: "Short term lending with faster approvals and funding.",
    bullets: [
      "Fast closing timelines",
      "Flexible underwriting",
      "Typical terms: 12-24 months",
    ],
    ctaLabel: "Let's Connect",
    ctaHref: ROUTES.contact,
  },
];
