import { Link } from "react-router-dom";
import { homeSections } from "../data/siteContent";

function HomePage() {
  return (
    <section>
      <figure className="page-hero-image">
        <img
          src="/images/hero-placeholder.svg"
          alt="Mortgage strategy hero placeholder"
        />
      </figure>

      {homeSections.map((entry, index) => (
        <article key={entry.id} className="content-section">
          {index === 0 ? <h1>{entry.heading}</h1> : <h2>{entry.heading}</h2>}
          {entry.subheading ? <p>{entry.subheading}</p> : null}
          {entry.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {entry.bullets ? (
            <ul>
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
          {entry.cta ? (
            <Link to={entry.cta.href}>{entry.cta.label}</Link>
          ) : null}
        </article>
      ))}
    </section>
  );
}

export default HomePage;
