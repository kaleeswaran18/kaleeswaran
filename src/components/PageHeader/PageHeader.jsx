import { Link } from 'react-router-dom';
import './PageHeader.css';

export default function PageHeader({ title, backTo, backLabel = 'Go back' }) {
  return (
    <header className="page-header">
      {backTo && (
        <Link to={backTo} className="page-header__back tv-focus-ring" aria-label={backLabel}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
      )}
      {title && <h1 className="page-header__title">{title}</h1>}
    </header>
  );
}
