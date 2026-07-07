import { useEffect, useRef } from 'react';
import { getFocusableElements, findNextInDirection } from '../utils/spatialNavigation';

const NAV_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

export function useSpatialNavigation(enabled = true) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e) => {
      if (!NAV_KEYS.includes(e.key)) return;
      if (!container.contains(document.activeElement)) return;

      const focusable = getFocusableElements(container);
      const current = document.activeElement;
      const next = findNextInDirection(current, e.key, focusable);

      if (next) {
        e.preventDefault();
        next.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);

  return containerRef;
}

export function useInitialTvFocus(containerRef, selector = '.category-card, button, a[href]') {
  useEffect(() => {
    if (!document.documentElement.classList.contains('tv-mode')) return;

    const timer = setTimeout(() => {
      const first = containerRef.current?.querySelector(selector);
      first?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, [containerRef, selector]);
}
