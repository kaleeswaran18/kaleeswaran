const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
    (el) => el.offsetParent !== null && !el.closest('[aria-hidden="true"]'),
  );
}

export function findNextInDirection(current, direction, elements) {
  const rect = current.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  let best = null;
  let bestScore = Infinity;

  for (const el of elements) {
    if (el === current) continue;

    const r = el.getBoundingClientRect();
    const ex = r.left + r.width / 2;
    const ey = r.top + r.height / 2;
    const dx = ex - cx;
    const dy = ey - cy;

    const isHorizontal = direction === 'ArrowLeft' || direction === 'ArrowRight';
    const isVertical = direction === 'ArrowUp' || direction === 'ArrowDown';

    if (direction === 'ArrowLeft' && dx >= -20) continue;
    if (direction === 'ArrowRight' && dx <= 20) continue;
    if (direction === 'ArrowUp' && dy >= -20) continue;
    if (direction === 'ArrowDown' && dy <= 20) continue;

    const primary = isHorizontal ? Math.abs(dx) : Math.abs(dy);
    const secondary = isHorizontal ? Math.abs(dy) : Math.abs(dx);
    const score = primary + secondary * 2.5;

    if (score < bestScore) {
      bestScore = score;
      best = el;
    }
  }

  return best;
}

export function isActivationKey(key) {
  return key === 'Enter' || key === ' ' || key === 'NumpadEnter';
}

export function isHorizontalNavKey(key) {
  return key === 'ArrowLeft' || key === 'ArrowRight';
}
