import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { contactCta, topNav } from "../../data/navigation";

gsap.registerPlugin(ScrollTrigger);

type ThemeName =
  | "classic"
  | "usc-subtle"
  | "warm"
  | "coastal"
  | "investment-green";

const THEME_STORAGE_KEY = "kinnect-theme";

function Header() {
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {},
  );
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top-=40px",
      end: "max",
      onEnter: () => el.classList.add("site-header--scrolled"),
      onLeaveBack: () => el.classList.remove("site-header--scrolled"),
    });
    return () => trigger.kill();
  }, []);

  function toggleGroup(groupId: string) {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setExpandedGroups({});
  }

  function handleChildClick() {
    closeMobileMenu();
    // Remove :focus-within so desktop dropdown hides immediately after navigation
    requestAnimationFrame(() => {
      (document.activeElement as HTMLElement)?.blur();
    });
  }

  return (
    <header ref={headerRef} className="site-header">
      {/* ── Band 1: Identity / Brand ── */}
      <div className="header-top">
        <div className="inner-wrap header-top-inner">
          <div className="brand">
            <Link to="/" onClick={closeMobileMenu}>
              <span className="logo-mark" aria-hidden="true">
                KC
              </span>
              <span className="brand-text-wrap">
                <strong>Kinnect Capital</strong>
                <small>Residential Mortgage Brokerage</small>
              </span>
            </Link>
          </div>

          <div className="header-top-actions">
            <label className="theme-select-wrap">
              <span>Theme</span>
              <select
                className="theme-select"
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
          </div>
        </div>
      </div>

      {/* ── Band 2: Navigation ── */}
      <div className="header-nav">
        <div className="inner-wrap header-nav-inner">
          <button
            type="button"
            className="mobile-menu-button"
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>

          <nav
            id="primary-navigation"
            className={mobileMenuOpen ? "primary-nav open" : "primary-nav"}
            aria-label="Primary"
          >
            <ul className="nav-list">
              {topNav.map((group) => (
                <li key={group.id} className="nav-group-item">
                  {group.children.length > 0 ? (
                    <button
                      type="button"
                      className="nav-group-toggle"
                      onClick={(e) => {
                        toggleGroup(group.id);
                        // Capture element ref before returning — React nullifies currentTarget after the handler
                        const btn = e.currentTarget as HTMLElement;
                        btn.blur();
                      }}
                      aria-expanded={Boolean(expandedGroups[group.id])}
                    >
                      {group.label}
                      <span className="nav-caret" aria-hidden="true">
                        ▾
                      </span>
                    </button>
                  ) : group.href ? (
                    <Link
                      to={group.href}
                      className="nav-top-link"
                      onClick={handleChildClick}
                    >
                      {group.label}
                    </Link>
                  ) : (
                    <span>{group.label}</span>
                  )}

                  {group.children.length > 0 ? (
                    <ul
                      className={`nav-sublist ${expandedGroups[group.id] ? "expanded" : ""}`}
                    >
                      {group.children.map((child) => (
                        <li key={child.id}>
                          <Link to={child.href} onClick={handleChildClick}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-cta-wrap">
            <Link
              className="primary-cta"
              to={contactCta.href}
              onClick={closeMobileMenu}
            >
              {contactCta.label}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
