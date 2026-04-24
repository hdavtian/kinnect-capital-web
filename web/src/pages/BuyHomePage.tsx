import { Link } from "react-router-dom";
import ResourcesSidebarNav from "../components/layout/ResourcesSidebarNav";
import { buyHomeSections } from "../data/siteContent";
import { assetPath } from "../utils/assetPath";

function BuyHomePage() {
  const [overviewSection, ...additionalSections] = buyHomeSections;

  return (
    <section className="content-page buy-home-page">
      <div className="tools-page-layout">
        <ResourcesSidebarNav />
        <div className="tools-page-content">
          {overviewSection ? <h1>{overviewSection.heading}</h1> : null}

          <figure className="page-hero-image content-page-hero-frame">
            <div
              className="content-page-hero content-page-hero--v42 content-page-hero--v03 content-page-hero--v44"
              style={{
                backgroundImage: `url(${assetPath("/images/buy-a-home.avif")})`,
              }}
              role="img"
              aria-label="Buy a home planning visual placeholder"
            >
              <span className="content-page-hero-title" aria-hidden="true">
                BUY A HOME
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

export default BuyHomePage;
