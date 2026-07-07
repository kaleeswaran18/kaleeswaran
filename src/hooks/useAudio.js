import { useCallback, useRef, useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { pronounceWord, stopAudio } from '../services/audioService';

export function useAudio() {
  const { settings } = useSettings();
  const [isPlaying, setIsPlaying] = useState(false);
  const playingRef = useRef(false);

  const play = useCallback(
    async (word, audioPath) => {
      if (!settings.soundEnabled || playingRef.current) return;

      playingRef.current = true;
      setIsPlaying(true);

      try {
        await pronounceWord(word, audioPath);
      } catch {
        /* silent fail */
      } finally {
        playingRef.current = false;
        setIsPlaying(false);
      }
    },
    [settings.soundEnabled],
  );

  const stop = useCallback(() => {
    stopAudio();
    playingRef.current = false;
    setIsPlaying(false);
  }, []);

  return { play, stop, isPlaying, soundEnabled: settings.soundEnabled };
}
