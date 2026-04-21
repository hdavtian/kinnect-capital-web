import { teamIntroSections } from "../data/siteContent";
import { testimonials } from "../data/testimonials";
import ArthurProfileSection from "../features/team/ArthurProfileSection";
import TestimonialsSection from "../features/team/TestimonialsSection";

function TeamPage() {
  const [arthurIntro, ...additionalSections] = teamIntroSections;

  return (
    <section>
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
    </section>
  );
}

export default TeamPage;
