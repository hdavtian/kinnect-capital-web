import { Link } from "react-router-dom";
import { footerContent } from "../../data/footer";
import { ROUTES } from "../../routes";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="site-footer">
      {/* ── Main body: 4-column link grid ── */}
      <div className="footer-body">
        <div className="inner-wrap footer-body-inner">
          {/* Col 1 — Brand + contact */}
          <div className="footer-brand footer-col">
            <div className="logo-mark" aria-hidden="true">
              KC
            </div>
            <p className="footer-brand-name">Kinnect Capital</p>
            <p className="footer-brand-tagline">
              Residential Mortgage Brokerage
            </p>
            <a
              className="footer-contact-item"
              href={`tel:${footerContent.officePhone.replace(/\D/g, "")}`}
            >
              Office: {footerContent.officePhone}
            </a>
            <a
              className="footer-contact-item"
              href={`tel:${footerContent.mobilePhone.replace(/\D/g, "")}`}
            >
              Mobile: {footerContent.mobilePhone}
            </a>
            <a
              className="footer-contact-item"
              href={`mailto:${footerContent.email}`}
            >
              {footerContent.email}
            </a>
            {footerContent.addressLines.map((line) => (
              <span className="footer-contact-item" key={line}>
                {line}
              </span>
            ))}
          </div>

          {/* Col 2 — Company */}
          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              <li>
                <Link to={ROUTES.about}>About Kinnect Capital</Link>
              </li>
              <li>
                <Link to={ROUTES.team}>Meet the Team</Link>
              </li>
              <li>
                <Link to={ROUTES.contact}>Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div className="footer-col">
            <h3>Services</h3>
            <ul>
              <li>
                <Link to={ROUTES.residential}>
                  Residential Mortgage Options
                </Link>
              </li>
              <li>
                <Link to={ROUTES.commercial}>Commercial Financing</Link>
              </li>
              <li>
                <Link to={ROUTES.buyHome}>Buy a Home</Link>
              </li>
              <li>
                <Link to={ROUTES.refinance}>Refinance</Link>
              </li>
            </ul>
          </div>

          {/* Col 4 — Tools & Licensing */}
          <div className="footer-col">
            <h3>Tools</h3>
            <ul>
              <li>
                <Link to={ROUTES.calculator}>Mortgage Calculator</Link>
              </li>
              <li>
                <Link to={ROUTES.valuation}>Home Valuation</Link>
              </li>
            </ul>
            <div className="footer-licensing">
              <p>{footerContent.nmlsCompany}</p>
              <p>{footerContent.dreCompany}</p>
              <p>{footerContent.nmlsArthur}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar: copyright + legal links ── */}
      <div className="footer-bottom">
        <div className="inner-wrap footer-bottom-inner">
          <p className="footer-bottom-copy">
            &copy; {currentYear} Kinnect Capital. All rights reserved.
          </p>
          <nav className="footer-bottom-links" aria-label="Legal">
            <Link to={ROUTES.privacy}>Privacy Policy</Link>
            <Link to={ROUTES.terms}>Terms of Use</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
