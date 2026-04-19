import { Link } from "react-router-dom";
import { commercialSections } from "../data/siteContent";

function CommercialFinancingPage() {
  return (
    <section>
      {commercialSections.map((entry, index) => (
        <article key={entry.id} className="content-section">
          {index === 0 ? <h1>{entry.heading}</h1> : <h2>{entry.heading}</h2>}
          {entry.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {entry.cta ? (
            <Link to={entry.cta.href}>{entry.cta.label}</Link>
          ) : null}
        </article>
      ))}
    </section>
  );
}

export default CommercialFinancingPage;
