import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { mortgageTools } from "../../data/mortgageTools";
import { assetPath } from "../../utils/assetPath";
import "./MortgageTools.css";

function MortgageToolsHub() {
  return (
    <section className="tools-hub-section">
      <div className="tools-hub-heading">
        <h1>Mortgage Tools</h1>
        <p>
          Run scenario-based calculators built for sophisticated borrowers,
          self-employed income profiles, investors, and refinance decisions.
        </p>
      </div>

      <div className="tools-hub-grid">
        {mortgageTools.map((tool) => (
          <article
            key={tool.id}
            className="tool-card"
            style={
              {
                "--tool-card-image": `url(${assetPath(tool.imageSrc)})`,
              } as CSSProperties
            }
            aria-label={tool.imageAlt}
          >
            <div className="tool-card__inner">
              <div className="tool-card__face tool-card__face--front">
                <div className="tool-card__top">
                  <span className="tool-card__category">{tool.category}</span>
                  <h2>{tool.title}</h2>
                  <p>{tool.description}</p>
                  <p className="tool-card__hint">Hover to see quick summary</p>
                </div>

                <div className="tool-card__actions">
                  <Link to={tool.href} className="tool-card__primary">
                    {tool.cta}
                  </Link>
                </div>
              </div>

              <div className="tool-card__face tool-card__face--back">
                <div className="tool-card__back-content">
                  <span className="tool-card__category">{tool.category}</span>
                  <h3>{tool.title} Snapshot</h3>
                  <ul className="tool-card__summary-list">
                    {tool.previewStats.map((stat) => (
                      <li key={`${tool.id}-${stat.label}`}>
                        <span>{stat.label}</span>
                        <strong>{stat.value}</strong>
                      </li>
                    ))}
                  </ul>
                  <div className="tool-card__actions">
                    <Link to={tool.href} className="tool-card__primary">
                      Open Calculator
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MortgageToolsHub;
