import { termsOfUse } from "../data/legal";

function TermsOfUsePage() {
  return (
    <section>
      <h1>{termsOfUse.title}</h1>
      <p className="legal-updated">Last updated: {termsOfUse.lastUpdated}</p>
      {termsOfUse.sections.map((section) => (
        <article key={section.id} className="content-section">
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      ))}
    </section>
  );
}

export default TermsOfUsePage;
