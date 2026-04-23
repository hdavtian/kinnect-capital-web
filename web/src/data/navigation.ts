import { ROUTES } from "../routes";
import type { NavGroup } from "../types/content";

export const topNav: NavGroup[] = [
  {
    id: "home",
    label: "Home",
    href: ROUTES.home,
    children: [],
  },
  {
    id: "about",
    label: "About",
    href: null,
    children: [
      {
        id: "about-company",
        label: "About Kinnect Capital",
        href: ROUTES.about,
      },
      { id: "about-team", label: "Meet the Team", href: ROUTES.team },
    ],
  },
  {
    id: "residential",
    label: "Residential Mortgage Options",
    href: ROUTES.residential,
    children: [],
  },
  {
    id: "commercial",
    label: "Commercial Financing",
    href: ROUTES.commercial,
    children: [],
  },
  {
    id: "resources",
    label: "Resources",
    href: null,
    children: [
      { id: "buy-home", label: "Buy a Home", href: ROUTES.buyHome },
      { id: "refinance", label: "Refinance", href: ROUTES.refinance },
    ],
  },
  {
    id: "tools",
    label: "Mortgage Tools",
    href: null,
    children: [
      {
        id: "tools-hub",
        label: "Mortgage Tools Hub",
        href: ROUTES.toolsHub,
      },
      {
        id: "calculator",
        label: "Mortgage Calculator",
        href: ROUTES.calculator,
      },
      {
        id: "term-comparison",
        label: "Loan Term Comparison",
        href: ROUTES.termComparison,
      },
      {
        id: "refi-breakeven",
        label: "Refinance Break-Even",
        href: ROUTES.refinanceBreakeven,
      },
      {
        id: "cashout-vs-heloc-heloan",
        label: "Cash-Out vs HELOC vs HELOAN",
        href: ROUTES.cashOutVsHelocHeloan,
      },
      {
        id: "arm-vs-fixed",
        label: "ARM vs Fixed",
        href: ROUTES.armVsFixed,
      },
      {
        id: "self-employed-affordability",
        label: "Self-Employed Affordability",
        href: ROUTES.selfEmployedAffordability,
      },
      {
        id: "dscr",
        label: "DSCR Calculator",
        href: ROUTES.dscr,
      },
      {
        id: "debt-consolidation",
        label: "Debt Consolidation Savings",
        href: ROUTES.debtConsolidationSavings,
      },
      {
        id: "rate-buydown",
        label: "Rate Buydown",
        href: ROUTES.rateBuydown,
      },
      {
        id: "rent-vs-buy",
        label: "Rent vs Buy",
        href: ROUTES.rentVsBuy,
      },
      { id: "valuation", label: "Home Valuation", href: ROUTES.valuation },
    ],
  },
];

export const contactCta = {
  label: "Let's Connect",
  href: ROUTES.contact,
};
