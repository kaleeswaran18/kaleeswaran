import { useRef } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { useInitialTvFocus } from '../../hooks/useSpatialNavigation';
import './Settings.css';

export default function Settings() {
  const { settings, setTheme, toggleSound } = useSettings();
  const containerRef = useRef(null);
  useInitialTvFocus(containerRef, 'button');

  return (
    <div className="page-container settings" ref={containerRef}>
      <header className="settings__header animate-fade-in">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Customize your learning experience</p>
      </header>

      <section className="settings__section">
        <h2 className="settings__section-title">Appearance</h2>
        <div className="settings__options">
          <button
            type="button"
            className={`settings__option tv-focus-ring${settings.theme === 'light' ? ' settings__option--active' : ''}`}
            onClick={() => setTheme('light')}
          >
            <span className="settings__option-icon">☀️</span>
            <span className="settings__option-label">Light Mode</span>
            {settings.theme === 'light' && <CheckIcon />}
          </button>
          <button
            type="button"
            className={`settings__option tv-focus-ring${settings.theme === 'dark' ? ' settings__option--active' : ''}`}
            onClick={() => setTheme('dark')}
          >
            <span className="settings__option-icon">🌙</span>
            <span className="settings__option-label">Dark Mode</span>
            {settings.theme === 'dark' && <CheckIcon />}
          </button>
        </div>
      </section>

      <section className="settings__section">
        <h2 className="settings__section-title">Sound</h2>
        <button
          type="button"
          className="settings__toggle tv-focus-ring"
          onClick={toggleSound}
          role="switch"
          aria-checked={settings.soundEnabled}
        >
          <span className="settings__toggle-label">
            <span className="settings__option-icon">{settings.soundEnabled ? '🔊' : '🔇'}</span>
            Sound {settings.soundEnabled ? 'ON' : 'OFF'}
          </span>
          <span className={`settings__switch${settings.soundEnabled ? ' settings__switch--on' : ''}`}>
            <span className="settings__switch-thumb" />
          </span>
        </button>
      </section>

      <section className="settings__section">
        <h2 className="settings__section-title">About App</h2>
        <div className="settings__about">
          <div className="settings__about-logo">W</div>
          <h3 className="settings__about-name">WordSpark</h3>
          <p className="settings__about-version">Version 1.0.0</p>
          <p className="settings__about-desc">
            Learn English naturally by connecting images with spoken words.
            Designed for children, beginners, parents, and teachers.
          </p>
          <p className="settings__about-desc settings__about-tv">
            Smart TV: Use arrow keys to navigate. Press Enter or OK to select.
          </p>
        </div>
      </section>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="settings__check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
