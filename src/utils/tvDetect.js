const TV_UA_PATTERN =
  /smart-tv|smarttv|googletv|appletv|hbbtv|netcast|viera|webos|tizen|crkey|aftb|aftm|afts|nexus player|bravia|firetv|fire tv|roku/i;

export function detectTvMode() {
  if (typeof window === 'undefined') return false;

  if (new URLSearchParams(window.location.search).get('tv') === '1') return true;

  const ua = navigator.userAgent.toLowerCase();
  if (TV_UA_PATTERN.test(ua)) return true;

  const largeScreen = window.matchMedia('(min-width: 1280px)').matches;
  const noHover = window.matchMedia('(hover: none)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

  return largeScreen && noHover && coarsePointer;
}

export function initTvMode() {
  const apply = () => {
    document.documentElement.classList.toggle('tv-mode', detectTvMode());
  };

  apply();

  window.addEventListener('resize', apply);
  return () => window.removeEventListener('resize', apply);
}
