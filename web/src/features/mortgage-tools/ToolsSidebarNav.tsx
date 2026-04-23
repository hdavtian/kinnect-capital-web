import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes";

const calculatorLinks = [
  { id: "tools-hub", label: "Tools Hub", href: ROUTES.toolsHub },
  {
    id: "mortgage-calculator",
    label: "Mortgage Calculator",
    href: ROUTES.calculator,
  },
  {
    id: "loan-term-comparison",
    label: "Loan Term Comparison",
    href: ROUTES.termComparison,
  },
  {
    id: "refinance-break-even",
    label: "Refinance Break-Even",
    href: ROUTES.refinanceBreakeven,
  },
  {
    id: "cashout-vs-heloc-heloan",
    label: "Cash-Out vs HELOC vs HELOAN",
    href: ROUTES.cashOutVsHelocHeloan,
  },
  { id: "arm-vs-fixed", label: "ARM vs Fixed", href: ROUTES.armVsFixed },
  {
    id: "self-employed-affordability",
    label: "Self-Employed Affordability",
    href: ROUTES.selfEmployedAffordability,
  },
  { id: "dscr", label: "DSCR Calculator", href: ROUTES.dscr },
  {
    id: "debt-consolidation-savings",
    label: "Debt Consolidation Savings",
    href: ROUTES.debtConsolidationSavings,
  },
  {
    id: "rate-buydown",
    label: "Rate Buydown",
    href: ROUTES.rateBuydown,
  },
  { id: "rent-vs-buy", label: "Rent vs Buy", href: ROUTES.rentVsBuy },
  { id: "home-valuation", label: "Home Valuation", href: ROUTES.valuation },
] as const;

function ToolsSidebarNav() {
  return (
    <aside className="tools-page-sidebar" aria-label="Calculator links">
      <h2>Calculators</h2>
      <nav>
        <ul>
          {calculatorLinks.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.href}
                end={item.href === ROUTES.toolsHub}
                className={({ isActive }) =>
                  `tools-page-sidebar-link${isActive ? " is-current" : ""}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default ToolsSidebarNav;
