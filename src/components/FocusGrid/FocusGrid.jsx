import { useRef } from 'react';
import { useInitialTvFocus } from '../../hooks/useSpatialNavigation';
import './FocusGrid.css';

export default function FocusGrid({ className = '', children }) {
  const containerRef = useRef(null);
  useInitialTvFocus(containerRef);

  return (
    <div
      ref={containerRef}
      className={`focus-grid card-grid ${className}`.trim()}
      role="list"
    >
      {children}
    </div>
  );
}
