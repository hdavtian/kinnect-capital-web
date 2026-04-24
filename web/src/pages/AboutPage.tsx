import AboutSidebarNav from "../components/layout/AboutSidebarNav";
import { aboutSections } from "../data/siteContent";
import { assetPath } from "../utils/assetPath";

function AboutPage() {
  return (
    <section className="about-page">
      <div className="tools-page-layout">
        <AboutSidebarNav />
        <div className="tools-page-content">
          <h1>About Kinnect Capital</h1>
          <figure className="page-hero-image about-page-hero-frame">
            <div
              className="about-page-hero about-page-hero--top"
              style={{
                backgroundImage: `url(${assetPath("/images/about/about.avif")})`,
              }}
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
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
