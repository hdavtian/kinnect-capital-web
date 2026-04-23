import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { SiZillow } from "react-icons/si";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { footerContent } from "../../data/footer";
import { ROUTES } from "../../routes";

const currentYear = new Date().getFullYear();

type ThemeName =
  | "classic"
  | "usc-subtle"
  | "warm"
  | "coastal"
  | "investment-green";

const THEME_STORAGE_KEY = "kinnect-theme";

function Footer() {
  const [theme, setTheme] = useState<ThemeName>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (
      stored === "warm" ||
      stored === "coastal" ||
      stored === "classic" ||
      stored === "usc-subtle" ||
      stored === "investment-green"
    ) {
      return stored;
    }

    return "classic";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <footer className="site-footer">
      {/* ── Main body: 4-column link grid ── */}
      <div className="footer-body">
        <div className="inner-wrap footer-body-inner">
          {/* Col 1 — Brand + contact */}
          <div className="footer-brand footer-col">
            <div className="footer-brand-lockup">
              <div className="logo-mark" aria-hidden="true">
                KC
              </div>
              <div className="footer-brand-text-wrap">
                <p className="footer-brand-name">Kinnect Capital</p>
                <p className="footer-brand-tagline">
                  Residential Mortgage Brokerage
                </p>
              </div>
            </div>
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

            <div
              className="footer-social"
              aria-label="Social and contact links"
            >
              <a
                className="footer-social-link"
                href="https://www.linkedin.com/in/arthur-kumasian-00936726/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn aria-hidden="true" />
              </a>
              <a
                className="footer-social-link"
                href="https://www.zillow.com/profile/Arthur%20Kumasian"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zillow"
              >
                <SiZillow aria-hidden="true" />
              </a>
              <a
                className="footer-social-link"
                href="https://www.facebook.com/kinnectcapital/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF aria-hidden="true" />
              </a>
              <a
                className="footer-social-link"
                href="https://www.instagram.com/kinnectcapital/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram aria-hidden="true" />
              </a>
              <a
                className="footer-social-link"
                href="mailto:arthur@kinnectcapital.com"
                aria-label="Email Arthur Kumasian"
              >
                <FaEnvelope aria-hidden="true" />
              </a>
            </div>
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
            <label className="footer-theme-select-wrap">
              <span>Theme</span>
              <select
                className="footer-theme-select"
                value={theme}
                onChange={(event) => setTheme(event.target.value as ThemeName)}
              >
                <option value="classic">Classic</option>
                <option value="usc-subtle">USC Subtle</option>
                <option value="warm">Warm</option>
                <option value="coastal">Coastal</option>
                <option value="investment-green">Investment Green</option>
              </select>
            </label>
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
