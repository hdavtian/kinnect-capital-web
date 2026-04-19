import { Link } from "react-router-dom";
import { buyHomeSections } from "../data/siteContent";

function BuyHomePage() {
  return (
    <section>
      {buyHomeSections.map((entry, index) => (
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

export default BuyHomePage;
