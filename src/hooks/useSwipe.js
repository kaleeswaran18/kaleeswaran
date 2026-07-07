import { useRef, useCallback } from 'react';

const SWIPE_THRESHOLD = 50;
const VELOCITY_THRESHOLD = 0.3;

export function useSwipe({ onSwipeLeft, onSwipeRight, enabled = true }) {
  const touchStart = useRef(null);
  const touchDelta = useRef(0);
  const startTime = useRef(0);

  const handleTouchStart = useCallback(
    (e) => {
      if (!enabled) return;
      touchStart.current = e.touches[0].clientX;
      touchDelta.current = 0;
      startTime.current = Date.now();
    },
    [enabled],
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!enabled || touchStart.current === null) return;
      touchDelta.current = e.touches[0].clientX - touchStart.current;
    },
    [enabled],
  );

  const handleTouchEnd = useCallback(() => {
    if (!enabled || touchStart.current === null) return;

    const delta = touchDelta.current;
    const elapsed = Date.now() - startTime.current;
    const velocity = Math.abs(delta) / elapsed;

    if (Math.abs(delta) > SWIPE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
      if (delta < 0) onSwipeLeft?.();
      else onSwipeRight?.();
    }

    touchStart.current = null;
    touchDelta.current = 0;
  }, [enabled, onSwipeLeft, onSwipeRight]);

  const handleMouseDown = useCallback(
    (e) => {
      if (!enabled) return;
      touchStart.current = e.clientX;
      touchDelta.current = 0;
      startTime.current = Date.now();
    },
    [enabled],
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!enabled || touchStart.current === null) return;
      touchDelta.current = e.clientX - touchStart.current;
    },
    [enabled],
  );

  const handleMouseUp = useCallback(() => {
    handleTouchEnd();
  }, [handleTouchEnd]);

  return {
    swipeHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
    },
    delta: touchDelta,
  };
}
