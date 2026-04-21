import { Link } from "react-router-dom";
import { homeSections } from "../data/siteContent";
import HeroCarousel from "../features/hero-carousel/HeroCarousel";
import QuickLinks from "../features/quick-links/QuickLinks";

function HomePage() {
  return (
    <section className="home-page">
      <HeroCarousel />
      <QuickLinks />

      <div className="home-sections-grid">
        {homeSections.map((entry, index) => (
          <article
            key={entry.id}
            className={`content-section home-feature home-feature--${entry.id}`}
          >
            <div className="home-feature__inner">
              {index === 0 ? <h1>{entry.heading}</h1> : <h2>{entry.heading}</h2>}
              {entry.subheading ? (
                <p className="home-feature__subheading">{entry.subheading}</p>
              ) : null}
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
                <Link to={entry.cta.href} className="home-feature__cta">
                  {entry.cta.label}
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
