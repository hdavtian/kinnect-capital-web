import { aboutSections } from "../data/siteContent";

function AboutPage() {
  return (
    <section>
      <h1>About Kinnect Capital</h1>
      <figure className="page-hero-image page-hero-image--compact">
        <img
          src="/images/about-placeholder.svg"
          alt="About section placeholder imagery"
        />
      </figure>
      {aboutSections.map((section) => (
        <article key={section.id} className="content-section">
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
    </section>
  );
}

export default AboutPage;
