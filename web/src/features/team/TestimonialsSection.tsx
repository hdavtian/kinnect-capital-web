import type { Testimonial } from "../../types/content";
import "./TestimonialsSection.css";

interface TestimonialsSectionProps {
  items: Testimonial[];
}

function TestimonialsSection({ items }: TestimonialsSectionProps) {
  return (
    <section
      className="team-testimonials"
      aria-labelledby="team-testimonials-title"
    >
      <div className="team-testimonials__header">
        <h2 id="team-testimonials-title">Testimonials</h2>
        <p>What clients say about working with Arthur and the Kinnect team.</p>
      </div>

      <ul className="team-testimonials__grid">
        {items.map((item) => (
          <li key={item.id} className="team-testimonial-card">
            <blockquote className="team-testimonial-card__quote">
              {item.body}
            </blockquote>
            <p className="team-testimonial-card__name">{item.name}</p>
            <p className="team-testimonial-card__attribution">
              {item.attribution}
            </p>
            {item.isDraft ? (
              <p className="team-testimonial-card__note">
                Draft testimonial pending final approval.
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TestimonialsSection;
