import { Link } from "react-router-dom";
import { commercialSections } from "../data/siteContent";
import { assetPath } from "../utils/assetPath";

function CommercialFinancingPage() {
  const [overviewSection, ...additionalSections] = commercialSections;

  return (
    <section className="content-page commercial-financing-page">
      {overviewSection ? <h1>{overviewSection.heading}</h1> : null}

      <figure className="page-hero-image content-page-hero-frame">
        <div
          className="content-page-hero"
          style={{
            backgroundImage: `url(${assetPath("/images/office-building.png")})`,
          }}
          role="img"
          aria-label="Commercial financing visual placeholder"
        />
      </figure>

      {overviewSection ? (
        <article className="content-section content-page-section">
          {overviewSection.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {overviewSection.cta ? (
            <Link className="content-page-link" to={overviewSection.cta.href}>
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
    </section>
  );
}

export default CommercialFinancingPage;
