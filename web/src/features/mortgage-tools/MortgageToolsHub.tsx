import { Link } from "react-router-dom";
import { mortgageTools } from "../../data/mortgageTools";
import { assetPath } from "../../utils/assetPath";
import "./MortgageTools.css";
import ToolsSidebarNav from "./ToolsSidebarNav";

function MortgageToolsHub() {
  return (
    <section className="tools-hub-section">
      <div className="tools-page-layout">
        <ToolsSidebarNav />
        <div className="tools-page-content">
          <div className="tools-hub-grid">
            {mortgageTools.map((tool) => (
              <Link
                key={tool.id}
                to={tool.href}
                className="tools-hub-tile"
                aria-label={tool.imageAlt}
              >
                <span
                  className="tools-hub-tile-media"
                  style={{ backgroundImage: `url(${assetPath(tool.imageSrc)})` }}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MortgageToolsHub;
