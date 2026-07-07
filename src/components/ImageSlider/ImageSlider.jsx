import { useState, useCallback, useRef, useEffect } from 'react';
import { useSwipe } from '../../hooks/useSwipe';
import { useTvVocabularyNav } from '../../hooks/useTvNavigation';
import SpeakerButton from '../SpeakerButton/SpeakerButton';
import { useAudio } from '../../hooks/useAudio';
import './ImageSlider.css';

export default function ImageSlider({ items, categoryName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const speakerRef = useRef(null);
  const { play, isPlaying, soundEnabled } = useAudio();

  const currentItem = items[currentIndex];

  const goTo = useCallback(
    (index, dir) => {
      if (index < 0 || index >= items.length) return;
      setDirection(dir);
      setCurrentIndex(index);
      setDragOffset(0);
    },
    [items.length],
  );

  const goNext = useCallback(() => goTo(currentIndex + 1, 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1, -1), [currentIndex, goTo]);

  useTvVocabularyNav({ onPrev: goPrev, onNext: goNext });

  const { swipeHandlers } = useSwipe({
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
    enabled: !isDragging,
  });

  const handleSpeaker = useCallback(() => {
    if (currentItem) {
      play(currentItem.name, currentItem.audio);
    }
  }, [currentItem, play]);

  useEffect(() => {
    if (currentItem && soundEnabled) {
      play(currentItem.name, currentItem.audio);
    }
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (document.documentElement.classList.contains('tv-mode')) {
      speakerRef.current?.focus();
    }
  }, [currentIndex]);

  const handleDragStart = (clientX) => {
    setIsDragging(true);
    dragStartX.current = clientX;
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    setDragOffset(clientX - dragStartX.current);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset < -80) goNext();
    else if (dragOffset > 80) goPrev();
    else setDragOffset(0);
  };

  if (!currentItem) return null;

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < items.length - 1;

  return (
    <div
      className="image-slider"
      role="region"
      aria-label={`${categoryName} vocabulary learning`}
      aria-roledescription="carousel"
      aria-live="polite"
      {...swipeHandlers}
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => isDragging && handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={() => isDragging && handleDragEnd()}
      onTouchStart={(e) => {
        swipeHandlers.onTouchStart(e);
        handleDragStart(e.touches[0].clientX);
      }}
      onTouchMove={(e) => {
        swipeHandlers.onTouchMove(e);
        handleDragMove(e.touches[0].clientX);
      }}
      onTouchEnd={() => {
        swipeHandlers.onTouchEnd();
        handleDragEnd();
      }}
    >
      <div className="image-slider__progress" aria-hidden="true">
        {items.map((_, i) => (
          <span
            key={i}
            className={`image-slider__dot${i === currentIndex ? ' image-slider__dot--active' : ''}${i < currentIndex ? ' image-slider__dot--past' : ''}`}
          />
        ))}
      </div>

      <div
        className="image-slider__card"
        style={{
          transform: `translateX(${dragOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          className={`image-slider__image-wrap${direction !== 0 ? ` image-slider__image-wrap--enter-${direction > 0 ? 'left' : 'right'}` : ''}`}
          key={currentItem.id}
        >
          <img
            src={currentItem.image}
            alt={currentItem.name}
            className="image-slider__image"
            draggable={false}
          />
        </div>

        <h2 className="image-slider__word" id="current-word">
          {currentItem.name}
        </h2>

        <SpeakerButton
          ref={speakerRef}
          onClick={handleSpeaker}
          isPlaying={isPlaying}
          label={`Pronounce ${currentItem.name}. Press Enter or OK.`}
        />
      </div>

      <div className="image-slider__nav-hint">
        <span aria-live="polite">
          {currentIndex + 1} / {items.length}
        </span>
        <span className="image-slider__swipe-hint">Swipe to navigate</span>
        <span className="image-slider__remote-hint">
          ◀ ▶ Change word &nbsp;|&nbsp; Enter / OK to hear pronunciation
        </span>
      </div>

      <button
        type="button"
        className="image-slider__arrow image-slider__arrow--prev tv-focus-ring"
        onClick={goPrev}
        disabled={!canGoPrev}
        aria-label="Previous word"
      >
        ‹
      </button>
      <button
        type="button"
        className="image-slider__arrow image-slider__arrow--next tv-focus-ring"
        onClick={goNext}
        disabled={!canGoNext}
        aria-label="Next word"
      >
        ›
      </button>
    </div>
  );
}
