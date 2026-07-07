import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadSettings, saveSettings, applyTheme } from '../services/settingsService';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettingsState] = useState(() => loadSettings());

  useEffect(() => {
    applyTheme(settings.theme);
    saveSettings(settings);
  }, [settings]);

  const setTheme = useCallback((theme) => {
    setSettingsState((prev) => ({ ...prev, theme }));
  }, []);

  const toggleTheme = useCallback(() => {
    setSettingsState((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  }, []);

  const setSoundEnabled = useCallback((soundEnabled) => {
    setSettingsState((prev) => ({ ...prev, soundEnabled }));
  }, []);

  const toggleSound = useCallback(() => {
    setSettingsState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  return (
    <SettingsContext.Provider
      value={{ settings, setTheme, toggleTheme, setSoundEnabled, toggleSound }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
