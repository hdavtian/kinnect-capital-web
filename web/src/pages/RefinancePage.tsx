import { Link } from "react-router-dom";
import { refinanceSections } from "../data/siteContent";
import { assetPath } from "../utils/assetPath";

function RefinancePage() {
  return (
    <section className="content-page refinance-page">
      <figure className="page-hero-image content-page-hero-frame">
        <div
          className="content-page-hero"
          style={{
            backgroundImage: `url(${assetPath("/images/calculators/new/about-top-b.png")})`,
          }}
          role="img"
          aria-label="Refinance strategy visual placeholder"
        />
      </figure>

      {refinanceSections.map((entry, index) => (
        <article
          key={entry.id}
          className="content-section content-page-section"
        >
          {index === 0 ? <h1>{entry.heading}</h1> : <h2>{entry.heading}</h2>}
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

export default RefinancePage;
