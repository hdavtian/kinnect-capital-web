import { teamIntroSections } from "../data/siteContent";
import { testimonials } from "../data/testimonials";
import AboutSidebarNav from "../components/layout/AboutSidebarNav";
import ArthurProfileSection from "../features/team/ArthurProfileSection";
import TestimonialsSection from "../features/team/TestimonialsSection";

function TeamPage() {
  const [arthurIntro, ...additionalSections] = teamIntroSections;

  return (
    <section className="about-page team-page">
      <div className="tools-page-layout">
        <AboutSidebarNav />
        <div className="tools-page-content">
          {arthurIntro ? (
            <ArthurProfileSection
              heading={arthurIntro.heading}
              body={arthurIntro.body}
            />
          ) : null}

          {additionalSections.map((entry) => (
            <article key={entry.id} className="content-section">
              <h2>{entry.heading}</h2>
              {entry.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}

          <TestimonialsSection items={testimonials} />
        </div>
      </div>
    </section>
  );
}

export default TeamPage;
