import { useEffect } from 'react';

export function useTvVocabularyNav({ onPrev, onNext, enabled = true }) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

      e.preventDefault();
      e.stopPropagation();

      if (e.key === 'ArrowLeft') onPrev();
      else onNext();
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [enabled, onPrev, onNext]);
}
