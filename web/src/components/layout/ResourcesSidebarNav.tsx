import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes";

function ResourcesSidebarNav() {
  return (
    <aside className="tools-page-sidebar" aria-label="Resource pages">
      <h2>Resources</h2>
      <nav>
        <ul>
          <li>
            <NavLink
              to={ROUTES.buyHome}
              end
              className={({ isActive }) =>
                `tools-page-sidebar-link${isActive ? " is-current" : ""}`
              }
            >
              Buy a Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.refinance}
              end
              className={({ isActive }) =>
                `tools-page-sidebar-link${isActive ? " is-current" : ""}`
              }
            >
              Refinance
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default ResourcesSidebarNav;
