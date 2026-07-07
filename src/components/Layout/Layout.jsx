import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
import { useSpatialNavigation } from '../../hooks/useSpatialNavigation';
import './Layout.css';

export default function Layout() {
  const location = useLocation();
  const isLearningPage = location.pathname.startsWith('/learn');
  const [isTv, setIsTv] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('tv-mode'),
  );
  const layoutRef = useSpatialNavigation(isTv && !isLearningPage);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsTv(document.documentElement.classList.contains('tv-mode'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const showNavbar = !isLearningPage || isTv;
  const showBottomNav = !isLearningPage && !isTv;

  return (
    <div
      ref={layoutRef}
      className={`layout${isLearningPage ? ' layout--learning' : ''}${isTv ? ' layout--tv' : ''}`}
    >
      {showNavbar && <Navbar />}
      <main className="layout__main">
        <Outlet />
      </main>
      {showBottomNav && <BottomNavigation />}
    </div>
  );
}
