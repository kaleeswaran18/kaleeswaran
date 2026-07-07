import { Link } from 'react-router-dom';
import './CategoryCard.css';

export default function CategoryCard({ to, name, image, onClick }) {
  const content = (
    <>
      <div className="category-card__image-wrap">
        <img
          src={image}
          alt=""
          className="category-card__image"
          loading="lazy"
          decoding="async"
        />
        <div className="category-card__overlay" />
      </div>
      <h3 className="category-card__name">{name}</h3>
    </>
  );

  const className = 'category-card tv-focus-ring animate-fade-in';

  if (to) {
    return (
      <Link to={to} className={className} aria-label={name} role="listitem">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick} aria-label={name} role="listitem">
      {content}
    </button>
  );
}
