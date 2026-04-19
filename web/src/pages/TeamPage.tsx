import { teamIntroSections } from "../data/siteContent";
import { testimonials } from "../data/testimonials";

function TeamPage() {
  return (
    <section>
      <figure className="page-hero-image page-hero-image--compact">
        <img
          src="/images/team-placeholder.svg"
          alt="Team and testimonials placeholder visual"
        />
      </figure>
      {teamIntroSections.map((entry, index) => (
        <article key={entry.id} className="content-section">
          {index === 0 ? <h1>{entry.heading}</h1> : <h2>{entry.heading}</h2>}
          {entry.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      ))}
      <h2>Testimonials</h2>
      <ul className="testimonial-list">
        {testimonials.map((item) => (
          <li key={item.id} className="testimonial-item">
            <h3>{item.name}</h3>
            <p>{item.body}</p>
            <p>{item.attribution}</p>
            {item.isDraft ? (
              <p>Content note: this testimonial needs final approved copy.</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TeamPage;
