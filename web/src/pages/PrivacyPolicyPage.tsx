import { privacyPolicy } from "../data/legal";

function PrivacyPolicyPage() {
  return (
    <section>
      <h1>{privacyPolicy.title}</h1>
      <p className="legal-updated">Last updated: {privacyPolicy.lastUpdated}</p>
      {privacyPolicy.sections.map((section) => (
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

export default PrivacyPolicyPage;
