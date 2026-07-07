import { useEffect } from 'react';
import { getFocusableElements, findNextInDirection } from '../utils/spatialNavigation';

export function useLearningVerticalNav(containerRef) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;

      const container = containerRef.current;
      if (!container || !container.contains(document.activeElement)) return;

      const focusable = getFocusableElements(container);
      const next = findNextInDirection(document.activeElement, e.key, focusable);

      if (next) {
        e.preventDefault();
        e.stopPropagation();
        next.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [containerRef]);
}

export function useTvBackNavigation(navigate) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== 'Backspace' && e.key !== 'Escape') return;

      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      e.preventDefault();
      navigate(-1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
}
