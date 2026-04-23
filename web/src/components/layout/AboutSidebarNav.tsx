import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes";

function AboutSidebarNav() {
  return (
    <aside className="tools-page-sidebar" aria-label="About pages">
      <h2>About</h2>
      <nav>
        <ul>
          <li>
            <NavLink
              to={ROUTES.about}
              end
              className={({ isActive }) =>
                `tools-page-sidebar-link${isActive ? " is-current" : ""}`
              }
            >
              About Kinnect Capital
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.team}
              end
              className={({ isActive }) =>
                `tools-page-sidebar-link${isActive ? " is-current" : ""}`
              }
            >
              Meet the Team
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AboutSidebarNav;
