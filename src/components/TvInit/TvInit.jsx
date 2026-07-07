import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { initTvMode } from '../../utils/tvDetect';
import { useTvBackNavigation } from '../../hooks/useLearningNavigation';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initTvMode();
      initialized.current = true;
    }
  }, []);

  useTvBackNavigation(navigate);

  useEffect(() => {
    if (document.documentElement.classList.contains('tv-mode')) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
}
