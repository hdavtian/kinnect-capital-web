import { aboutSections } from "../data/siteContent";
import { assetPath } from "../utils/assetPath";

function AboutPage() {
  return (
    <section className="about-page">
      <h1>About Kinnect Capital</h1>
      <figure className="page-hero-image about-page-hero-frame">
        <div
          className="about-page-hero about-page-hero--top"
          style={{ backgroundImage: `url(${assetPath("/images/calculators/new/about-top-b.png")})` }}
          role="img"
          aria-label="About Kinnect Capital visual"
        />
      </figure>
      {aboutSections.map((section) => (
        <article
          key={section.id}
          className="content-section about-page-section"
        >
          <h2>{section.heading}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.bullets ? (
            <ul>
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}

      <figure className="page-hero-image about-page-hero-frame about-page-hero-frame--bottom">
        <div
          className="about-page-hero about-page-hero--bottom"
          style={{ backgroundImage: `url(${assetPath("/images/calculators/new/about-bottom-b.png")})` }}
          role="img"
          aria-label="Kinnect Capital team and lending landscape visual"
        />
      </figure>
    </section>
  );
}

export default AboutPage;
