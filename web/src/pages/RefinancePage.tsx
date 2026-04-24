import { Link } from "react-router-dom";
import ResourcesSidebarNav from "../components/layout/ResourcesSidebarNav";
import { refinanceSections } from "../data/siteContent";
import { assetPath } from "../utils/assetPath";

function RefinancePage() {
  const [overviewSection, ...additionalSections] = refinanceSections;

  return (
    <section className="content-page refinance-page">
      <div className="tools-page-layout">
        <ResourcesSidebarNav />
        <div className="tools-page-content">
          {overviewSection ? <h1>{overviewSection.heading}</h1> : null}

          <figure className="page-hero-image content-page-hero-frame">
            <div
              className="content-page-hero content-page-hero--v42 content-page-hero--v03 content-page-hero--v44"
              style={{
                backgroundImage: `url(${assetPath("/images/refinance.avif")})`,
              }}
              role="img"
              aria-label="Refinance strategy visual placeholder"
            >
              <span className="content-page-hero-title" aria-hidden="true">
                REFINANCE
              </span>
            </div>
          </figure>

          {overviewSection ? (
            <article className="content-section content-page-section">
              {overviewSection.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {overviewSection.cta ? (
                <Link
                  className="content-page-link"
                  to={overviewSection.cta.href}
                >
                  {overviewSection.cta.label}
                </Link>
              ) : null}
            </article>
          ) : null}

          {additionalSections.map((entry) => (
            <article
              key={entry.id}
              className="content-section content-page-section"
            >
              <h2>{entry.heading}</h2>
              {entry.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {entry.cta ? (
                <Link className="content-page-link" to={entry.cta.href}>
                  {entry.cta.label}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RefinancePage;
