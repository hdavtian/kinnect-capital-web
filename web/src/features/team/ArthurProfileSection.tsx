import "./ArthurProfileSection.css";

interface ArthurProfileSectionProps {
  heading: string;
  body: string[];
}

function ArthurProfileSection({ heading, body }: ArthurProfileSectionProps) {
  const [firstParagraph, ...restParagraphs] = body;
  const nameLead = "Arthur Kumasian";

  return (
    <article className="team-arthur-profile">
      <div className="team-arthur-profile__media">
        <img
          src="/images/ak/arthur-kumas.avif"
          alt="Arthur Kumasian"
          loading="lazy"
        />
      </div>

      <div className="team-arthur-profile__content">
        <h1>{heading}</h1>
        {firstParagraph ? (
          <p>
            {firstParagraph.startsWith(nameLead) ? (
              <>
                <strong className="team-arthur-profile__name">
                  {nameLead}
                </strong>
                {firstParagraph.slice(nameLead.length)}
              </>
            ) : (
              firstParagraph
            )}
          </p>
        ) : null}
        {restParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

export default ArthurProfileSection;
