import { forwardRef } from 'react';
import './SpeakerButton.css';

const SpeakerButton = forwardRef(function SpeakerButton(
  { onClick, isPlaying, disabled, label = 'Play pronunciation' },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={`speaker-btn tv-focus-ring${isPlaying ? ' speaker-btn--playing' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      <span className="speaker-btn__icon">
        {isPlaying ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1" className="speaker-btn__bar" />
            <rect x="14" y="5" width="4" height="14" rx="1" className="speaker-btn__bar speaker-btn__bar--2" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
            <path d="M15.54 8.46a5 5 0 010 7.07" />
            <path d="M19.07 4.93a10 10 0 010 14.14" />
          </svg>
        )}
      </span>
    </button>
  );
});

export default SpeakerButton;
