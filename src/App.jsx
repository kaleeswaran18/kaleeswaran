import { BrowserRouter } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import AppRoutes from './routes/AppRoutes';
import TvInit from './components/TvInit/TvInit';

export default function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <TvInit />
        <AppRoutes />
      </BrowserRouter>
    </SettingsProvider>
  );
}
