import { assetPath } from "../../utils/assetPath";

export interface ResidentialOptionItem {
  id: string;
  title: string;
  tagline: string;
  bullets: string[];
  imagePath: string;
}

interface ResidentialOptionCardProps {
  item: ResidentialOptionItem;
  isActive?: boolean;
}

function ResidentialOptionCard({
  item,
  isActive = false,
}: ResidentialOptionCardProps) {
  return (
    <article
      id={item.id}
      className={`residential-option-card${isActive ? " is-active" : ""}`}
    >
      <div className="residential-option-card__media">
        <img
          src={assetPath(item.imagePath)}
          alt={`${item.title} infographic`}
          loading="lazy"
        />
      </div>

      <div className="residential-option-card__body">
        <h2 className="residential-option-card__title">{item.title}</h2>
        <p className="residential-option-card__tagline">{item.tagline}</p>
        <ul className="residential-option-card__bullets">
          {item.bullets.map((bullet) => (
            <li key={`${item.id}-${bullet}`}>{bullet}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default ResidentialOptionCard;
