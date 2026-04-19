import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";
import "./QuickLinks.css";

interface QuickLinkPanel {
  id: string;
  label: string;
  description: string;
  href: string;
  cta: string;
}

const panels: QuickLinkPanel[] = [
  {
    id: "residential",
    label: "Residential Mortgage Options",
    description:
      "Bank statements, P&L, asset-based, DSCR, and more — flexible solutions for self-employed and complex borrowers.",
    href: ROUTES.residential,
    cta: "Explore Loan Programs",
  },
  {
    id: "commercial",
    label: "Commercial Financing",
    description:
      "Multi-family, office, and mixed-use properties — access our vast network of commercial lenders and competitive rates.",
    href: ROUTES.commercial,
    cta: "Discuss Your Scenario",
  },
  {
    id: "calculator",
    label: "Mortgage Calculator",
    description:
      "Estimate your monthly payment with our real-time calculator. Adjust rate, term, taxes, and insurance instantly.",
    href: ROUTES.calculator,
    cta: "Run the Numbers",
  },
];

function QuickLinks() {
  return (
    <div className="quick-links">
      {panels.map((panel) => (
        <Link key={panel.id} to={panel.href} className="quick-links__panel">
          <div className="quick-links__panel-inner">
            <h3 className="quick-links__label">{panel.label}</h3>
            <p className="quick-links__description">{panel.description}</p>
            <span className="quick-links__cta">{panel.cta} &rarr;</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default QuickLinks;
