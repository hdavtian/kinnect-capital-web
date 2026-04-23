import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { contactCta, topNav } from "../../data/navigation";

function Header() {
  const location = useLocation();
  const visibleTopNav = topNav.filter((group) => group.id !== "home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {},
  );

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

  function normalizePath(path: string): string {
    const normalized = path.replace(/\/+$/, "");
    return normalized || "/";
  }

  function isCurrentPath(href: string): boolean {
    return normalizePath(location.pathname) === normalizePath(href);
  }

  return (
    <header className="site-header">
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
              {visibleTopNav.map((group) => (
                <li key={group.id} className="nav-group-item">
                  {group.children.length > 0 ? (
                    <button
                      type="button"
                      className={`nav-group-toggle${group.children.some((child) => isCurrentPath(child.href)) ? " is-current" : ""}`}
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
                    <NavLink
                      to={group.href}
                      end={group.href === "/"}
                      className={({ isActive }) =>
                        `nav-top-link${isActive ? " is-current" : ""}`
                      }
                      onClick={handleChildClick}
                    >
                      {group.label}
                    </NavLink>
                  ) : (
                    <span>{group.label}</span>
                  )}

                  {group.children.length > 0 ? (
                    <ul
                      className={`nav-sublist ${expandedGroups[group.id] ? "expanded" : ""}`}
                    >
                      {group.children.map((child) => (
                        <li key={child.id}>
                          <NavLink
                            to={child.href}
                            end
                            className={({ isActive }) =>
                              isActive ? "is-current" : ""
                            }
                            onClick={handleChildClick}
                          >
                            {child.label}
                          </NavLink>
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
