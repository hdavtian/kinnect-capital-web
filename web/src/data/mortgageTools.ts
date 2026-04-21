import { ROUTES } from "../routes";

export type ToolId =
  | "term-comparison"
  | "refinance-breakeven"
  | "cash-out-vs-heloc-heloan"
  | "arm-vs-fixed"
  | "self-employed-affordability"
  | "dscr"
  | "debt-consolidation-savings"
  | "rate-buydown"
  | "rent-vs-buy";

export interface ToolPreviewStat {
  label: string;
  value: string;
}

export interface MortgageToolCard {
  id: ToolId;
  title: string;
  description: string;
  href: string;
  cta: string;
  category: "Purchase" | "Refinance" | "Investor" | "Equity";
  headerImageSrc?: string;
  headerImageAlt?: string;
  imageSrc: string;
  imageAlt: string;
  previewBars: number[];
  previewStats: ToolPreviewStat[];
}

export const mortgageTools: MortgageToolCard[] = [
  {
    id: "term-comparison",
    title: "Loan Term Comparison",
    description:
      "Compare 10 to 30-year terms by monthly payment, total interest, and total paid.",
    href: ROUTES.termComparison,
    cta: "Compare Terms",
    category: "Purchase",
    headerImageSrc: "/images/calculators/headers/loan-term-comparison.png",
    headerImageAlt: "Loan term comparison infographic header",
    imageSrc: "/images/calculators/loan-term-comparison.png",
    imageAlt: "Loan term comparison calculator visual",
    previewBars: [84, 72, 61, 54, 48],
    previewStats: [
      { label: "Lowest Payment", value: "30-year" },
      { label: "Lowest Interest", value: "10-year" },
    ],
  },
  {
    id: "refinance-breakeven",
    title: "Refinance Break-Even",
    description:
      "Find how long it takes your monthly savings to recover refinance closing costs.",
    href: ROUTES.refinanceBreakeven,
    cta: "Find Break-Even",
    category: "Refinance",
    headerImageSrc: "/images/calculators/headers/refinance-break-even.png",
    headerImageAlt: "Refinance break-even infographic header",
    imageSrc: "/images/calculators/refinance-break-even.png",
    imageAlt: "Refinance break-even calculator visual",
    previewBars: [35, 58, 76, 90],
    previewStats: [
      { label: "Typical Range", value: "18 to 36 mo" },
      { label: "Decision Signal", value: "< 30 mo" },
    ],
  },
  {
    id: "cash-out-vs-heloc-heloan",
    title: "Cash-Out vs HELOC vs HELOAN",
    description:
      "See payment and cost trade-offs across three equity-access structures.",
    href: ROUTES.cashOutVsHelocHeloan,
    cta: "Compare Equity Options",
    category: "Equity",
    headerImageSrc: "/images/calculators/headers/cashout-vs-heloc-vs-helon.png",
    headerImageAlt: "Cash-out versus HELOC versus HELOAN infographic header",
    imageSrc: "/images/calculators/cash-out-vs-heloc-vs-heloan.png",
    imageAlt: "Cash-out versus HELOC versus HELOAN calculator visual",
    previewBars: [62, 74, 56],
    previewStats: [
      { label: "Flexible Draw", value: "HELOC" },
      { label: "Fixed 2nd", value: "HELOAN" },
    ],
  },
  {
    id: "arm-vs-fixed",
    title: "ARM vs Fixed Comparison",
    description: "Model short-term payment advantage vs longer-term stability.",
    href: ROUTES.armVsFixed,
    cta: "Compare Rate Types",
    category: "Purchase",
    headerImageSrc: "/images/calculators/headers/arm-vs-fixed-comparison.png",
    headerImageAlt: "ARM versus fixed infographic header",
    imageSrc: "/images/calculators/arm-vs-fixed-comparison.png",
    imageAlt: "ARM versus fixed comparison calculator visual",
    previewBars: [52, 61, 70, 81],
    previewStats: [
      { label: "ARM Advantage", value: "Years 1 to 5" },
      { label: "Fixed Certainty", value: "Year 6+" },
    ],
  },
  {
    id: "self-employed-affordability",
    title: "Self-Employed Affordability",
    description:
      "Estimate buying power using bank statement style income and debt inputs.",
    href: ROUTES.selfEmployedAffordability,
    cta: "Estimate Buying Power",
    category: "Purchase",
    headerImageSrc:
      "/images/calculators/headers/self-employed-affordability.png",
    headerImageAlt: "Self-employed affordability infographic header",
    imageSrc: "/images/calculators/self-employed-affordability.png",
    imageAlt: "Self-employed affordability calculator visual",
    previewBars: [45, 57, 66, 74, 81],
    previewStats: [
      { label: "Target DTI", value: "50%" },
      { label: "Output", value: "Price Range" },
    ],
  },
  {
    id: "dscr",
    title: "DSCR Investor Calculator",
    description:
      "Measure cash-flow coverage ratio for investment property qualification.",
    href: ROUTES.dscr,
    cta: "Calculate DSCR",
    category: "Investor",
    headerImageSrc: "/images/calculators/headers/dscr-investor-calculator.png",
    headerImageAlt: "DSCR investor calculator infographic header",
    imageSrc: "/images/calculators/dscr-investor-calculator.png",
    imageAlt: "DSCR investor calculator visual",
    previewBars: [40, 52, 63, 78, 91],
    previewStats: [
      { label: "Strong Zone", value: ">= 1.20" },
      { label: "Borderline", value: "1.00 to 1.19" },
    ],
  },
  {
    id: "debt-consolidation-savings",
    title: "Debt Consolidation Savings",
    description:
      "Compare current debt payments versus an equity-backed consolidation option.",
    href: ROUTES.debtConsolidationSavings,
    cta: "Estimate Savings",
    category: "Equity",
    headerImageSrc:
      "/images/calculators/headers/debt-consolidation-savings.png",
    headerImageAlt: "Debt consolidation savings infographic header",
    imageSrc: "/images/calculators/debt-consolidation-savings.png",
    imageAlt: "Debt consolidation savings calculator visual",
    previewBars: [92, 81, 64, 52],
    previewStats: [
      { label: "Focus", value: "Monthly Relief" },
      { label: "View", value: "5-year savings" },
    ],
  },
  {
    id: "rate-buydown",
    title: "Rate Buydown",
    description: "Compare permanent points and temporary 2-1 buydown impact.",
    href: ROUTES.rateBuydown,
    cta: "Model Buydown",
    category: "Purchase",
    headerImageSrc: "/images/calculators/headers/rate-buydown-lower-rate.png",
    headerImageAlt: "Rate buydown infographic header",
    imageSrc: "/images/calculators/rate-buydown.png",
    imageAlt: "Rate buydown calculator visual",
    previewBars: [88, 72, 58],
    previewStats: [
      { label: "Permanent", value: "Points" },
      { label: "Temporary", value: "2-1" },
    ],
  },
  {
    id: "rent-vs-buy",
    title: "Rent vs Buy",
    description:
      "Compare monthly outflow and net worth over a custom holding period.",
    href: ROUTES.rentVsBuy,
    cta: "Run Buy vs Rent",
    category: "Purchase",
    headerImageSrc: "/images/calculators/headers/rent-vs-buy.png",
    headerImageAlt: "Rent versus buy infographic header",
    imageSrc: "/images/calculators/rent-vs-buy.png",
    imageAlt: "Rent versus buy calculator visual",
    previewBars: [46, 49, 58, 67, 77],
    previewStats: [
      { label: "Best for", value: "5+ years" },
      { label: "Output", value: "Net position" },
    ],
  },
];

export function findToolById(id: ToolId): MortgageToolCard {
  const match = mortgageTools.find((tool) => tool.id === id);
  if (!match) {
    throw new Error(`Unknown mortgage tool: ${id}`);
  }

  return match;
}
